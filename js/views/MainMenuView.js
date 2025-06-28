export class MainMenuView {
  constructor(app) {
    this.app = app;
    this.container = app.container;
  }

  init() {
    this.render();
    this.addEventListeners();
  }

  render() {
    const theme = this.app.config.getTheme();

    this.container.innerHTML = `
            <div class="flex flex-col items-center justify-center min-h-screen p-3">
                <div class="w-full max-w-md">
                    <h1 class="text-4xl sm:text-5xl font-extrabold text-center mb-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                        CamWord
                    </h1>
                    <p class="text-center text-gray-400 text-sm mb-4">Select a category to start playing</p>
                    
                    <div class="space-y-4">
                        <div class="grid grid-cols-2 gap-2">
                            ${Object.keys(this.app.config.categories)
                              .map(
                                (category) => `
                                <button class="category-btn gradient-border p-2 text-white font-semibold capitalize
                                        transition-all duration-200"
                                        data-category="${category}">
                                    <div class="flex flex-col items-center">
                                        <span class="text-base">${this.getCategoryIcon(
                                          category
                                        )}</span>
                                        <span class="mt-1 text-sm">${category}</span>
                                    </div>
                                </button>
                            `
                              )
                              .join("")}
                        </div>

                        <div class="gradient-border p-3">
                            <h2 class="text-lg font-bold mb-2 text-center">Difficulty</h2>
                            <div class="grid grid-cols-3 gap-2" id="difficultyButtons">
                                ${Object.keys(this.app.config.difficulties)
                                  .map(
                                    (diff) => `
                                    <button class="difficulty-btn ${
                                      this.app.config.settings.difficulty ===
                                      diff
                                        ? "bg-gradient-to-r from-blue-500 to-purple-500"
                                        : "bg-gray-800 hover:bg-gray-700"
                                    } 
                                        p-2 rounded-lg text-white font-semibold capitalize transition-all duration-200"
                                        data-difficulty="${diff}">
                                        ${this.getDifficultyIcon(diff)}
                                        <span class="block mt-1 text-xs">${diff}</span>
                                    </button>
                                `
                                  )
                                  .join("")}
                            </div>
                        </div>

                        <button id="creditsBtn" 
                            class="w-full p-3 rounded-lg font-semibold transition-all duration-200
                            bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600
                            flex items-center justify-center gap-2">
                            <span class="text-base">ℹ️</span>
                            Credits
                        </button>
                    </div>

                    <div class="mt-4 text-center text-xs text-gray-500">
                        Find words by selecting letters in any direction
                    </div>
                </div>
            </div>
        `;
  }

  getCategoryIcon(category) {
    const icons = {
      animals: "🦁",
      countries: "🌎",
      fruits: "🍎",
      sports: "⚽",
    };
    return icons[category] || "📝";
  }

  getDifficultyIcon(difficulty) {
    const icons = {
      easy: "🌟",
      medium: "🌟🌟",
      hard: "🌟🌟🌟",
    };
    return icons[difficulty] || "🌟";
  }

  addEventListeners() {
    const categoryButtons = this.container.querySelectorAll(".category-btn");
    categoryButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const category = btn.dataset.category;
        this.app.showView("game", { category });
      });
    });

    const difficultyButtons =
      this.container.querySelectorAll(".difficulty-btn");
    difficultyButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const difficulty = btn.dataset.difficulty;
        this.app.config.settings.difficulty = difficulty;
        this.app.config.saveToStorage();
        this.render();
        this.addEventListeners();
      });
    });

    const creditsBtn = this.container.querySelector("#creditsBtn");
    if (creditsBtn) {
      creditsBtn.addEventListener("click", () => {
        this.app.showView("credits");
      });
    }
  }

  destroy() {
    this.container.innerHTML = "";
  }
}
