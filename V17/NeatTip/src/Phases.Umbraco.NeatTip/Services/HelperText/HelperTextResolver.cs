using System.Collections.Concurrent;
using Phases.Umbraco.NeatTip.Models;
using Phases.Umbraco.NeatTip.Services;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Services;

namespace Phases.Umbraco.NeatTip.Services.HelperText;

public class HelperTextResolver : IHelperTextResolver
{
    private static readonly ConcurrentDictionary<string, SemaphoreSlim> MigrationLocks = new(StringComparer.Ordinal);

    private readonly IHelperTextKeyValueRepository _repository;
    private readonly IContentTypeService _contentTypeService;
    private readonly ILanguageService _languageService;

    public HelperTextResolver(
        IHelperTextKeyValueRepository repository,
        IContentTypeService contentTypeService,
        ILanguageService languageService)
    {
        _repository = repository;
        _contentTypeService = contentTypeService;
        _languageService = languageService;
    }

    public async Task EnsureMigratedAsync(
        IPropertyType propertyType,
        IContentType contentType,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(propertyType);
        ArgumentNullException.ThrowIfNull(contentType);

        if (!NeatTipCultureDescriptionCodec.IsCultureMap(propertyType.Description))
        {
            if (!_repository.IsMigrationComplete(contentType.Key, propertyType.Key))
            {
                _repository.MarkMigrationComplete(contentType.Key, propertyType.Key);
            }

            return;
        }

        var migrationLock = MigrationLocks.GetOrAdd(
            $"{contentType.Key:N}:{propertyType.Key:N}",
            static _ => new SemaphoreSlim(1, 1));

        await migrationLock.WaitAsync(cancellationToken).ConfigureAwait(false);
        try
        {
            if (!NeatTipCultureDescriptionCodec.IsCultureMap(propertyType.Description))
            {
                _repository.MarkMigrationComplete(contentType.Key, propertyType.Key);
                return;
            }

            var existingMap = MergeLegacyCultureMap(propertyType, contentType);

            _repository.SaveCultureMap(contentType.Key, propertyType.Key, existingMap);
            await SyncPropertyDescriptionAsync(
                propertyType,
                contentType,
                existingMap,
                savedCulture: null,
                cancellationToken).ConfigureAwait(false);
            _repository.MarkMigrationComplete(contentType.Key, propertyType.Key);
        }
        finally
        {
            migrationLock.Release();
        }
    }

    public async Task<string> ResolveAsync(
        IPropertyType propertyType,
        IContentType contentType,
        string? culture,
        string? defaultCulture,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(propertyType);
        ArgumentNullException.ThrowIfNull(contentType);

        await EnsureMigratedAsync(propertyType, contentType, cancellationToken).ConfigureAwait(false);

        var cultureMap = _repository.GetCultureMap(contentType.Key, propertyType.Key);
        var resolvedCulture = ResolveCultureKey(culture);
        if (cultureMap.TryGetValue(resolvedCulture, out var currentCultureText)
            && !string.IsNullOrWhiteSpace(currentCultureText))
        {
            return currentCultureText.Trim();
        }

        var resolvedDefaultCulture = ResolveCultureKey(defaultCulture);
        if (!string.Equals(resolvedCulture, resolvedDefaultCulture, StringComparison.OrdinalIgnoreCase)
            && cultureMap.TryGetValue(resolvedDefaultCulture, out var defaultCultureText)
            && !string.IsNullOrWhiteSpace(defaultCultureText))
        {
            return defaultCultureText.Trim();
        }

        if (!NeatTipCultureDescriptionCodec.IsCultureMap(propertyType.Description))
        {
            return propertyType.Description?.Trim() ?? string.Empty;
        }

        return string.Empty;
    }

    public async Task SaveAsync(
        IPropertyType propertyType,
        IContentType contentType,
        string? culture,
        string? value,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(propertyType);
        ArgumentNullException.ThrowIfNull(contentType);

        await EnsureMigratedAsync(propertyType, contentType, cancellationToken).ConfigureAwait(false);

        var cultureMap = new Dictionary<string, string>(
            _repository.GetCultureMap(contentType.Key, propertyType.Key),
            StringComparer.OrdinalIgnoreCase);

        var cultureKey = ResolveCultureKey(culture);
        if (string.IsNullOrWhiteSpace(value))
        {
            cultureMap.Remove(cultureKey);
        }
        else
        {
            cultureMap[cultureKey] = value.Trim();
        }

        _repository.SaveCultureMap(contentType.Key, propertyType.Key, cultureMap);
        await SyncPropertyDescriptionAsync(
            propertyType,
            contentType,
            cultureMap,
            culture,
            cancellationToken).ConfigureAwait(false);
    }

    public IReadOnlyDictionary<string, string> GetCultureMap(
        IPropertyType propertyType,
        IContentType contentType)
    {
        ArgumentNullException.ThrowIfNull(propertyType);
        ArgumentNullException.ThrowIfNull(contentType);

        return _repository.GetCultureMap(contentType.Key, propertyType.Key);
    }

    public async Task<IReadOnlyList<NeatTipPropertyHelperTextModel>> LoadAllForContentTypeAsync(
        IContentType contentType,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(contentType);

        var defaultCulture = await _languageService.GetDefaultIsoCodeAsync().ConfigureAwait(false);
        var results = new List<NeatTipPropertyHelperTextModel>();

        foreach (var propertyType in contentType.CompositionPropertyTypes)
        {
            cancellationToken.ThrowIfCancellationRequested();

            var cultureMap = MergeLegacyCultureMap(propertyType, contentType);

            results.Add(new NeatTipPropertyHelperTextModel
            {
                ContentTypeKey = contentType.Key,
                ContentTypeName = contentType.Name ?? string.Empty,
                PropertyAlias = propertyType.Alias,
                PropertyName = propertyType.Name,
                PropertyKey = propertyType.Key,
                PropertyDescription = GetEffectivePropertyDescription(
                    propertyType,
                    cultureMap,
                    defaultCulture),
                CultureMap = cultureMap.ToDictionary(
                    entry => entry.Key,
                    entry => entry.Value,
                    StringComparer.OrdinalIgnoreCase),
            });
        }

        return results;
    }

    private Dictionary<string, string> MergeLegacyCultureMap(
        IPropertyType propertyType,
        IContentType contentType)
    {
        var existingMap = new Dictionary<string, string>(
            _repository.GetCultureMap(contentType.Key, propertyType.Key),
            StringComparer.OrdinalIgnoreCase);

        if (!NeatTipCultureDescriptionCodec.IsCultureMap(propertyType.Description))
        {
            return existingMap;
        }

        var legacyMap = NeatTipCultureDescriptionCodec.ParseMap(propertyType.Description);
        foreach (var entry in legacyMap)
        {
            if (!existingMap.ContainsKey(entry.Key))
            {
                existingMap[entry.Key] = entry.Value;
            }
        }

        return existingMap;
    }

    private static string GetEffectivePropertyDescription(
        IPropertyType propertyType,
        IReadOnlyDictionary<string, string> cultureMap,
        string? defaultCulture)
    {
        var syncValue = ResolvePropertyDescriptionSyncValue(cultureMap, defaultCulture, savedCulture: null);
        return syncValue ?? GetPropertyDescriptionFallback(propertyType.Description);
    }

    private static string GetPropertyDescriptionFallback(string? description)
    {
        if (NeatTipCultureDescriptionCodec.IsCultureMap(description))
        {
            return string.Empty;
        }

        return description?.Trim() ?? string.Empty;
    }

    private async Task SyncPropertyDescriptionAsync(
        IPropertyType propertyType,
        IContentType contentType,
        IReadOnlyDictionary<string, string> cultureMap,
        string? savedCulture,
        CancellationToken cancellationToken)
    {
        cancellationToken.ThrowIfCancellationRequested();
        var defaultCulture = await _languageService.GetDefaultIsoCodeAsync().ConfigureAwait(false);
        var targetDescription = ResolvePropertyDescriptionSyncValue(
            cultureMap,
            defaultCulture,
            savedCulture);

        if (targetDescription is null)
        {
            return;
        }

        var currentDescription = GetPropertyDescriptionFallback(propertyType.Description);
        if (string.Equals(currentDescription, targetDescription, StringComparison.Ordinal))
        {
            return;
        }

        propertyType.Description = targetDescription;
        _contentTypeService.Save(contentType);
    }

    /// <summary>
    /// Mirrors default-culture NeatTip helper text into Umbraco's property description field
    /// so content remains accessible when NeatTip is disabled or uninstalled.
    /// </summary>
    private static string? ResolvePropertyDescriptionSyncValue(
        IReadOnlyDictionary<string, string> cultureMap,
        string? defaultCulture,
        string? savedCulture)
    {
        var defaultCultureKey = ResolveCultureKey(defaultCulture);
        var savedCultureKey = ResolveCultureKey(savedCulture);
        var isDefaultCultureEdit = savedCulture is not null
            && (string.Equals(savedCultureKey, defaultCultureKey, StringComparison.OrdinalIgnoreCase)
                || string.Equals(savedCultureKey, HelperTextStorageKeys.InvariantCultureKey, StringComparison.OrdinalIgnoreCase));

        if (isDefaultCultureEdit)
        {
            return GetDefaultCultureHelperText(cultureMap, defaultCulture);
        }

        if (!HasManagedDefaultCultureEntry(cultureMap, defaultCulture))
        {
            return null;
        }

        return GetDefaultCultureHelperText(cultureMap, defaultCulture);
    }

    private static bool HasManagedDefaultCultureEntry(
        IReadOnlyDictionary<string, string> cultureMap,
        string? defaultCulture)
    {
        var defaultCultureKey = ResolveCultureKey(defaultCulture);
        return cultureMap.ContainsKey(defaultCultureKey)
            || cultureMap.ContainsKey(HelperTextStorageKeys.InvariantCultureKey);
    }

    private static string GetDefaultCultureHelperText(
        IReadOnlyDictionary<string, string> cultureMap,
        string? defaultCulture)
    {
        var defaultCultureKey = ResolveCultureKey(defaultCulture);
        if (cultureMap.TryGetValue(defaultCultureKey, out var defaultText)
            && !string.IsNullOrWhiteSpace(defaultText))
        {
            return defaultText.Trim();
        }

        if (cultureMap.TryGetValue(HelperTextStorageKeys.InvariantCultureKey, out var invariantText)
            && !string.IsNullOrWhiteSpace(invariantText))
        {
            return invariantText.Trim();
        }

        return string.Empty;
    }

    private static string ResolveCultureKey(string? culture)
    {
        var trimmed = culture?.Trim();
        return string.IsNullOrWhiteSpace(trimmed)
            ? HelperTextStorageKeys.InvariantCultureKey
            : trimmed;
    }
}
