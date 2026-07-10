# NeatTip

> Neat tips, neat interface

NeatTip is a backoffice-only UX package for Umbraco 17. It replaces long inline property descriptions with a compact info icon next to each property label. Editors can view the full helper text on demand in an interactive tooltip — keeping the content editor clean without losing guidance.

## Key features

- Cleaner content editor — descriptions are hidden until needed
- Hover on desktop, click or toggle on touch devices
- Draggable tooltips with smart positioning
- Copy helper text from the tooltip menu
- Edit helper text in the tooltip (permission-gated; admins and configured sections)
- Culture-aware helper text when editing variant cultures
- Backoffice settings with enable/disable, minimum description length, and diagnostics
- Only active while editing document content

## Package information

| | |
|---|---|
| **NuGet ID** | `Phases.Umbraco.NeatTip` |
| **Version** | 1.0.2 |
| **Umbraco** | 17.x (depends on Umbraco.Cms 17.2.2) |
| **.NET** | net10.0 |
| **Category** | Editor Tools |
| **License** | Free |
| **Author** | [Phases](https://www.phases.io/), midhun_roy |

## Installation

Install the package from NuGet, then **rebuild the Umbraco website project**:

```bash
dotnet add package Phases.Umbraco.NeatTip
dotnet build
```

After the build completes, you should see an `App_Plugins/PhasesUmbracoNeatTip` folder in your site project with `umbraco-package.json` and the backoffice JavaScript files. Restart the site if it is already running.

## Getting started

1. Open **Settings → Advanced Settings → NeatTip**
2. NeatTip is enabled by default — save settings if you change anything
3. Edit a document that has property descriptions
4. Look for the small info icon next to property labels
5. Hover or click the icon to open the tooltip
6. Use the **More (…)** menu to copy helper text, or edit it if you have permission

## Configuration

### Backoffice settings (recommended)

In **Settings → Advanced Settings → NeatTip** you can:

- **Enable NeatTip** — turn the package on or off (disabling restores Umbraco's native descriptions)
- **Minimum description length** — descriptions shorter than this value keep Umbraco's default layout; `0` means all descriptions use NeatTip

The settings page also includes a diagnostics panel to check that NeatTip services are running correctly.

### Optional appsettings.json

```json
"NeatTip": {
  "Enabled": true,
  "MinLength": 0,
  "EditHelperTextAllowedSections": [ "Umb.Section.Settings" ]
}
```

`EditHelperTextAllowedSections` controls which backoffice sections can see **Edit helper text** in the tooltip. Umbraco admins always have edit access. Values are Umbraco section aliases, not role names.

## Screenshots

### Before NeatTip

![Before NeatTip](https://raw.githubusercontent.com/phases/Phases.Umbraco.NeatTip/refs/heads/V17/V17/NeatTip/src/Phases.Umbraco.NeatTip/Screenshots/before-neattip.PNG)

### After NeatTip

![After NeatTip](https://raw.githubusercontent.com/phases/Phases.Umbraco.NeatTip/refs/heads/V17/V17/NeatTip/src/Phases.Umbraco.NeatTip/Screenshots/after-neattip.PNG)

### NeatTip

![NeatTip](https://raw.githubusercontent.com/phases/Phases.Umbraco.NeatTip/refs/heads/V17/V17/NeatTip/src/Phases.Umbraco.NeatTip/Screenshots/neattip-tooltip.PNG)

### NeatTip Edit

![NeatTip Edit](https://raw.githubusercontent.com/phases/Phases.Umbraco.NeatTip/refs/heads/V17/V17/NeatTip/src/Phases.Umbraco.NeatTip/Screenshots/NeatTip-edit.PNG)

![NeatTip Settings](https://raw.githubusercontent.com/phases/Phases.Umbraco.NeatTip/refs/heads/V17/V17/NeatTip/src/Phases.Umbraco.NeatTip/Screenshots/NeatTip-Settings-Area.PNG)

## What NeatTip is not

- Not a property editor — it does not replace or change property editors
- Does not alter stored content, except when an authorized user edits helper text from the tooltip
- Backoffice only — no impact on the public website

## Troubleshooting

If icons do not appear:

1. Rebuild the Umbraco website after installing the package (`dotnet build`)
2. Confirm `App_Plugins/PhasesUmbracoNeatTip/umbraco-package.json` exists in the site project
3. Confirm the site targets **.NET 10** and **Umbraco 17.2+**
4. Restart the site and hard-refresh the backoffice (Ctrl+F5)
5. Open **Settings → Advanced Settings → NeatTip** and check the diagnostics panel

## Links

- [Documentation](https://github.com/phases/Phases.Umbraco.NeatTip/tree/main/Doc)
- [Report an issue](https://github.com/phases/Phases.Umbraco.NeatTip/issues)
- [Phases](https://www.phases.io/)
