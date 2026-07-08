namespace Phases.Umbraco.NeatTip.Models;

public class NeatTipSettingsModel
{
    public bool Enabled { get; set; }

    public int MinLength { get; set; }

    /// <summary>
    /// Section aliases that grant Edit helper text in the tooltip (admins always can).
    /// </summary>
    public string[] EditHelperTextAllowedSections { get; set; } = [];
}
