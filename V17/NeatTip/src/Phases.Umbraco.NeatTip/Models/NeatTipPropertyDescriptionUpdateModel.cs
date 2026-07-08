namespace Phases.Umbraco.NeatTip.Models;

public class NeatTipPropertyDescriptionUpdateModel
{
    public Guid DocumentKey { get; set; }

    public string? PropertyAlias { get; set; }

    public Guid? PropertyKey { get; set; }

    public string? PropertyLabel { get; set; }

    public string Description { get; set; } = string.Empty;
}
