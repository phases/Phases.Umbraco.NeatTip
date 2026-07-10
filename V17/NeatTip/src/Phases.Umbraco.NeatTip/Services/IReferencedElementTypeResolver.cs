using Umbraco.Cms.Core.Models;

namespace Phases.Umbraco.NeatTip.Services;

public interface IReferencedElementTypeResolver
{
    Task<IReadOnlyList<IContentType>> GetReferencedElementTypesAsync(
        IContentType contentType,
        CancellationToken cancellationToken = default);
}
