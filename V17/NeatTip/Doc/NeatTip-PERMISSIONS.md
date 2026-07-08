# NeatTip — Permission-aware tooltip actions

Editing helper text is gated so unauthorized users never see Edit UI and cannot call the update API.

## Client: `NeatTipPermissionsService`

**File:** `src/Phases.Umbraco.NeatTip/Client/src/services/permissions.service.ts`

Permission logic lives only in this service. `TooltipManagerService` asks for allowed actions and renders the More (…) menu from that list. It does not evaluate roles or sections itself.

### What the More menu shows

| User capability | Menu items |
| --- | --- |
| No edit permission / unknown user | Copy helper text |
| Edit permission | Copy helper text, Edit helper text |

Unauthorized actions are **omitted**, not disabled.

### Evaluation (Edit)

1. If Umbraco current user is unknown → **deny Edit**, allow Copy (safe default).
2. If `currentUser.isAdmin === true` → **allow Edit**.
3. If any configured section alias is in `currentUser.allowedSections` → **allow Edit**.
4. Else → **deny Edit**.

Checks use Umbraco’s native backoffice APIs:

- `UMB_CURRENT_USER_CONTEXT` (`@umbraco-cms/backoffice/current-user`)
- `isAdmin` and `allowedSections` from `UmbCurrentUserModel`

No hardcoded user-group / role names. Section aliases that grant Edit are configurable.

### Runtime updates without code changes

The service **observes** `currentUser`. When Umbraco reloads the current user (e.g. group/section change), subscribers are notified and the open More menu is rebuilt.

Section aliases come from settings / `appsettings` (`editHelperTextAllowedSections`). Changing config and reloading settings updates the check without a package rebuild.

### Extending with more actions

1. Add a value to `NeatTipTooltipAction` (e.g. `"share"`).
2. Extend `NeatTipTooltipPermissions` (e.g. `canShare`).
3. Implement the rule in `#evaluatePermissions` / a dedicated evaluator (prefer Umbraco context or Management API policies).
4. Include the action in `getAllowedActions()` when allowed.
5. Add a menu item factory branch in `TooltipManagerService.#createMoreMenuItem`.
6. Guard the click/save handler with `canPerform(...)`.
7. Enforce the same rule on any new Management API endpoint with `[Authorize(Policy = ...)]` using `AuthorizationPolicies`.

Keep new rules inside `NeatTipPermissionsService` (or helpers it owns). Do not put auth branching in DOM/tooltip layout code.

## Configuration

```json
"NeatTip": {
  "Enabled": true,
  "MinLength": 0,
  "EditHelperTextAllowedSections": [ "Umb.Section.Settings" ]
}
```

- Default: `Umb.Section.Settings` (Document Types / Settings access).
- Admins always get Edit regardless of this list.
- Values are Umbraco **section aliases**, not role names.

`GET /umbraco/management/api/v1/neattip/settings` returns `editHelperTextAllowedSections` so the client stays aligned with server config.

## Server authorization

**File:** `Controllers/NeatTipSettingsController.cs`

| Endpoint | Policy |
| --- | --- |
| `PUT .../neattip/settings` | `AuthorizationPolicies.SectionAccessSettings` |
| `PUT .../neattip/settings/property-description` | `AuthorizationPolicies.TreeAccessDocumentTypes` |

Policies are Umbraco built-ins (`Umbraco.Cms.Web.Common.Authorization.AuthorizationPolicies`). The property-description endpoint matches authority required to edit document types; UI hiding alone is not trusted.

## Safe defaults

If permission cannot be determined:

- **Allow** Copy
- **Hide** Edit
- **Reject** edit/save in the client
- **403** from the Management API without `TreeAccessDocumentTypes`
