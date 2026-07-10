using System.Text.Json;

namespace Phases.Umbraco.NeatTip.Services;

/// <summary>
/// Legacy codec for the former <c>neattip://cultures/</c> property-description format.
/// Used for migration, API response serialization, and client-side compatibility only.
/// </summary>
public static class NeatTipCultureDescriptionCodec
{
    public const string Prefix = "neattip://cultures/";

    public static bool IsCultureMap(string? description)
        => description?.StartsWith(Prefix, StringComparison.Ordinal) == true;

    public static Dictionary<string, string> ParseMap(string? description)
    {
        if (!IsCultureMap(description))
        {
            return new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
        }

        try
        {
            var json = description![Prefix.Length..];
            var parsed = JsonSerializer.Deserialize<Dictionary<string, string>>(json);
            if (parsed is null)
            {
                return new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
            }

            return parsed
                .Where(entry => !string.IsNullOrWhiteSpace(entry.Value))
                .ToDictionary(
                    entry => entry.Key,
                    entry => entry.Value.Trim(),
                    StringComparer.OrdinalIgnoreCase);
        }
        catch (JsonException)
        {
            return new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
        }
    }

    public static string SerializeMap(Dictionary<string, string> map, bool forceEncoded = false)
    {
        var cleaned = map
            .Where(entry => !string.IsNullOrWhiteSpace(entry.Value))
            .ToDictionary(
                entry => entry.Key,
                entry => entry.Value.Trim(),
                StringComparer.OrdinalIgnoreCase);

        if (cleaned.Count == 0)
        {
            return string.Empty;
        }

        if (!forceEncoded && cleaned.Count == 1)
        {
            return cleaned.Values.First();
        }

        return Prefix + JsonSerializer.Serialize(cleaned);
    }

    public static string Merge(
        string? existing,
        string? culture,
        string? newValue,
        string? defaultCulture)
    {
        if (string.IsNullOrWhiteSpace(culture))
        {
            return string.IsNullOrWhiteSpace(newValue) ? string.Empty : newValue.Trim();
        }

        var map = ParseMap(existing);
        if (!IsCultureMap(existing) && !string.IsNullOrWhiteSpace(existing))
        {
            var defaultKey = string.IsNullOrWhiteSpace(defaultCulture)
                ? culture.Trim()
                : defaultCulture.Trim();
            map[defaultKey] = existing.Trim();
        }

        var cultureKey = culture.Trim();
        if (string.IsNullOrWhiteSpace(newValue))
        {
            map.Remove(cultureKey);
        }
        else
        {
            map[cultureKey] = newValue.Trim();
        }

        return SerializeMap(map, forceEncoded: true);
    }

    public static string Resolve(
        string? description,
        string? culture,
        string? fallbackCulture)
    {
        if (!IsCultureMap(description))
        {
            return description?.Trim() ?? string.Empty;
        }

        var map = ParseMap(description);
        if (!string.IsNullOrWhiteSpace(culture)
            && map.TryGetValue(culture.Trim(), out var current)
            && !string.IsNullOrWhiteSpace(current))
        {
            return current;
        }

        if (!string.IsNullOrWhiteSpace(fallbackCulture)
            && map.TryGetValue(fallbackCulture.Trim(), out var fallback)
            && !string.IsNullOrWhiteSpace(fallback))
        {
            return fallback;
        }

        return map.Values.FirstOrDefault(value => !string.IsNullOrWhiteSpace(value)) ?? string.Empty;
    }
}
