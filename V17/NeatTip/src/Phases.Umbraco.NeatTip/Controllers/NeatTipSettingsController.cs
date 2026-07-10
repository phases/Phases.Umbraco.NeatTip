using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Phases.Umbraco.NeatTip.Models;
using Phases.Umbraco.NeatTip.Services;
using Phases.Umbraco.NeatTip.Services.HelperText;
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
    private readonly INeatTipEditHelperTextAuthorizationService _editHelperTextAuthorization;
    private readonly IHelperTextResolver _helperTextResolver;
    private readonly IReferencedElementTypeResolver _referencedElementTypeResolver;
    private readonly IContentService _contentService;
    private readonly IContentTypeService _contentTypeService;
    private readonly ILanguageService _languageService;

    public NeatTipSettingsController(
        INeatTipSettingsService settingsService,
        INeatTipEditHelperTextAuthorizationService editHelperTextAuthorization,
        IHelperTextResolver helperTextResolver,
        IReferencedElementTypeResolver referencedElementTypeResolver,
        IContentService contentService,
        IContentTypeService contentTypeService,
        ILanguageService languageService)
    {
        _settingsService = settingsService;
        _editHelperTextAuthorization = editHelperTextAuthorization;
        _helperTextResolver = helperTextResolver;
        _referencedElementTypeResolver = referencedElementTypeResolver;
        _contentService = contentService;
        _contentTypeService = contentTypeService;
        _languageService = languageService;
    }

    [HttpGet]
    public async Task<ActionResult<NeatTipSettingsModel>> Get()
    {
        var settings = _settingsService.GetSettings();
        settings.CanEditHelperText = await _editHelperTextAuthorization.CanEditHelperTextAsync(User);
        return Ok(settings);
    }

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
    /// Returns NeatTip helper text for all properties on the document's content type.
    /// </summary>
    [HttpGet("property-descriptions")]
    public async Task<ActionResult<NeatTipPropertyDescriptionsResponseModel>> GetPropertyDescriptions(
        [FromQuery] Guid documentKey)
    {
        if (documentKey == Guid.Empty)
        {
            return BadRequest("DocumentKey is required.");
        }

        var content = _contentService.GetById(documentKey);
        if (content is null)
        {
            return NotFound("Could not find the document.");
        }

        var contentType = _contentTypeService.Get(content.ContentType.Key);
        if (contentType is null)
        {
            return NotFound("Could not find the document content type.");
        }

        var properties = new List<NeatTipPropertyHelperTextModel>();
        properties.AddRange(await _helperTextResolver.LoadAllForContentTypeAsync(contentType));

        foreach (var elementContentType in await _referencedElementTypeResolver.GetReferencedElementTypesAsync(contentType))
        {
            properties.AddRange(await _helperTextResolver.LoadAllForContentTypeAsync(elementContentType));
        }

        var defaultCulture = await _languageService.GetDefaultIsoCodeAsync();

        return Ok(new NeatTipPropertyDescriptionsResponseModel
        {
            ContentTypeAlias = contentType.Alias,
            ContentTypeKey = contentType.Key,
            DefaultCulture = defaultCulture,
            Properties = properties,
        });
    }

    /// <summary>
    /// Updates a document-type property description (helper text).
    /// Authorization is enforced via <see cref="INeatTipEditHelperTextAuthorizationService"/>
    /// so the same rules apply as the client-visible <c>canEditHelperText</c> flag.
    /// </summary>
    [HttpPut("property-description")]
    public async Task<IActionResult> PutPropertyDescription([FromBody] NeatTipPropertyDescriptionUpdateModel model)
    {
        if (!await _editHelperTextAuthorization.CanEditHelperTextAsync(User))
        {
            return Forbid();
        }

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

        var resolved = ResolveContentTypeAndProperty(model, content);
        if (resolved is null)
        {
            return NotFound("Could not find the target property on the document content type.");
        }

        var (contentType, propertyType) = resolved.Value;

        var defaultCulture = await _languageService.GetDefaultIsoCodeAsync();
        await _helperTextResolver.EnsureMigratedAsync(propertyType, contentType);
        await _helperTextResolver.SaveAsync(
            propertyType,
            contentType,
            model.Culture,
            model.Description);

        var cultureMap = _helperTextResolver.GetCultureMap(propertyType, contentType);
        var cultureDescription = await _helperTextResolver.ResolveAsync(
            propertyType,
            contentType,
            model.Culture,
            defaultCulture);

        return Ok(new
        {
            contentTypeAlias = contentType.Alias,
            contentTypeKey = contentType.Key,
            propertyAlias = propertyType.Alias,
            propertyKey = propertyType.Key,
            description = NeatTipCultureDescriptionCodec.SerializeMap(
                cultureMap.ToDictionary(entry => entry.Key, entry => entry.Value),
                forceEncoded: true),
            cultureDescription,
            propertyDescription = GetPlainPropertyDescription(propertyType.Description),
        });
    }

    private static string GetPlainPropertyDescription(string? description)
    {
        if (NeatTipCultureDescriptionCodec.IsCultureMap(description))
        {
            return string.Empty;
        }

        return description?.Trim() ?? string.Empty;
    }

    private (IContentType ContentType, IPropertyType PropertyType)? ResolveContentTypeAndProperty(
        NeatTipPropertyDescriptionUpdateModel model,
        IContent content)
    {
        if (model.ContentTypeKey is Guid contentTypeKey && contentTypeKey != Guid.Empty)
        {
            var explicitContentType = _contentTypeService.Get(contentTypeKey);
            var explicitProperty = explicitContentType is null
                ? null
                : ResolvePropertyType(explicitContentType, model);
            if (explicitContentType is not null && explicitProperty is not null)
            {
                return (explicitContentType, explicitProperty);
            }
        }

        var documentContentType = _contentTypeService.Get(content.ContentType.Key);
        if (documentContentType is not null)
        {
            var documentProperty = ResolvePropertyType(documentContentType, model);
            if (documentProperty is not null)
            {
                return (documentContentType, documentProperty);
            }
        }

        if (model.PropertyKey is Guid propertyKey)
        {
            foreach (var candidateContentType in _contentTypeService.GetAll())
            {
                var match = candidateContentType.CompositionPropertyTypes
                    .FirstOrDefault(property => property.Key == propertyKey);
                if (match is not null)
                {
                    return (candidateContentType, match);
                }
            }
        }

        return ResolveElementTypeProperty(model);
    }

    private (IContentType ContentType, IPropertyType PropertyType)? ResolveElementTypeProperty(
        NeatTipPropertyDescriptionUpdateModel model)
    {
        var elementMatches = new List<(IContentType ContentType, IPropertyType Property)>();

        foreach (var contentType in _contentTypeService.GetAll())
        {
            if (!contentType.IsElement)
            {
                continue;
            }

            var property = ResolvePropertyType(contentType, model);
            if (property is not null)
            {
                elementMatches.Add((contentType, property));
            }
        }

        if (elementMatches.Count == 0)
        {
            return null;
        }

        if (elementMatches.Count == 1)
        {
            return elementMatches[0];
        }

        if (!string.IsNullOrWhiteSpace(model.PropertyLabel))
        {
            var normalizedLabel = model.PropertyLabel.Trim();
            var labelMatches = elementMatches
                .Where(match => match.ContentType.Name.Equals(normalizedLabel, StringComparison.OrdinalIgnoreCase))
                .ToList();

            if (labelMatches.Count == 1)
            {
                return labelMatches[0];
            }
        }

        return null;
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
