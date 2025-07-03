# EMA Modal WordPress Plugin

A WordPress plugin that integrates the interactive EMA (Etkileşimli Müşteri Asistanı) modal into any WordPress website.

## Description

This plugin adds a floating EMA assistant button to your WordPress site that opens an interactive chat modal. EMA helps visitors find products and get answers to their questions using natural language conversation.

## Features

- 🎯 **Easy Integration**: Simple one-click installation and configuration
- 🌍 **Multi-language Support**: Works with Turkish, English, Arabic, Russian, and German
- 📱 **Fully Responsive**: Optimized for both desktop and mobile devices
- 🎨 **Customizable**: Match your brand colors and customize messages
- ⚡ **Fast Loading**: Optimized React-based interface
- 🔒 **Privacy Focused**: Secure iframe integration

## Installation

### Method 1: Upload Plugin File

1. Download the plugin ZIP file
2. Go to your WordPress admin panel
3. Navigate to **Plugins > Add New > Upload Plugin**
4. Choose the ZIP file and click **Install Now**
5. Click **Activate Plugin**

### Method 2: Manual Installation

1. Extract the plugin files
2. Upload the `ema-modal-plugin` folder to `/wp-content/plugins/`
3. Activate the plugin through the WordPress admin **Plugins** menu

## Configuration

1. After activation, go to **Settings > EMA Modal** in your WordPress admin
2. Configure the **Main Configuration** section:
   - **EMA URL**: Your unique EMA instance URL (required for the plugin to work)
   - **Theme Color**: Choose a color that matches your brand
   - **Modal Title**: Customize the modal heading
   - **Modal Subtitle**: Set the subtitle (use `{{brand}}` placeholder for brand name)
   - **Brand Name**: Your business name
3. Configure the **Localization for Floating Text** section:
   - Enter the text for the floating button bubble for each supported language. The plugin will automatically show the correct version based on your site's active language.
4. Click **Save Settings**

## Usage

Once configured, the EMA modal will automatically appear on all public pages of your website as a floating button in the bottom-right corner.

### User Experience

- Visitors see a floating button with the text "💬 Ne arıyorsan, konuş yeter."
- Clicking the button opens a full-screen EMA chat interface
- The modal automatically appears for users who scroll 75% down the page or move their cursor to leave the page
- Users can close the modal by pressing Escape or clicking the X button

## Settings Reference

| Setting | Description | Default Value |
|---------|-------------|---------------|
| **EMA URL** | Your unique EMA instance URL (required) | - |
| **Theme Color** | Primary color for buttons and branding | `#0066ff` |
| **Modal Title** | Main heading in the modal | `EMA – Etkileşimli Müşteri Asistanı` |
| **Modal Subtitle** | Subtitle text (supports `{{brand}}` placeholder) | `Ürünleri bulmanın, sorularınızı sormanın en kolay yolu` |
| **Brand Name** | Your business name for personalization | Your site's title |
| **Floating Text (EN, TR, DE, AR, RU)** | Localized text for the floating button bubble. | Varies by language |

## Technical Details

- **Built with**: React 18, TypeScript, Vite
- **Styling**: Custom CSS with responsive design
- **Performance**: Lazy-loaded with optimized bundle size (48KB gzipped)
- **Compatibility**: WordPress 5.0+ and modern browsers
- **Mobile**: Fully responsive and touch-optimized

## Troubleshooting

### The modal doesn't appear
1. Check that you've entered a valid EMA URL in the settings
2. Ensure the plugin is activated
3. Clear any caching plugins
4. Check browser console for JavaScript errors

### Styling issues
1. Check for CSS conflicts with your theme
2. Try disabling other plugins temporarily
3. Test with a default WordPress theme

### Performance concerns
1. The plugin loads assets only on the frontend (not in admin)
2. Assets are minified and optimized
3. The modal loads on-demand when triggered

## Support

For technical support or to get your EMA URL:
- Email: info@ema.ai
- Phone: +90 212 000 00 00

## Changelog

### Version 1.0.0
- Initial release
- React-based modal interface
- WordPress admin settings page
- Responsive design
- Multi-trigger modal activation
- Brand customization options

## License

GPL v2 or later

## Credits

Developed by the EMA Team for seamless WordPress integration.

---

**Need an EMA URL?** Contact the EMA team to get started with your interactive customer assistant. 