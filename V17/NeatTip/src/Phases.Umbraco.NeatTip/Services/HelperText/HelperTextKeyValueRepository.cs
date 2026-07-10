using System.Collections.Concurrent;
using System.Text.Json;
using Umbraco.Cms.Core.Services;

namespace Phases.Umbraco.NeatTip.Services.HelperText;

public class HelperTextKeyValueRepository : IHelperTextKeyValueRepository
{
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
    };

    private readonly IKeyValueService _keyValueService;
    private readonly ConcurrentDictionary<string, IReadOnlyDictionary<string, string>> _cultureMapCache = new(StringComparer.Ordinal);
    private readonly ConcurrentDictionary<string, bool> _migrationCache = new(StringComparer.Ordinal);

    public HelperTextKeyValueRepository(IKeyValueService keyValueService)
    {
        _keyValueService = keyValueService;
    }

    public IReadOnlyDictionary<string, string> GetCultureMap(Guid contentTypeKey, Guid propertyTypeKey)
    {
        var storageKey = HelperTextStorageKeys.HelperText(contentTypeKey, propertyTypeKey);
        if (_cultureMapCache.TryGetValue(storageKey, out var cached))
        {
            return cached;
        }

        var storedValue = _keyValueService.GetValue(storageKey);
        var map = DeserializeCultureMap(storedValue);
        _cultureMapCache[storageKey] = map;
        return map;
    }

    public void SaveCultureMap(
        Guid contentTypeKey,
        Guid propertyTypeKey,
        IReadOnlyDictionary<string, string> cultureMap)
    {
        var storageKey = HelperTextStorageKeys.HelperText(contentTypeKey, propertyTypeKey);
        var normalized = NormalizeCultureMap(cultureMap);

        if (normalized.Count == 0)
        {
            _keyValueService.SetValue(storageKey, string.Empty);
            _cultureMapCache[storageKey] = normalized;
            return;
        }

        var payload = JsonSerializer.Serialize(normalized, JsonOptions);
        _keyValueService.SetValue(storageKey, payload);
        _cultureMapCache[storageKey] = normalized;
    }

    public bool IsMigrationComplete(Guid contentTypeKey, Guid propertyTypeKey)
    {
        var migrationKey = HelperTextStorageKeys.MigrationComplete(contentTypeKey, propertyTypeKey);
        if (_migrationCache.TryGetValue(migrationKey, out var cached))
        {
            return cached;
        }

        var storedValue = _keyValueService.GetValue(migrationKey);
        var isComplete = string.Equals(storedValue, "1", StringComparison.Ordinal);
        _migrationCache[migrationKey] = isComplete;
        return isComplete;
    }

    public void MarkMigrationComplete(Guid contentTypeKey, Guid propertyTypeKey)
    {
        var migrationKey = HelperTextStorageKeys.MigrationComplete(contentTypeKey, propertyTypeKey);
        _keyValueService.SetValue(migrationKey, "1");
        _migrationCache[migrationKey] = true;
    }

    private static IReadOnlyDictionary<string, string> DeserializeCultureMap(string? storedValue)
    {
        if (string.IsNullOrWhiteSpace(storedValue))
        {
            return CreateEmptyMap();
        }

        try
        {
            var parsed = JsonSerializer.Deserialize<Dictionary<string, string>>(storedValue, JsonOptions);
            return parsed is null ? CreateEmptyMap() : NormalizeCultureMap(parsed);
        }
        catch (JsonException)
        {
            return CreateEmptyMap();
        }
    }

    private static Dictionary<string, string> NormalizeCultureMap(IReadOnlyDictionary<string, string> cultureMap)
        => cultureMap
            .Where(entry => !string.IsNullOrWhiteSpace(entry.Key) && !string.IsNullOrWhiteSpace(entry.Value))
            .ToDictionary(
                entry => entry.Key.Trim(),
                entry => entry.Value.Trim(),
                StringComparer.OrdinalIgnoreCase);

    private static Dictionary<string, string> CreateEmptyMap()
        => new(StringComparer.OrdinalIgnoreCase);
}
