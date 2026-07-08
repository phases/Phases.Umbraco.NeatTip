namespace Phases.Umbraco.NeatTip.Configuration;

public class NeatTipSettings
{
    public const string SectionName = "NeatTip";

    public bool Enabled { get; set; } = true;

    public int MinLength { get; set; } = 0;

    /// <summary>
    /// Umbraco section aliases that may edit helper text (in addition to admins).
    /// Defaults to Settings — where Document Types are managed.
    /// Configure aliases only; do not rely on hardcoded user-group/role names.
    /// </summary>
    public string[] EditHelperTextAllowedSections { get; set; } =
    [
        "Umb.Section.Settings"
    ];
}
