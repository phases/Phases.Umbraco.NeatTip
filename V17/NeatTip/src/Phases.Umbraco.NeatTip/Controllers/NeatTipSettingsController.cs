using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Phases.Umbraco.NeatTip.Models;
using Phases.Umbraco.NeatTip.Services;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Api.Management.Controllers;
using Umbraco.Cms.Api.Management.Routing;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Web.Common.Authorization;

namespace Phases.Umbraco.NeatTip.Controllers;

[VersionedApiBackOfficeRoute("neattip/settings")]
[ApiExplorerSettings(GroupName = "NeatTip")]
public class NeatTipSettingsController : ManagementApiControllerBase
{
    private readonly INeatTipSettingsService _settingsService;
    private readonly IContentService _contentService;
    private readonly IContentTypeService _contentTypeService;

    public NeatTipSettingsController(
        INeatTipSettingsService settingsService,
        IContentService contentService,
        IContentTypeService contentTypeService)
    {
        _settingsService = settingsService;
        _contentService = contentService;
        _contentTypeService = contentTypeService;
    }

    [HttpGet]
    public ActionResult<NeatTipSettingsModel> Get()
        => Ok(_settingsService.GetSettings());

    [HttpPut]
    [Authorize(Policy = AuthorizationPolicies.SectionAccessSettings)]
    public IActionResult Put([FromBody] NeatTipSettingsModel model)
    {
        if (model.MinLength < 0)
        {
            return BadRequest("MinLength must be zero or greater.");
        }

        _settingsService.SaveSettings(model);
        return Ok(_settingsService.GetSettings());
    }

    /// <summary>
    /// Updates a document-type property description (helper text).
    /// Restricted with Umbraco's TreeAccessDocumentTypes policy — the same authority
    /// required to edit document types in Settings.
    /// </summary>
    [HttpPut("property-description")]
    [Authorize(Policy = AuthorizationPolicies.TreeAccessDocumentTypes)]
    public IActionResult PutPropertyDescription([FromBody] NeatTipPropertyDescriptionUpdateModel model)
    {
        if (model.DocumentKey == Guid.Empty)
        {
            return BadRequest("DocumentKey is required.");
        }

        if (
            string.IsNullOrWhiteSpace(model.PropertyAlias) &&
            model.PropertyKey is null &&
            string.IsNullOrWhiteSpace(model.PropertyLabel))
        {
            return BadRequest("PropertyAlias, PropertyKey, or PropertyLabel must be provided.");
        }

        var content = _contentService.GetById(model.DocumentKey);
        if (content is null)
        {
            return NotFound("Could not find the document.");
        }

        var contentType = _contentTypeService.Get(content.ContentType.Key);
        if (contentType is null)
        {
            return NotFound("Could not find the document content type.");
        }

        var propertyType = ResolvePropertyType(contentType, model);
        if (propertyType is null)
        {
            return NotFound("Could not find the target property on the document content type.");
        }

        // Empty/whitespace clears the helper text (same as clearing description in content type).
        propertyType.Description = string.IsNullOrWhiteSpace(model.Description)
            ? string.Empty
            : model.Description.Trim();
        _contentTypeService.Save(contentType);

        return Ok(new
        {
            contentTypeAlias = contentType.Alias,
            propertyAlias = propertyType.Alias,
            description = propertyType.Description,
        });
    }

    private static IPropertyType? ResolvePropertyType(
        IContentType contentType,
        NeatTipPropertyDescriptionUpdateModel model)
    {
        var propertyTypes = contentType.CompositionPropertyTypes.ToList();

        if (model.PropertyKey is Guid propertyKey)
        {
            var byKey = propertyTypes.FirstOrDefault(property => property.Key == propertyKey);
            if (byKey is not null)
            {
                return byKey;
            }
        }

        if (string.IsNullOrWhiteSpace(model.PropertyAlias))
        {
            if (string.IsNullOrWhiteSpace(model.PropertyLabel))
            {
                return null;
            }

            var normalizedLabel = model.PropertyLabel.Trim();
            return propertyTypes.FirstOrDefault(property =>
                property.Name.Equals(normalizedLabel, StringComparison.OrdinalIgnoreCase));
        }

        var normalizedAlias = model.PropertyAlias.Trim();
        return propertyTypes.FirstOrDefault(property =>
            property.Alias.Equals(normalizedAlias, StringComparison.OrdinalIgnoreCase));
    }
}
