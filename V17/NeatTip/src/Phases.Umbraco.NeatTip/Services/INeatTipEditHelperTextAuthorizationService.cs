using System.Security.Claims;

namespace Phases.Umbraco.NeatTip.Services;

/// <summary>
/// Single source of truth for helper-text edit authorization.
/// Used by the Management API and exposed to the client via settings.
/// </summary>
public interface INeatTipEditHelperTextAuthorizationService
{
    Task<bool> CanEditHelperTextAsync(ClaimsPrincipal user);
}
