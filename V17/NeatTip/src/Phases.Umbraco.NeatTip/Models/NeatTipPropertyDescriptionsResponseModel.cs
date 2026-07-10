namespace Phases.Umbraco.NeatTip.Models;

public class NeatTipPropertyDescriptionsResponseModel
{
    public string ContentTypeAlias { get; set; } = string.Empty;

    public Guid ContentTypeKey { get; set; }

    public string? DefaultCulture { get; set; }

    public IReadOnlyList<NeatTipPropertyHelperTextModel> Properties { get; set; } =
        Array.Empty<NeatTipPropertyHelperTextModel>();
}
