# EMA Modal - Shopify Extension

A powerful Shopify Theme App Extension that integrates voice-activated customer assistance through an interactive modal. EMA (Etkileşimli Müşteri Asistanı) helps customers find products and get answers using natural language conversation.

## Features

🎯 **Easy Theme Integration** - Add EMA Modal directly through Shopify's theme editor  
🌍 **Multi-language Support** - Built-in support for Turkish, English, German, Arabic, Russian, and more  
📱 **Fully Responsive** - Optimized for both desktop and mobile devices  
🎨 **Customizable** - Match your brand colors and customize all text content  
⚡ **Performance Optimized** - Fast-loading React components with minimal bundle size  
🔒 **Privacy Focused** - Secure iframe integration with your EMA instance  
🤖 **Smart Positioning** - Auto-detects and avoids conflicts with other floating buttons  

## Installation

### Prerequisites

- Shopify CLI installed (`npm install -g @shopify/cli`)
- Node.js 18+ and npm/pnpm
- Shopify Partner account
- Development store for testing

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/ema-modal-shopify
   cd ema-modal-shopify
   ```

2. **Install dependencies and build**
   ```bash
   npm run setup
   ```

3. **Start development**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## Configuration

### App Block Settings

The EMA Modal can be configured directly in the Shopify theme editor:

1. **EMA Configuration**
   - **EMA Instance URL**: Your hosted EMA instance URL (required)
   - **Theme Color**: Primary color for buttons and UI elements

2. **Modal Content**
   - **Modal Title**: Main heading shown in the modal
   - **Modal Subtitle**: Subtitle text (supports `{{brand}}` placeholder)
   - **Brand Name**: Your business name for personalization
   - **CTA Button Text**: Text for the main action button

3. **Appearance & Behavior**
   - **Button Position**: Auto-detect, bottom-right, bottom-left, etc.
   - **Auto-trigger**: Automatically open modal on scroll/exit intent
   - **Enable/Disable**: Toggle modal functionality

### Localization

The extension automatically displays localized text based on the store's language:

- **English**: "💬 Whatever you are looking for, just say it."
- **Turkish**: "💬 Ne arıyorsan, konuş yeter."
- **German**: "💬 Was auch immer Sie suchen, sagen Sie es einfach."
- **Arabic**: "💬 مهما كان ما تبحث عنه ، فقط قله."
- **Russian**: "💬 Что бы вы ни искали, просто скажите это."

## Development

### Project Structure

```
shopify-extension/
├── extensions/
│   └── ema-modal-theme-extension/      # Theme extension
│       ├── blocks/                     # App blocks (Liquid)
│       ├── locales/                    # Translations
│       ├── src/                        # React source code
│       ├── assets/                     # Built assets
│       └── shopify.extension.toml      # Extension config
├── shopify.app.toml                    # App configuration
├── package.json                        # Main project config
└── README.md                           # This file
```

### Development Workflow

1. **Start Shopify development server**
   ```bash
   npm run dev
   ```

2. **Build extension assets** (in a separate terminal)
   ```bash
   npm run build:extension
   ```

3. **Watch for changes** (optional)
   ```bash
   npm run dev:extension
   ```

### Building Components

The React components are built using Vite and output to the `assets/` directory:

- `ema-modal.js` - Main JavaScript bundle
- `ema-modal.css` - Compiled styles

### Customizing Styles

Styles are written using utility classes similar to Tailwind CSS. To customize:

1. Edit `src/index.css` for global styles
2. Modify component classes in `src/components/`
3. Rebuild with `npm run build:extension`

## Deployment

### Development Store Testing

1. Install the app on your development store
2. Add the EMA Modal app block to your theme
3. Configure your EMA instance URL
4. Test the modal functionality

### Production Deployment

1. **Build the extension**
   ```bash
   npm run build
   ```

2. **Deploy to Shopify**
   ```bash
   npm run deploy
   ```

3. **Submit for review** (if publishing to App Store)
   - Go to Shopify Partner Dashboard
   - Submit app for review
   - Wait for approval

### Distribution Options

- **Public App Store**: Submit for review and public distribution
- **Custom App**: Install directly on specific stores
- **Private Distribution**: Share with selected partners

## API Reference

### App Block Schema

The extension uses Shopify's app block schema for theme editor integration:

```liquid
{% schema %}
{
  "name": "EMA Modal",
  "target": "body",
  "settings": [
    {
      "type": "url",
      "id": "ema_url",
      "label": "EMA Instance URL"
    },
    // ... other settings
  ]
}
{% endschema %}
```

### React Component Props

```typescript
interface EmaModalProps {
  emaUrl: string;                    // Required: EMA instance URL
  title?: string;                    // Modal title
  subtitle?: string;                 // Modal subtitle
  brandName?: string;                // Brand name
  themeColor?: string;               // Primary color
  buttonPosition?: string;           // Button position
  floatingButtonText?: string;       // Floating button text
  // ... other props
}
```

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Features**: ES2015+, CSS Grid, Flexbox, CSS Variables

## Performance

- **Bundle Size**: ~48KB gzipped (JavaScript + CSS)
- **Loading**: Lazy-loaded iframe for EMA instance
- **Optimization**: Tree-shaking, minification, compression
- **CDN**: Assets served from Shopify's CDN

## Troubleshooting

### Common Issues

1. **Extension not appearing**
   - Check that EMA URL is configured
   - Verify app block is added to theme
   - Clear browser cache

2. **Styling conflicts**
   - Check for CSS conflicts with theme
   - Verify z-index values
   - Test button position settings

3. **Loading issues**
   - Verify EMA instance is accessible
   - Check browser console for errors
   - Test network connectivity

### Debug Mode

Enable debug logging by adding to browser console:

```javascript
localStorage.setItem('emaDebug', 'true');
```

## Support

- **Documentation**: [Full Implementation Guide](./SHOPIFY_IMPLEMENTATION_GUIDE.md)
- **Issues**: [GitHub Issues](https://github.com/your-org/ema-modal-shopify/issues)
- **Email**: support@ema.ai
- **Discord**: [EMA Community](https://discord.gg/ema)

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Changelog

### v1.0.0 (2024-01-XX)

- ✨ Initial release
- 🎯 Theme app extension with app blocks
- 📱 Responsive design for all devices
- 🌍 Multi-language support
- ⚡ Performance optimizations
- 🔧 Auto-positioning for floating buttons

---

**Built with ❤️ by the EMA Team**

For questions or support, reach out to us at [support@ema.ai](mailto:support@ema.ai) 