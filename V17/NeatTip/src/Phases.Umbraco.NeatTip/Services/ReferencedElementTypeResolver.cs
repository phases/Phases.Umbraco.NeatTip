using System.Text.Json;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.PropertyEditors;
using Umbraco.Cms.Core.Services;

namespace Phases.Umbraco.NeatTip.Services;

/// <summary>
/// Collects element content types referenced by block editors on a content type
/// (including nested blocks), instead of loading every element type in the site.
/// </summary>
public class ReferencedElementTypeResolver : IReferencedElementTypeResolver
{
    private readonly IContentTypeService _contentTypeService;
    private readonly IDataTypeService _dataTypeService;

    public ReferencedElementTypeResolver(
        IContentTypeService contentTypeService,
        IDataTypeService dataTypeService)
    {
        _contentTypeService = contentTypeService;
        _dataTypeService = dataTypeService;
    }

    public async Task<IReadOnlyList<IContentType>> GetReferencedElementTypesAsync(
        IContentType contentType,
        CancellationToken cancellationToken = default)
    {
        ArgumentNullException.ThrowIfNull(contentType);

        var discoveredKeys = new HashSet<Guid>();
        var pendingKeys = new Queue<Guid>();
        var dataTypeCache = new Dictionary<Guid, IDataType?>();

        await CollectElementTypeKeysAsync(
            contentType,
            discoveredKeys,
            pendingKeys,
            dataTypeCache,
            cancellationToken).ConfigureAwait(false);

        var results = new List<IContentType>();

        while (pendingKeys.Count > 0)
        {
            cancellationToken.ThrowIfCancellationRequested();

            var elementTypeKey = pendingKeys.Dequeue();
            var elementType = _contentTypeService.Get(elementTypeKey);
            if (elementType is null || !elementType.IsElement)
            {
                continue;
            }

            results.Add(elementType);
            await CollectElementTypeKeysAsync(
                elementType,
                discoveredKeys,
                pendingKeys,
                dataTypeCache,
                cancellationToken).ConfigureAwait(false);
        }

        return results;
    }

    private async Task CollectElementTypeKeysAsync(
        IContentType contentType,
        HashSet<Guid> discoveredKeys,
        Queue<Guid> pendingKeys,
        Dictionary<Guid, IDataType?> dataTypeCache,
        CancellationToken cancellationToken)
    {
        foreach (var propertyType in contentType.CompositionPropertyTypes)
        {
            cancellationToken.ThrowIfCancellationRequested();

            var dataTypeKey = propertyType.DataTypeKey;
            if (dataTypeKey == Guid.Empty)
            {
                continue;
            }

            if (!dataTypeCache.TryGetValue(dataTypeKey, out var dataType))
            {
                dataType = await _dataTypeService.GetAsync(dataTypeKey).ConfigureAwait(false);
                dataTypeCache[dataTypeKey] = dataType;
            }

            if (dataType is null)
            {
                continue;
            }

            foreach (var elementTypeKey in ExtractElementTypeKeys(dataType))
            {
                if (elementTypeKey == Guid.Empty || !discoveredKeys.Add(elementTypeKey))
                {
                    continue;
                }

                pendingKeys.Enqueue(elementTypeKey);
            }
        }
    }

    private IEnumerable<Guid> ExtractElementTypeKeys(IDataType dataType)
    {
        switch (dataType.EditorAlias)
        {
            case global::Umbraco.Cms.Core.Constants.PropertyEditors.Aliases.BlockList:
                return ExtractFromBlockList(dataType.ConfigurationObject);
            case global::Umbraco.Cms.Core.Constants.PropertyEditors.Aliases.BlockGrid:
                return ExtractFromBlockGrid(dataType.ConfigurationObject);
            case global::Umbraco.Cms.Core.Constants.PropertyEditors.Aliases.NestedContent:
                return ExtractFromNestedContent(dataType.ConfigurationObject);
            default:
                return [];
        }
    }

    private static IEnumerable<Guid> ExtractFromBlockList(object? configuration)
    {
        if (configuration is BlockListConfiguration blockList)
        {
            return EnumerateBlockListKeys(blockList.Blocks);
        }

        return ExtractKeysFromJson(ToJsonElement(configuration), "blocks", "contentElementTypeKey", "settingsElementTypeKey");
    }

    private static IEnumerable<Guid> ExtractFromBlockGrid(object? configuration)
    {
        if (configuration is BlockGridConfiguration blockGrid)
        {
            return EnumerateBlockGridKeys(blockGrid.Blocks);
        }

        return ExtractKeysFromJson(ToJsonElement(configuration), "blocks", "contentElementTypeKey", "settingsElementTypeKey");
    }

    private IEnumerable<Guid> ExtractFromNestedContent(object? configuration)
        => ExtractNestedContentAliasesFromJson(ToJsonElement(configuration))
            .Select(alias => _contentTypeService.Get(alias)?.Key ?? Guid.Empty)
            .Where(key => key != Guid.Empty);

    private static IEnumerable<Guid> EnumerateBlockListKeys(BlockListConfiguration.BlockConfiguration[]? blocks)
    {
        if (blocks is null)
        {
            yield break;
        }

        foreach (var block in blocks)
        {
            if (block.ContentElementTypeKey != Guid.Empty)
            {
                yield return block.ContentElementTypeKey;
            }

            if (block.SettingsElementTypeKey is Guid settingsKey && settingsKey != Guid.Empty)
            {
                yield return settingsKey;
            }
        }
    }

    private static IEnumerable<Guid> EnumerateBlockGridKeys(BlockGridConfiguration.BlockGridBlockConfiguration[]? blocks)
    {
        if (blocks is null)
        {
            yield break;
        }

        foreach (var block in blocks)
        {
            if (block.ContentElementTypeKey != Guid.Empty)
            {
                yield return block.ContentElementTypeKey;
            }

            if (block.SettingsElementTypeKey is Guid settingsKey && settingsKey != Guid.Empty)
            {
                yield return settingsKey;
            }
        }
    }

    private static JsonElement? ToJsonElement(object? configuration)
    {
        if (configuration is null)
        {
            return null;
        }

        if (configuration is JsonElement json)
        {
            return json;
        }

        return JsonSerializer.SerializeToElement(configuration);
    }

    private static IEnumerable<Guid> ExtractKeysFromJson(
        JsonElement? configuration,
        string arrayProperty,
        params string[] keyPropertyNames)
    {
        if (configuration is not JsonElement json || json.ValueKind != JsonValueKind.Object)
        {
            yield break;
        }

        if (!json.TryGetProperty(arrayProperty, out var blocks) || blocks.ValueKind != JsonValueKind.Array)
        {
            yield break;
        }

        foreach (var block in blocks.EnumerateArray())
        {
            foreach (var propertyName in keyPropertyNames)
            {
                if (!block.TryGetProperty(propertyName, out var value))
                {
                    continue;
                }

                if (TryParseGuid(value, out var parsed) && parsed != Guid.Empty)
                {
                    yield return parsed;
                }
            }
        }
    }

    private static IEnumerable<string> ExtractNestedContentAliasesFromJson(JsonElement? configuration)
    {
        if (configuration is not JsonElement json || json.ValueKind != JsonValueKind.Object)
        {
            yield break;
        }

        if (!json.TryGetProperty("contentTypes", out var contentTypes)
            || contentTypes.ValueKind != JsonValueKind.Array)
        {
            yield break;
        }

        foreach (var contentType in contentTypes.EnumerateArray())
        {
            if (contentType.TryGetProperty("ncContentTypeAlias", out var aliasValue)
                && aliasValue.ValueKind == JsonValueKind.String)
            {
                var alias = aliasValue.GetString()?.Trim();
                if (!string.IsNullOrWhiteSpace(alias))
                {
                    yield return alias;
                }
            }
        }
    }

    private static bool TryParseGuid(JsonElement value, out Guid parsed)
    {
        parsed = Guid.Empty;

        if (value.ValueKind == JsonValueKind.String)
        {
            return Guid.TryParse(value.GetString(), out parsed);
        }

        return false;
    }
}
