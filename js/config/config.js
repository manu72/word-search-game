export class Config {
  constructor() {
    this.categories = {
      animals: [
        "LION",
        "TIGER",
        "ELEPHANT",
        "GIRAFFE",
        "ZEBRA",
        "PENGUIN",
        "KANGAROO",
        "DOLPHIN",
        "PANDA",
        "KOALA",
        "CHEETAH",
        "GORILLA",
        "RHINOCEROS",
        "BEAR",
        "WOLF",
        "FOX",
        "EAGLE",
        "OWL",
        "SNAKE",
        "CROCODILE",
      ],
      countries: [
        "FRANCE",
        "JAPAN",
        "BRAZIL",
        "CANADA",
        "SAMOA",
        "INDIA",
        "CHINA",
        "SPAIN",
        "ITALY",
        "AUSTRALIA",
        "MEXICO",
        "GREECE",
        "THAILAND",
        "PERU",
        "KOREA",
        "TURKEY",
        "AOTEAROA",
        "SWEDEN",
        "IRELAND",
        "PHILIPPINES",
      ],
      fruits: [
        "APPLE",
        "BANANA",
        "ORANGE",
        "GRAPE",
        "MANGO",
        "KIWI",
        "LEMON",
        "PEACH",
        "PEAR",
        "PLUM",
        "CHERRY",
        "COCONUT",
        "PAPAYA",
        "MELON",
        "FIG",
        "LIME",
        "GUAVA",
        "DATES",
        "BERRY",
        "APRICOT",
      ],
      sports: [
        "SOCCER",
        "TENNIS",
        "EQUESTRIAN",
        "RUGBY",
        "BOBSLEIGH",
        "HOCKEY",
        "BOXING",
        "SNOWBOARDING",
        "KITESURFING",
        "CYCLING",
        "RUNNING",
        "SWIMMING",
        "DIVING",
        "ROWING",
        "JUDO",
        "KARATE",
        "TRIATHLON",
        "ARCHERY",
        "FENCING",
        "POLO",
      ],
      colors: [
        "RED",
        "BLUE",
        "GREEN",
        "YELLOW",
        "PURPLE",
        "ORANGE",
        "PINK",
        "BROWN",
        "BLACK",
        "WHITE",
        "GRAY",
        "GOLD",
        "SILVER",
        "VIOLET",
        "INDIGO",
        "MAROON",
        "CORAL",
        "BEIGE",
        "TEAL",
        "NAVY",
      ],
      food: [
        "PIZZA",
        "PASTA",
        "SUSHI",
        "BURGER",
        "PANCIT",
        "SALAD",
        "CURRY",
        "BREAD",
        "TAPSILOG",
        "SOUP",
        "RICE",
        "BANANARITO",
        "CAKE",
        "CHIPS",
        "FISH",
        "WRAP",
        "ADOBO",
        "SINIGANG",
        "HALOHALO",
        "AMPALAYA",
      ],
    };

    this.difficulties = {
      easy: {
        size: 8,
        wordCount: 6,
        timeLimit: 300,
      },
      medium: {
        size: 10,
        wordCount: 8,
        timeLimit: 240,
      },
      hard: {
        size: 12,
        wordCount: 10,
        timeLimit: 180,
      },
    };

    this.settings = {
      difficulty: "easy",
      theme: "dark",
      sound: true,
    };

    this.credits = {
      version: "1.0.1",
      developer: "Manu + Claude",
      year: "2025",
      technologies: ["HTML5", "JavaScript", "Tailwind CSS", "Apache Cordova"],
      description: "A fun word search game for Camille on her 32nd birthday!",
      repository: "https://github.com/manu72/word-search-game",
    };

    this.loadFromStorage();
  }

  loadFromStorage() {
    const savedSettings = localStorage.getItem("wordSearchSettings");
    if (savedSettings) {
      this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
    }
  }

  saveToStorage() {
    localStorage.setItem("wordSearchSettings", JSON.stringify(this.settings));
  }

  getTheme() {
    return this.settings.theme;
  }

  getDifficulty() {
    return this.difficulties[this.settings.difficulty];
  }
}
