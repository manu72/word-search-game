export class Config {
    constructor() {
        this.categories = {
            animals: [
                'LION', 'TIGER', 'ELEPHANT', 'GIRAFFE', 'ZEBRA', 
                'PENGUIN', 'KANGAROO', 'DOLPHIN', 'PANDA', 'KOALA',
                'CHEETAH', 'GORILLA', 'RHINO', 'BEAR', 'WOLF',
                'FOX', 'EAGLE', 'OWL', 'SNAKE', 'CROCODILE'
            ],
            countries: [
                'FRANCE', 'JAPAN', 'BRAZIL', 'CANADA', 'EGYPT',
                'INDIA', 'CHINA', 'SPAIN', 'ITALY', 'RUSSIA',
                'MEXICO', 'GREECE', 'KENYA', 'PERU', 'KOREA',
                'TURKEY', 'NORWAY', 'SWEDEN', 'IRELAND', 'POLAND'
            ],
            fruits: [
                'APPLE', 'BANANA', 'ORANGE', 'GRAPE', 'MANGO',
                'KIWI', 'LEMON', 'PEACH', 'PEAR', 'PLUM',
                'CHERRY', 'COCONUT', 'PAPAYA', 'MELON', 'FIG',
                'LIME', 'GUAVA', 'DATES', 'BERRY', 'APRICOT'
            ],
            sports: [
                'SOCCER', 'TENNIS', 'GOLF', 'RUGBY', 'CRICKET',
                'HOCKEY', 'BOXING', 'SKIING', 'SURFING', 'CYCLING',
                'RUNNING', 'SWIMMING', 'DIVING', 'ROWING', 'JUDO',
                'KARATE', 'BOWLING', 'ARCHERY', 'FENCING', 'POLO'
            ],
            colors: [
                'RED', 'BLUE', 'GREEN', 'YELLOW', 'PURPLE',
                'ORANGE', 'PINK', 'BROWN', 'BLACK', 'WHITE',
                'GRAY', 'GOLD', 'SILVER', 'VIOLET', 'INDIGO',
                'MAROON', 'CORAL', 'BEIGE', 'TEAL', 'NAVY'
            ],
            food: [
                'PIZZA', 'PASTA', 'SUSHI', 'BURGER', 'TACO',
                'SALAD', 'CURRY', 'BREAD', 'STEAK', 'SOUP',
                'RICE', 'NOODLE', 'CAKE', 'CHIPS', 'FISH',
                'WRAP', 'BACON', 'WINGS', 'TOAST', 'EGGS'
            ]
        };

        this.difficulties = {
            easy: {
                size: 8,
                wordCount: 4,
                timeLimit: 300
            },
            medium: {
                size: 10,
                wordCount: 6,
                timeLimit: 240
            },
            hard: {
                size: 12,
                wordCount: 8,
                timeLimit: 180
            }
        };

        this.settings = {
            difficulty: 'easy',
            theme: 'dark',
            sound: true
        };

        this.credits = {
            version: '1.0.0',
            developer: 'Suleiman',
            year: '2024',
            technologies: [
                'HTML5',
                'JavaScript',
                'Tailwind CSS',
                'Apache Cordova'
            ],
            description: 'A fun and challenging word search game with multiple categories and difficulty levels.',
            repository: 'https://github.com/yourusername/word-search-game'
        };

        this.loadFromStorage();
    }

    loadFromStorage() {
        const savedSettings = localStorage.getItem('wordSearchSettings');
        if (savedSettings) {
            this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
        }
    }

    saveToStorage() {
        localStorage.setItem('wordSearchSettings', JSON.stringify(this.settings));
    }

    getTheme() {
        return this.settings.theme;
    }

    getDifficulty() {
        return this.difficulties[this.settings.difficulty];
    }
}
