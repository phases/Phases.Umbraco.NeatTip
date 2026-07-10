namespace Phases.Umbraco.NeatTip.Models;

public class NeatTipPropertyDescriptionUpdateModel
{
    public Guid DocumentKey { get; set; }

    /// <summary>
    /// When set, targets this content type directly instead of the document type.
    /// Used for Block Grid, Block List, and other element-type property editors.
    /// </summary>
    public Guid? ContentTypeKey { get; set; }

    public string? PropertyAlias { get; set; }

    public Guid? PropertyKey { get; set; }

    public string? PropertyLabel { get; set; }

    public string Description { get; set; } = string.Empty;

    /// <summary>
    /// Active editor culture. When set, only this culture's helper text is updated
    /// in NeatTip storage.
    /// </summary>
    public string? Culture { get; set; }
}
