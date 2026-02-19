# Phases.Umbraco.NeatTip

> "Neat tips, neat interface"

## 📋 What is NeatTip?

NeatTip is an Umbraco package that automatically converts long property descriptions into compact, interactive tooltips. Instead of cluttering your content editing interface with lengthy descriptions, NeatTip displays a small icon next to property labels. Click or hover the icon to view the full description in a beautifully styled tooltip.

### Key Benefits

- ✅ **Cleaner Interface**: Reduces visual clutter in the Umbraco backoffice
- ✅ **Better UX**: Descriptions are available on-demand, not always visible
- ✅ **Draggable Tooltips**: Move tooltips to compare with property values
- ✅ **Smart Positioning**: Tooltips automatically position to avoid overlapping fields
- ✅ **Non-Intrusive**: Only activates in content editing pages

---

## 🎯 Where to Find the Icons

After installing NeatTip, you'll see small **information icons (ℹ)** next to property labels in the Umbraco content editing interface.

### Icon Location

The icons appear:
- **Next to property labels** (similar to other Umbraco property icons)
- **Only in content editing pages** (`#/content/content/edit/`)
- **Only for properties with descriptions** that meet the minimum length requirement

## 🖱️ How to Use the Tooltips

### Desktop Usage

1. **Hover**: Move your mouse over the ℹ icon to see the tooltip
2. **Click**: Click the icon to pin/toggle the tooltip (keeps it visible)
3. **Drag**: Click and drag the tooltip by the drag handle (top-right corner) to move it anywhere on screen
4. **Close**: Click the icon again to close a pinned tooltip

### Tooltip Features

- **Smart Positioning**: Automatically positions to avoid overlapping property fields
- **Draggable**: Move tooltips to compare with property values
- **Position Memory**: Remembers your custom position when toggled
- **Auto-Hide on Scroll**: Tooltips close when you scroll (unless pinned)
- **Responsive**: Adapts to different screen sizes

---

## ⚙️ Configuration

NeatTip works automatically with no configuration required. However, if you need to customize behavior, you can modify the configuration in `neatTipController.js`:

```javascript
var config = {
    minLength: 0,              // Minimum characters to transform description
    tooltipDelay: 200,         // Delay before showing tooltip (ms)
    tooltipMaxWidth: 320,      // Maximum tooltip width (px)
    indicatorChar: 'ℹ'        // Icon character to display
};
```

### Default Settings

- **Minimum Length**: 0 characters (all descriptions are transformed)
- **Tooltip Delay**: 200ms
- **Max Width**: 320px
- **Icon**: ℹ (information symbol)

---

## 🔧 Installation

### Manual Installation

1. Download or clone this package
2. Copy the `Phases.Umbraco.NeatTip` folder to your Umbraco project:
   ```
   /App_Plugins/Phases.Umbraco.NeatTip/
   ```
3. Ensure the folder structure is:
   ```
   App_Plugins/
   └── Phases.Umbraco.NeatTip/
       ├── package.manifest
       ├── js/
       │   └── neatTipController.js
       └── css/
           └── style.neattip.css
   ```
4. Restart your Umbraco application
5. The package will automatically load on next backoffice access

### Via NuGet (if available)

```powershell
Install-Package Phases.Umbraco.NeatTip
```

---

## 🎨 Customization

### Styling

You can customize the tooltip appearance by modifying `style.neattip.css`. The package uses CSS custom properties and `!important` flags to ensure styles apply correctly.

### Icon Customization

To change the icon character, modify the `indicatorChar` in the configuration:

```javascript
indicatorChar: '?'  // Question mark
indicatorChar: 'ⓘ'  // Circled information
indicatorChar: 'ℹ'  // Information symbol (default)
```

---

## 🐛 Troubleshooting

### Icons Not Appearing

1. **Check if you're in content editing**: NeatTip only works in content editing pages (`#/content/content/edit/`)
2. **Verify files are loaded**: Check browser console for any JavaScript errors
3. **Clear browser cache**: Hard refresh (Ctrl+F5) to ensure latest files load
4. **Check package.manifest**: Ensure the manifest file is correctly formatted

### Tooltips Not Showing

1. **Check console**: Open browser developer tools (F12) and check for errors
2. **Verify description exists**: The property must have a description configured
3. **Check z-index conflicts**: Other packages with high z-index modals might overlap

### Descriptions Still Visible

- This is normal for descriptions that are too short (below `minLength`)
- Short descriptions remain visible to avoid unnecessary tooltips
- You can adjust `minLength` in the configuration if needed

### Conflicts with Other Packages

- NeatTip is designed to be non-intrusive
- If you experience conflicts, check the browser console for errors
- Ensure other packages aren't modifying the same DOM elements

---

## 📌 Notes

- NeatTip only activates in content editing pages to avoid affecting other Umbraco areas
- The package uses AngularJS decorators to extend Umbraco's property editor directive
- All styles are namespaced with `neattip-` prefix to avoid conflicts
- Flash prevention ensures descriptions don't flash before icons appear

---

**Enjoy a cleaner, more organized Umbraco editing experience!** 🎉

## Screenshots

## Before NeatTip

https://raw.githubusercontent.com/phases/Phases.Umbraco.NeatTip/refs/heads/main/Phases.Umbraco.NeatTip/Screenshots/before-neat-tip.PNG

## After NeatTip

https://raw.githubusercontent.com/phases/Phases.Umbraco.NeatTip/refs/heads/main/Phases.Umbraco.NeatTip/Screenshots/after-neat-tip.PNG

## Moved Tooltip

https://raw.githubusercontent.com/phases/Phases.Umbraco.NeatTip/refs/heads/main/Phases.Umbraco.NeatTip/Screenshots/moved-tooltip.PNG

## NeatTip Icon

https://raw.githubusercontent.com/phases/Phases.Umbraco.NeatTip/refs/heads/main/Phases.Umbraco.NeatTip/Screenshots/neat-tip-icon.PNG