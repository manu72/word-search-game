# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A modern word search puzzle game built with vanilla JavaScript ES6+ modules, designed for both web browsers and mobile devices (Apache Cordova support). The game features multiple categories, difficulty levels, sound effects, and local storage for settings persistence.

## Development Commands

Since this is a client-side JavaScript project with no build system:

- **Run locally**: Open `index.html` in a web browser or use a local server like `python -m http.server` or `npx serve`
- **No tests**: The project currently has no automated test suite
- **No linting**: No linting configuration is present

## Architecture

### Core Structure
- **Entry Point**: `js/main.js` initializes the app with Cordova/browser compatibility
- **Main App**: `js/app.js` contains the main App class that manages views and navigation
- **View-Based Architecture**: Three main views (MainMenuView, GameView, CreditsView) managed by the App class

### Key Components
- **Config (`js/config/config.js`)**: Centralized configuration for categories, difficulties, settings, and credits
- **AudioManager (`js/managers/AudioManager.js`)**: Handles all sound effects and music
- **SettingsPopup (`js/components/SettingsPopup.js`)**: Modal popup for game settings
- **LocalStorage (`js/classes/localStorage.js`)**: Generic localStorage wrapper (note: uses SEBHA_STORAGE_ prefix)

### Game Categories & Customization
Word categories are defined in `js/config/config.js` in the `categories` object:
- animals, countries, fruits, sports, colors, food
- Each category contains 20 words in uppercase
- Words should be 3-12 letters, no special characters

### Difficulty Settings
Three levels defined in `js/config/config.js`:
- Easy: 8x8 grid, 4 words, 5 minutes
- Medium: 10x10 grid, 6 words, 4 minutes  
- Hard: 12x12 grid, 8 words, 3 minutes

### Audio Assets
Sound files located in `assets/sounds/`:
- background.mp3, click.mp3, word-found.mp3, word-try.mp3, win.mp3, etc.

### Styling
- Uses Tailwind CSS via CDN
- Custom CSS animations in index.html
- Dark theme with gradient backgrounds
- Mobile-first responsive design

## File Organization

```
js/
├── main.js           # Entry point & Cordova compatibility
├── app.js            # Main application controller
├── config/
│   └── config.js     # Game configuration & settings
├── views/
│   ├── MainMenuView.js
│   ├── GameView.js
│   └── CreditsView.js
├── managers/
│   └── AudioManager.js
├── components/
│   └── SettingsPopup.js
└── classes/
    └── localStorage.js
```

## Important Notes

- ES6 modules with explicit imports/exports
- No bundler or transpilation - runs directly in modern browsers
- Mobile touch events and responsive design
- Settings persist via localStorage
- Cordova-ready for mobile app packaging