namespace Phases.Umbraco.NeatTip.Models;

public class NeatTipPropertyHelperTextModel
{
    public Guid ContentTypeKey { get; set; }

    public string ContentTypeName { get; set; } = string.Empty;

    public string PropertyAlias { get; set; } = string.Empty;

    public string PropertyName { get; set; } = string.Empty;

    public Guid PropertyKey { get; set; }

    public string PropertyDescription { get; set; } = string.Empty;

    public Dictionary<string, string> CultureMap { get; set; } = new(StringComparer.OrdinalIgnoreCase);
}
