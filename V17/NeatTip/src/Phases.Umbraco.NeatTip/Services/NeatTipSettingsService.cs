using System.Text.Json;
using Microsoft.Extensions.Options;
using Phases.Umbraco.NeatTip.Configuration;
using Phases.Umbraco.NeatTip.Models;
using Umbraco.Cms.Core.Services;

namespace Phases.Umbraco.NeatTip.Services;

public class NeatTipSettingsService : INeatTipSettingsService
{
    internal const string StorageKey = "Phases.Umbraco.NeatTip::Settings";

    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
    };

    private readonly IKeyValueService _keyValueService;
    private readonly IOptionsMonitor<NeatTipSettings> _defaultSettings;

    public NeatTipSettingsService(
        IKeyValueService keyValueService,
        IOptionsMonitor<NeatTipSettings> defaultSettings)
    {
        _keyValueService = keyValueService;
        _defaultSettings = defaultSettings;
    }

    public NeatTipSettingsModel GetSettings()
    {
        var defaults = CreateDefaultModel();
        var storedValue = _keyValueService.GetValue(StorageKey);

        if (string.IsNullOrWhiteSpace(storedValue))
        {
            return defaults;
        }

        try
        {
            var storedSettings = JsonSerializer.Deserialize<NeatTipSettingsModel>(storedValue, JsonOptions);
            if (storedSettings is null)
            {
                return defaults;
            }

            // Persistable fields come from storage; edit sections always come from configuration.
            var normalized = Normalize(storedSettings);
            normalized.EditHelperTextAllowedSections = defaults.EditHelperTextAllowedSections;
            return normalized;
        }
        catch (JsonException)
        {
            return defaults;
        }
    }

    public void SaveSettings(NeatTipSettingsModel settings)
    {
        ArgumentNullException.ThrowIfNull(settings);

        var normalized = Normalize(settings);
        // Section aliases are configuration-driven (appsettings), not workspace-persisted.
        normalized.EditHelperTextAllowedSections = ResolveEditHelperTextAllowedSections();
        var payload = JsonSerializer.Serialize(normalized, JsonOptions);
        _keyValueService.SetValue(StorageKey, payload);
    }

    private NeatTipSettingsModel CreateDefaultModel()
        => new()
        {
            Enabled = _defaultSettings.CurrentValue.Enabled,
            MinLength = Math.Max(0, _defaultSettings.CurrentValue.MinLength),
            EditHelperTextAllowedSections = ResolveEditHelperTextAllowedSections(),
        };

    private static NeatTipSettingsModel Normalize(NeatTipSettingsModel settings)
        => new()
        {
            Enabled = settings.Enabled,
            MinLength = Math.Max(0, settings.MinLength),
            EditHelperTextAllowedSections = NormalizeSections(settings.EditHelperTextAllowedSections),
        };

    private string[] ResolveEditHelperTextAllowedSections()
        => NormalizeSections(_defaultSettings.CurrentValue.EditHelperTextAllowedSections);

    private static string[] NormalizeSections(IEnumerable<string>? sections)
    {
        var normalized = (sections ?? [])
            .Select(section => section?.Trim())
            .Where(section => !string.IsNullOrWhiteSpace(section))
            .Select(section => section!)
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToArray();

        return normalized.Length > 0
            ? normalized
            : ["Umb.Section.Settings"];
    }
}
