# Word Search Game

A modern, mobile-friendly word search puzzle game built with JavaScript. Find words in any direction (horizontal, vertical, or diagonal) by selecting letters in sequence.

![chrome_LfU0yncQ07](https://github.com/user-attachments/assets/c0977213-5cca-4b20-b1d0-df989d820ef5)

![chrome_3VPSwgVj83](https://github.com/user-attachments/assets/a920d7eb-7269-4966-8c1a-0be83e8c1dbe)


https://github.com/user-attachments/assets/087223ca-a835-4fae-9a63-4017a54ef9f1



## Features

- 🎮 Multiple categories (Animals, Countries, Fruits, Sports)
- 🌟 Three difficulty levels (Easy, Medium, Hard)
- 🎵 Sound effects for game actions
- 🌙 Dark theme optimized for mobile screens
- 📱 Responsive design that works on all devices
- 💾 Local storage for saving game settings
- ⏱️ Timer-based gameplay
- 💫 Hint system

## How to Play

1. Select a category from the main menu
2. Choose your difficulty level (affects grid size and time limit)
3. Find words by selecting letters in sequence:
   - Tap and drag to select letters
   - Words can be in any direction (horizontal, vertical, diagonal)
   - Found words will be highlighted
4. Complete the puzzle before time runs out!

## Adding New Categories and Words

To add new categories or modify existing word lists, edit the `config.js` file:

1. Open `js/config/config.js`
2. Locate the `categories` object
3. Add a new category or modify existing ones:

```javascript
categories: {
    animals: ['LION', 'TIGER', 'ELEPHANT'],
    countries: ['FRANCE', 'JAPAN', 'BRAZIL'],
    // Add your new category:
    vehicles: ['CAR', 'TRUCK', 'PLANE', 'BOAT']
}
```

Guidelines for adding words:
- Use UPPERCASE letters
- Keep words between 3-12 letters
- Avoid special characters
- Consider grid size limitations (based on difficulty)
- Test new categories thoroughly

## Technologies Used

- **Frontend Framework**: Vanilla JavaScript (ES6+)
- **CSS Framework**: Tailwind CSS
- **Storage**: LocalStorage API
- **Audio**: Web Audio API
- **UI/UX**: 
  - Flexbox/Grid for layouts
  - CSS Gradients for modern look
  - Touch events for mobile interaction

## Game Settings

The game includes several configurable settings:

- **Difficulty Levels**:
  - Easy: 8x8 grid, 3 minutes
  - Medium: 10x10 grid, 2 minutes
  - Hard: 12x12 grid, 1 minute

- **Sound Settings**:
  - Toggle sound effects

## Contributing

Feel free to contribute to this project by:
1. Forking the repository
2. Creating a feature branch
3. Making your changes
4. Submitting a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Credits

Developed by Suleiman
Version 1.0.0
