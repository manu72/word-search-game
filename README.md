# Word Search Game

A modern, cross-platform word search puzzle game built with vanilla JavaScript ES6+ modules. Features intelligent word placement, multi-directional word finding, and comprehensive mobile optimization. Find words in 8 directions by selecting letters with mouse or touch interactions.

![chrome_LfU0yncQ07](https://github.com/user-attachments/assets/c0977213-5cca-4b20-b1d0-df989d820ef5)

![chrome_3VPSwgVj83](https://github.com/user-attachments/assets/a920d7eb-7269-4966-8c1a-0be83e8c1dbe)


https://github.com/user-attachments/assets/087223ca-a835-4fae-9a63-4017a54ef9f1



## ✨ Features

### 🎮 Core Gameplay
- **6 Word Categories**: Animals, Countries, Fruits, Sports, Colors, Food (20 words each)
- **3 Difficulty Levels**: Easy (8x8), Medium (10x10), Hard (12x12) with varying time limits
- **8-Direction Word Search**: Horizontal, vertical, and diagonal in all directions
- **Smart Word Placement**: Advanced algorithm prevents overlaps and ensures solvable puzzles
- **Real-time Selection**: Visual feedback for word selection with straight-line validation
- **Timer-based Gameplay**: Countdown timer with varying time limits per difficulty
- **Hint System**: 3 hints per game with temporary word highlighting

### 🎨 User Interface
- **Modern Dark Theme**: Gradient backgrounds and premium visual design
- **Responsive Design**: Mobile-first approach that works on all screen sizes
- **Touch Optimized**: Full touch and mouse support for cross-platform compatibility
- **Smooth Animations**: Pop and bounce-in effects for enhanced user experience
- **Category Icons**: Emoji-based visual category identification

### 🔊 Audio Experience
- **Sound Effects**: Click, word-found, word-try, win sounds
- **Focus Management**: Intelligent audio handling when switching tabs
- **Audio Settings**: Toggle sound effects on/off with persistent preferences

### ⚙️ Settings & Persistence
- **Persistent Settings**: Sound preferences saved via localStorage
- **Settings Modal**: Easy-to-access settings popup during gameplay
- **Local Storage**: Game preferences automatically saved and restored

## 🎯 How to Play

1. **Choose Category**: Select from Animals, Countries, Fruits, Sports, Colors, or Food
2. **Set Difficulty**: Pick Easy, Medium, or Hard (affects grid size, word count, and time limit)
3. **Find Words**: 
   - **Mouse**: Click and drag to select letters in sequence
   - **Touch**: Tap and drag across letters on mobile devices
   - **Directions**: Words can be horizontal, vertical, or diagonal (8 directions total)
   - **Validation**: Only straight-line selections are valid
4. **Use Hints**: Click the hint button for temporary word highlighting (3 hints available)
5. **Beat the Clock**: Find all words before time runs out to win!

### Difficulty Settings
- **Easy**: 8×8 grid, 4 words, 5 minutes
- **Medium**: 10×10 grid, 6 words, 4 minutes  
- **Hard**: 12×12 grid, 8 words, 3 minutes

## 🚀 Getting Started

### Quick Start
1. **Download or Clone**: Get the project files to your local machine
2. **Open in Browser**: Open `index.html` in any modern web browser
3. **Start Playing**: No build process required - runs directly in the browser

### Local Development Server (Optional)
For a better development experience, serve files through a local server:

```bash
# Using Python (Python 3)
python -m http.server 8000

# Using Node.js (serve package)
npx serve .

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 🔧 Technical Architecture

### File Structure
```
Word-Search-Game/
├── index.html              # Main HTML file
├── assets/sounds/          # Audio files (MP3 format)
├── js/
│   ├── main.js            # Entry point with Cordova support
│   ├── app.js             # Main application controller
│   ├── config/
│   │   └── config.js      # Game configuration & word lists
│   ├── views/
│   │   ├── MainMenuView.js    # Menu interface
│   │   ├── GameView.js        # Core game logic
│   │   └── CreditsView.js     # Credits/about page
│   ├── managers/
│   │   └── AudioManager.js    # Sound effect management
│   ├── components/
│   │   └── SettingsPopup.js   # Settings modal
│   └── classes/
       └── localStorage.js     # Storage utility
```

### Technologies Used
- **Frontend**: Vanilla JavaScript ES6+ modules
- **Styling**: Tailwind CSS (via CDN)
- **Typography**: Google Fonts (Poppins)
- **Storage**: LocalStorage API
- **Audio**: Web Audio API
- **Mobile**: Apache Cordova ready

### Key Features Implementation
- **MVC Architecture**: Clean separation between views, logic, and data
- **Event-driven Design**: Modular component communication
- **Responsive Grid**: CSS Grid with Tailwind utilities
- **Touch Events**: Full mobile gesture support
- **State Management**: Centralized configuration and settings

## ✏️ Customization

### Adding New Categories
Edit `js/config/config.js` to add word categories:

```javascript
categories: {
    animals: ['LION', 'TIGER', 'ELEPHANT'],
    countries: ['FRANCE', 'JAPAN', 'BRAZIL'],
    // Add your new category:
    vehicles: ['CAR', 'TRUCK', 'PLANE', 'BOAT'],
    programming: ['JAVASCRIPT', 'PYTHON', 'HTML', 'CSS']
}
```

### Word Guidelines
- **Format**: Use UPPERCASE letters only
- **Length**: 3-12 characters recommended
- **Characters**: Letters only, no spaces or special characters
- **Testing**: Verify words fit within grid size limitations
- **Count**: Each category should have 15-25 words for variety

### Modifying Difficulty
Adjust difficulty settings in `js/config/config.js`:

```javascript
difficulties: {
    easy: {
        size: 8,        // Grid size (8x8)
        wordCount: 4,   // Number of words to find
        timeLimit: 300  // Time in seconds (5 minutes)
    }
    // Add custom difficulties...
}
```

## 📱 Mobile App Development

### Cordova Integration
The project is prepared for mobile app deployment using Apache Cordova:

```bash
# Install Cordova CLI
npm install -g cordova

# Add platforms
cordova platform add android
cordova platform add ios

# Build for mobile
cordova build
```

### Mobile Features
- **Touch Optimized**: Full gesture support for word selection
- **Responsive Design**: Adapts to all screen sizes and orientations
- **Performance**: Efficient rendering for smooth mobile gameplay
- **Audio**: Mobile-friendly audio management

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow ES6+ JavaScript standards
- Maintain responsive design principles
- Test on both desktop and mobile devices
- Keep code modular and well-documented
- Ensure audio assets are optimized for web

### Ideas for Contributions
- Additional word categories
- New game modes (timed challenges, multiplayer)
- Accessibility improvements
- Performance optimizations
- UI/UX enhancements

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏆 Credits

**Developer**: Suleiman  
**Version**: 1.0.0  
**Year**: 2024

### Technologies & Resources
- **JavaScript ES6+** - Core functionality
- **Tailwind CSS** - Styling framework
- **Google Fonts** - Poppins typography
- **Web Audio API** - Sound effects
- **Apache Cordova** - Mobile app framework

---

<div align="center">

**Enjoy playing Word Search Game!** 🎯

[Report Issues](https://github.com/yourusername/word-search-game/issues) • [Request Features](https://github.com/yourusername/word-search-game/issues) • [View Source](https://github.com/yourusername/word-search-game)

</div>
