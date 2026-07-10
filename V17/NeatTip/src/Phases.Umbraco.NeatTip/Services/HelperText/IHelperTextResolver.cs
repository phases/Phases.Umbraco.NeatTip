using Phases.Umbraco.NeatTip.Models;
using Umbraco.Cms.Core.Models;

namespace Phases.Umbraco.NeatTip.Services.HelperText;

public interface IHelperTextResolver
{
    Task EnsureMigratedAsync(
        IPropertyType propertyType,
        IContentType contentType,
        CancellationToken cancellationToken = default);

    Task<string> ResolveAsync(
        IPropertyType propertyType,
        IContentType contentType,
        string? culture,
        string? defaultCulture,
        CancellationToken cancellationToken = default);

    Task SaveAsync(
        IPropertyType propertyType,
        IContentType contentType,
        string? culture,
        string? value,
        CancellationToken cancellationToken = default);

    IReadOnlyDictionary<string, string> GetCultureMap(
        IPropertyType propertyType,
        IContentType contentType);

    Task<IReadOnlyList<NeatTipPropertyHelperTextModel>> LoadAllForContentTypeAsync(
        IContentType contentType,
        CancellationToken cancellationToken = default);
}
