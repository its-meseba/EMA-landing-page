# Greeting Audio System

This directory contains greeting audio files that are played when users connect to the voice interaction system.

## Directory Structure

The audio files are organized in the following structure:
```
/audio/greetings/
├── [company-id]/
│   ├── en/
│   │   └── greeting.mp3
│   ├── tr/
│   │   └── greeting.mp3
│   ├── ar/
│   │   └── greeting.mp3
│   ├── ru/
│   │   └── greeting.mp3
│   └── fr/
│       └── greeting.mp3
└── README.md
```

## Supported Companies

The following company directories are currently set up:
- `greyder/`
- `dunyabahce/`
- `ema/`
- `integral-group/`
- `mef/`

## Supported Languages

The system supports the following language codes:
- `en` - English
- `tr` - Turkish (default)
- `ar` - Arabic
- `ru` - Russian
- `fr` - French

## Audio File Requirements

- **Format**: MP3
- **Filename**: Must be exactly `greeting.mp3`
- **Duration**: Recommended 3-10 seconds
- **Quality**: 22.05 kHz or 44.1 kHz sample rate recommended
- **Size**: Keep under 1MB for optimal loading performance

## How to Use

### 1. Adding Greeting Audio Files

1. Navigate to the appropriate company and language directory
2. Place your audio file named `greeting.mp3` in the directory
3. The file will be automatically detected by the system

### 2. Enabling Greeting Audio in Components

To enable greeting audio playback when connecting to the voice system, pass the `speakWhenLoaded` prop to the `VoiceInteraction` component:

```tsx
<VoiceInteraction 
    sessionId={sessionId} 
    speakWhenLoaded={true} 
/>
```

### 3. Fallback Behavior

The system implements automatic fallback:
1. If the requested language file doesn't exist, it will try English (`en`)
2. If English doesn't exist, no greeting audio will be played
3. Errors in greeting audio don't affect the main voice interaction functionality

## Technical Details

### Cache Management

- Audio file URLs are cached to improve performance
- The cache can be cleared using `clearGreetingAudioCache()` from the greeting-audio-loader module

### Loading Process

1. The system checks if the audio file exists using a HEAD request
2. If found, the file URL is cached and returned
3. The audio is played using the HTML Audio API
4. Playback errors are logged but don't interrupt the main flow

### API Functions

The greeting audio system provides the following functions:

- `loadGreetingAudio(companyId, language)` - Load audio file URL
- `playGreetingAudio(companyId, language, onError?)` - Play greeting audio
- `preloadGreetingAudio(companyId, language)` - Preload audio for faster playback
- `hasGreetingAudio(companyId, language)` - Check if audio exists
- `getAvailableGreetingLanguages(companyId)` - Get all available languages for a company

## Example Usage

```typescript
import { playGreetingAudio } from '@/lib/greeting-audio-loader';

// Play greeting for Turkish Greyder user
await playGreetingAudio('greyder', 'tr', (error) => {
    console.warn('Greeting audio failed:', error);
});
```

## Troubleshooting

### Audio Not Playing

1. Check if the file exists in the correct directory
2. Verify the file is named exactly `greeting.mp3`
3. Ensure the file is a valid MP3 format
4. Check browser console for any loading errors
5. Verify the user has interacted with the page (required for auto-play)

### File Not Found

1. Check the company ID matches the directory name exactly
2. Verify the language code is supported
3. Ensure the file path is accessible from the public directory

### Performance Issues

1. Keep audio files under 1MB
2. Use appropriate compression for MP3 files
3. Consider preloading audio for frequently used languages

## Adding New Companies

To add a new company:

1. Create a new directory with the company ID as the name
2. Create subdirectories for each supported language
3. Add `greeting.mp3` files to each language directory
4. The system will automatically detect and use the new files 