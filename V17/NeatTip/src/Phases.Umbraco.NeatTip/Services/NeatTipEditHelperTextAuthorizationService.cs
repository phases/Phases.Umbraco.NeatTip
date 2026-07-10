using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;
using Phases.Umbraco.NeatTip.Configuration;
using Umbraco.Cms.Core.Models.Membership;
using Umbraco.Cms.Core.Security;
using Umbraco.Cms.Web.Common.Authorization;
using Umbraco.Extensions;

namespace Phases.Umbraco.NeatTip.Services;

/// <summary>
/// Evaluates helper-text edit permission using one consistent rule set:
/// 1. Unknown user → deny.
/// 2. Admin → allow.
/// 3. Must pass Umbraco <see cref="AuthorizationPolicies.TreeAccessDocumentTypes"/>.
/// 4. Must have at least one configured section alias in <see cref="NeatTipSettings.EditHelperTextAllowedSections"/>.
/// </summary>
public class NeatTipEditHelperTextAuthorizationService : INeatTipEditHelperTextAuthorizationService
{
    private readonly IAuthorizationService _authorizationService;
    private readonly IBackOfficeSecurityAccessor _backOfficeSecurityAccessor;
    private readonly IOptionsMonitor<NeatTipSettings> _settings;

    public NeatTipEditHelperTextAuthorizationService(
        IAuthorizationService authorizationService,
        IBackOfficeSecurityAccessor backOfficeSecurityAccessor,
        IOptionsMonitor<NeatTipSettings> settings)
    {
        _authorizationService = authorizationService;
        _backOfficeSecurityAccessor = backOfficeSecurityAccessor;
        _settings = settings;
    }

    public async Task<bool> CanEditHelperTextAsync(ClaimsPrincipal user)
    {
        if (user?.Identity?.IsAuthenticated != true)
        {
            return false;
        }

        var backOfficeUser = _backOfficeSecurityAccessor.BackOfficeSecurity?.CurrentUser;
        if (backOfficeUser is null)
        {
            return false;
        }

        if (backOfficeUser.IsAdmin())
        {
            return true;
        }

        var treeAccess = await _authorizationService.AuthorizeAsync(
            user,
            resource: null,
            policyName: AuthorizationPolicies.TreeAccessDocumentTypes);

        if (!treeAccess.Succeeded)
        {
            return false;
        }

        return HasConfiguredSectionAccess(backOfficeUser);
    }

    private bool HasConfiguredSectionAccess(IUser user)
    {
        var configuredSections = NormalizeSections(_settings.CurrentValue.EditHelperTextAllowedSections);
        var userSections = user.AllowedSections?.ToArray() ?? [];

        return configuredSections.Any(section =>
            userSections.Contains(section, StringComparer.OrdinalIgnoreCase));
    }

    private static string[] NormalizeSections(IEnumerable<string>? sections)
    {
        var normalized = (sections ?? [])
            .Select(section => section?.Trim())
            .Where(section => !string.IsNullOrWhiteSpace(section))
            .Select(section => section!)
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToArray();

        return normalized.Length > 0
            ? normalized
            : ["Umb.Section.Settings"];
    }
}
