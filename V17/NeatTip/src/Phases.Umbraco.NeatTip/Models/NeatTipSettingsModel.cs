namespace Phases.Umbraco.NeatTip.Models;

public class NeatTipSettingsModel
{
    public bool Enabled { get; set; }

    public int MinLength { get; set; }

    /// <summary>
    /// Section aliases that grant Edit helper text in the tooltip (admins always can).
    /// </summary>
    public string[] EditHelperTextAllowedSections { get; set; } = [];

    /// <summary>
    /// Computed for the current user on GET only; not persisted.
    /// Mirrors the same rule set enforced on <c>PUT property-description</c>.
    /// </summary>
    public bool CanEditHelperText { get; set; }
}
