#!/bin/bash

# EMA Modal Plugin Build Script
# This script builds the React app and packages the plugin for distribution

set -e

echo "🔧 Building EMA Modal WordPress Plugin..."

# Navigate to the React source directory
cd react-src

echo "📦 Installing dependencies..."
pnpm install

echo "🏗️  Building React app..."
pnpm build

echo "✅ Build completed successfully!"

cd ..

# Create a clean dist folder for packaging (optional)
if [ "$1" = "package" ]; then
    echo "📦 Packaging plugin for distribution..."
    
    # Remove node_modules to reduce size
    rm -rf react-src/node_modules
    
    # Create a zip file for distribution
    cd ..
    zip -r "ema-modal-plugin-v1.0.0.zip" ema-modal-plugin/ \
        -x "ema-modal-plugin/react-src/node_modules/*" \
        -x "ema-modal-plugin/.git/*" \
        -x "ema-modal-plugin/*.log"
    
    echo "✅ Plugin packaged as ema-modal-plugin-v1.0.0.zip"
    cd ema-modal-plugin
fi

echo "🎉 Build process completed!"
echo ""
echo "📁 Built files are in the 'dist' directory:"
ls -la dist/
echo ""
echo "🚀 Ready to install in WordPress!"
echo "   1. Upload the entire 'ema-modal-plugin' folder to wp-content/plugins/"
echo "   2. Activate the plugin in WordPress admin"
echo "   3. Configure settings at Settings > EMA Modal" 