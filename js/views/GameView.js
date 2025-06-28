export class GameView {
  constructor(app) {
    this.app = app;
    this.container = app.container;
    this.reset();
  }

  reset() {
    this.category = "";
    this.difficulty = null;
    this.hints = 3;
    this.tries = 0;
    this.timeLeft = 0;
    this.words = [];
    this.grid = [];
    this.foundWords = new Set();
    this.foundWordPositions = new Map(); // Store positions for found words
    this.selection = {
      start: null,
      current: null,
    };
    this.timer = null;
  }

  init(params) {
    this.reset();
    this.category = params.category;
    this.difficulty =
      this.app.config.difficulties[this.app.config.settings.difficulty];
    this.hints = 3;
    this.timeLeft = this.difficulty.timeLimit;
    this.words = this.generateWords();
    this.grid = this.generateGrid();

    this.render();
    this.addEventListeners();
    if (this.app.config.settings.timeLimit) {
      this.startTimer();
    }
  }

  generateWords() {
    const categoryWords = this.app.config.categories[this.category];
    if (!categoryWords || !Array.isArray(categoryWords)) {
      console.error("Invalid category or no words found:", this.category);
      this.app.showView("menu");
      return [];
    }

    // Shuffle and get random words based on difficulty
    const shuffled = [...categoryWords].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, this.difficulty.wordCount);
  }

  getRandomWords(categoryWords) {
    if (!categoryWords || !Array.isArray(categoryWords)) return [];
    const shuffled = [...categoryWords].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, this.difficulty.wordCount);
  }

  generateGrid() {
    const size = this.difficulty.size;

    // Initialize empty grid
    const grid = Array(size)
      .fill(null)
      .map(() => Array(size).fill(""));

    if (!this.words || this.words.length === 0) {
      console.error("No words to place in grid");
      return grid;
    }

    // Sort words by length (longest first)
    const sortedWords = [...this.words].sort((a, b) => b.length - a.length);

    // Possible directions for word placement
    const directions = [
      [0, 1], // right
      [1, 0], // down
      [1, 1], // diagonal down-right
      [0, -1], // left
      [-1, 0], // up
      [-1, -1], // diagonal up-left
      [1, -1], // diagonal down-left
      [-1, 1], // diagonal up-right
    ];

    // Try to place each word
    for (const word of sortedWords) {
      let placed = false;
      let attempts = 0;
      const maxAttempts = 100; // Prevent infinite loops

      while (!placed && attempts < maxAttempts) {
        attempts++;
        const direction =
          directions[Math.floor(Math.random() * directions.length)];
        const [dx, dy] = direction;

        // Calculate valid starting positions based on direction and word length
        let startX, startY, endX, endY;

        if (dx > 0) {
          startX = 0;
          endX = size - word.length;
        } else if (dx < 0) {
          startX = word.length - 1;
          endX = size - 1;
        } else {
          startX = 0;
          endX = size - 1;
        }

        if (dy > 0) {
          startY = 0;
          endY = size - word.length;
        } else if (dy < 0) {
          startY = word.length - 1;
          endY = size - 1;
        } else {
          startY = 0;
          endY = size - 1;
        }

        // Skip if no valid positions
        if (startX > endX || startY > endY) continue;

        const x = startX + Math.floor(Math.random() * (endX - startX + 1));
        const y = startY + Math.floor(Math.random() * (endY - startY + 1));

        // Check if word fits at this position
        let canPlace = true;
        let positions = [];

        for (let i = 0; i < word.length; i++) {
          const newX = x + dx * i;
          const newY = y + dy * i;

          // Validate position
          if (newX < 0 || newX >= size || newY < 0 || newY >= size) {
            canPlace = false;
            break;
          }

          // Check if cell is empty or has matching letter
          if (grid[newX][newY] !== "" && grid[newX][newY] !== word[i]) {
            canPlace = false;
            break;
          }

          positions.push([newX, newY]);
        }

        if (canPlace) {
          // Place the word
          positions.forEach(([newX, newY], i) => {
            grid[newX][newY] = word[i];
          });
          placed = true;
        }
      }

      if (!placed) {
        console.warn(`Could not place word: ${word}`);
        // Continue with next word instead of returning null
      }
    }

    // Fill empty spaces with random letters
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (grid[i][j] === "") {
          grid[i][j] = letters[Math.floor(Math.random() * letters.length)];
        }
      }
    }

    return grid;
  }

  render() {
    const size = this.difficulty.size;

    this.container.innerHTML = `
            <div class="flex flex-col h-screen">
                <!-- Header -->
                <div class="flex justify-between items-center p-2 bg-gray-800">
                    <button id="backBtn" class="text-white hover:text-gray-300 transition-colors px-2 py-1">
                        ← Back
                    </button>
                    <div class="text-white font-bold text-sm">${
                      this.category
                    }</div>
                    <div class="flex gap-2">
                        <button id="settingsBtn" class="text-white hover:text-gray-300 transition-colors px-2 py-1">
                            ⚙️
                        </button>
                        <button id="hintBtn" class="text-white hover:text-gray-300 transition-colors px-2 py-1">
                            💡 ${this.hints}
                        </button>
                    </div>
                </div>

                <!-- Stats Bar -->
                <div class="flex justify-between items-center py-1 px-3 text-sm font-bold text-white bg-gray-700">
                    <div>Time: <span id="timer">${this.app.config.settings.timeLimit ? 
                        `${Math.floor(this.timeLeft / 60)}:${String(this.timeLeft % 60).padStart(2, "0")}` : 
                        "No Limit"
                    }</span></div>
                    <div>Tries: <span id="tries">${this.tries}</span></div>
                    <div>Found: <span id="foundCount">${this.foundWords.size}/${
      this.words.length
    }</span></div>
                </div>

                <!-- Game Grid -->
                <div class="flex-1 flex items-center justify-center p-2">
                    <div class="grid grid-cols-${size} gap-0.5 w-full max-w-[min(90vw,90vh)] md:max-w-md lg:max-w-lg xl:max-w-xl aspect-square">
                        ${this.grid
                          .map((row, i) =>
                            row
                              .map(
                                (cell, j) => `
                            <div class="cell aspect-square flex items-center justify-center 
                                      text-xs sm:text-sm md:text-base lg:text-lg font-bold text-white bg-gray-800 rounded
                                      cursor-pointer select-none transition-colors
                                      hover:bg-gray-700 active:bg-gray-600"
                                 data-row="${i}" data-col="${j}">
                                ${cell}
                            </div>
                        `
                              )
                              .join("")
                          )
                          .join("")}
                    </div>
                </div>

                <!-- Word List -->
                <div class="word-list grid grid-cols-2 gap-1 p-2 bg-gray-800 max-h-[25vh] overflow-y-auto">
                    ${this.words
                      .map(
                        (word) => `
                        <div class="word-item" data-word="${word}">
                            <div class="${
                              this.foundWords.has(word)
                                ? "bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-400"
                                : "gradient-border"
                            } 
                                p-2 text-center text-sm ${
                                  this.foundWords.has(word)
                                    ? "line-through"
                                    : ""
                                }
                                transition-all duration-300">
                                ${word}
                            </div>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            </div>
        `;
  }

  handleSelectionEnd() {
    if (!this.isSelecting) return;
    this.isSelecting = false;

    const word = this.getSelectedWord();
    if (word.length > 1) {
      this.tries++;

      if (this.words.includes(word) && !this.foundWords.has(word)) {
        this.foundWords.add(word);

        // Update word list UI
        const wordItem = this.container.querySelector(`[data-word="${word}"]`);
        if (wordItem) {
          const div = wordItem.querySelector("div");
          if (div) {
            div.className =
              "bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-400 p-2 text-center text-sm line-through transition-all duration-300";
          }
        }

        // Play success sound
        this.app.audioManager.playSound("wordFound");

        if (this.foundWords.size === this.words.length) {
          this.gameWon();
        }
      } else {
        // Play try sound for invalid words
        this.app.audioManager.playSound("wordTry");
      }

      // Update stats after word check
      const triesElement = document.getElementById("tries");
      if (triesElement) {
        triesElement.textContent = this.tries;
      }

      const foundElement = document.getElementById("foundCount");
      if (foundElement) {
        foundElement.textContent = `${this.foundWords.size}/${this.words.length}`;
      }
    }

    this.selectedCells = [];
    this.highlightCells();
  }

  highlightCells() {
    // Remove only temporary selection highlights, preserve found word highlights
    const cells = this.container.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.classList.remove("bg-blue-600");
    });

    // Re-apply green highlighting for all found words
    this.foundWordPositions.forEach((positions, word) => {
      positions.forEach(([row, col]) => {
        const cell = this.container.querySelector(
          `[data-row="${row}"][data-col="${col}"]`
        );
        if (cell) {
          cell.classList.add("bg-green-600");
        }
      });
    });

    // Apply blue highlighting for current selection (overrides green when selecting)
    if (this.selection.start && this.selection.current) {
      const selectedCells = this.getSelectedCells();
      selectedCells.forEach(([row, col]) => {
        const cell = this.container.querySelector(
          `[data-row="${row}"][data-col="${col}"]`
        );
        if (cell) {
          // Blue selection takes priority over green found highlighting
          cell.classList.remove("bg-green-600");
          cell.classList.add("bg-blue-600");
        }
      });
    }
  }

  getSelectedCells() {
    const cells = [];
    const { start, current } = this.selection;

    if (!start || !current) return cells;

    const dx = Math.sign(current.col - start.col);
    const dy = Math.sign(current.row - start.row);

    // If no direction, just return the start cell
    if (dx === 0 && dy === 0) {
      cells.push([start.row, start.col]);
      return cells;
    }

    // Calculate length based on the longer dimension
    const length =
      Math.max(
        Math.abs(current.col - start.col),
        Math.abs(current.row - start.row)
      ) + 1;

    // Add cells along the line
    for (let i = 0; i < length; i++) {
      const row = start.row + dy * i;
      const col = start.col + dx * i;
      cells.push([row, col]);
    }

    return cells;
  }

  getSelectedWord() {
    const cells = this.getSelectedCells();
    let word = "";
    cells.forEach(([row, col]) => {
      word += this.grid[row][col];
    });
    return word;
  }

  showHint() {
    if (this.hints <= 0) return;

    // Get a random unfound word
    const unfoundWords = this.words.filter(
      (word) => !this.foundWords.has(word)
    );
    if (unfoundWords.length === 0) return;

    const word = unfoundWords[Math.floor(Math.random() * unfoundWords.length)];

    // Find the word in the grid
    const size = this.difficulty.size;
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const directions = [
          [0, 1],
          [1, 0],
          [1, 1],
          [-1, 1],
          [0, -1],
          [-1, 0],
          [-1, -1],
          [1, -1],
        ];

        for (const [dx, dy] of directions) {
          let found = true;
          let cells = [];

          for (let i = 0; i < word.length; i++) {
            const newRow = row + dy * i;
            const newCol = col + dx * i;

            if (
              newRow < 0 ||
              newRow >= size ||
              newCol < 0 ||
              newCol >= size ||
              this.grid[newRow][newCol] !== word[i]
            ) {
              found = false;
              break;
            }

            cells.push([newRow, newCol]);
          }

          if (found) {
            // Highlight the cells temporarily
            cells.forEach(([r, c]) => {
              const cell = this.container.querySelector(
                `[data-row="${r}"][data-col="${c}"]`
              );
              if (cell) {
                cell.classList.add("bg-yellow-500");
                setTimeout(() => {
                  cell.classList.remove("bg-yellow-500");
                }, 1000);
              }
            });

            this.hints--;
            const hintBtn = this.container.querySelector("#hintBtn");
            if (hintBtn) {
              hintBtn.textContent = `💡 ${this.hints}`;
            }
            return;
          }
        }
      }
    }
  }

  startTimer() {
    if (!this.app.config.settings.timeLimit) return;
    
    this.timer = setInterval(() => {
      this.timeLeft--;
      const timerElement = this.container.querySelector("#timer");
      if (timerElement) {
        timerElement.textContent = `${Math.floor(this.timeLeft / 60)}:${String(
          this.timeLeft % 60
        ).padStart(2, "0")}`;
      }
      if (this.timeLeft <= 0) {
        clearInterval(this.timer);
        this.handleTimeout();
      }
    }, 1000);
  }

  destroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.container.innerHTML = "";
    this.reset();
  }

  handleStart(e, cell) {
    if (!cell) return;

    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);

    this.selection.start = { row, col };
    this.selection.current = { row, col };
    this.highlightCells();

    // Play sound effect
    this.app.audioManager.playSound("click");
  }

  handleMove(e) {
    if (!this.selection.start) return;
    e.preventDefault();

    const touch = e.type.includes("touch");
    const clientX = touch ? e.touches[0].clientX : e.clientX;
    const clientY = touch ? e.touches[0].clientY : e.clientY;

    const cell = document.elementFromPoint(clientX, clientY);
    if (!cell?.classList.contains("cell")) return;

    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);

    this.selection.current = { row, col };
    this.highlightCells();
  }

  handleEnd() {
    if (!this.selection.start || !this.selection.current) return;

    const selectedWord = this.getSelectedWord();
    if (selectedWord.length > 1) {
      this.tries++;

      if (
        this.words.includes(selectedWord) &&
        !this.foundWords.has(selectedWord)
      ) {
        this.foundWords.add(selectedWord);

        // Store the positions of found word cells
        const selectedCells = this.getSelectedCells();
        this.foundWordPositions.set(selectedWord, selectedCells);

        // Update word list UI
        const wordItem = this.container.querySelector(
          `[data-word="${selectedWord}"]`
        );
        if (wordItem) {
          const div = wordItem.querySelector("div");
          if (div) {
            div.className =
              "bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-400 p-2 text-center text-sm line-through transition-all duration-300";
          }
        }

        // Play success sound
        this.app.audioManager.playSound("wordFound");

        // Update found counter
        const foundCountElement = document.getElementById("foundCount");
        if (foundCountElement) {
          foundCountElement.textContent = `${this.foundWords.size}/${this.words.length}`;
        }

        if (this.foundWords.size === this.words.length) {
          this.handleWin();
        }
      } else {
        // Play try sound for invalid words
        this.app.audioManager.playSound("wordTry");
      }

      // Update tries counter
      const triesElement = document.getElementById("tries");
      if (triesElement) {
        triesElement.textContent = this.tries;
      }
    }

    // Clear selection
    this.selection.start = null;
    this.selection.current = null;
    this.highlightCells();
  }

  addEventListeners() {
    const backBtn = this.container.querySelector("#backBtn");
    const settingsBtn = this.container.querySelector("#settingsBtn");
    const hintBtn = this.container.querySelector("#hintBtn");

    if (backBtn) {
      backBtn.addEventListener("click", () => {
        clearInterval(this.timer);
        this.destroy();
        this.app.showView("menu");
      });
    }

    if (settingsBtn) {
      settingsBtn.addEventListener("click", () => {
        this.app.showSettings();
      });
    }

    if (hintBtn) {
      hintBtn.addEventListener("click", () => {
        if (this.hints > 0) {
          this.showHint();
        }
      });
    }

    // Cell selection events
    const cells = this.container.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.addEventListener("mousedown", (e) => this.handleStart(e, cell));
      cell.addEventListener("touchstart", (e) => this.handleStart(e, cell));
    });

    document.addEventListener("mousemove", this.handleMove.bind(this));
    document.addEventListener("touchmove", this.handleMove.bind(this), {
      passive: false,
    });
    document.addEventListener("mouseup", this.handleEnd.bind(this));
    document.addEventListener("touchend", this.handleEnd.bind(this));
  }

  handleWin() {
    setTimeout(() => {
      alert("🎉 Congratulations! You found all the words!");
      this.destroy();
      this.app.showView("menu");
    }, 500);
  }

  handleTimeout() {
    setTimeout(() => {
      alert("⏰ Time's up! Try again!");
      this.destroy();
      this.app.showView("menu");
    }, 500);
  }
}
