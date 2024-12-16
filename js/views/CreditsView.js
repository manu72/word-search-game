export class CreditsView {
    constructor(app) {
        this.app = app;
        this.container = app.container;
    }

    init() {
        this.render();
        this.addEventListeners();
    }

    render() {
        const credits = this.app.config.credits;
        
        this.container.innerHTML = `
            <div class="flex flex-col items-center justify-center min-h-screen p-3 bg-gray-900">
                <div class="w-full max-w-md">
                    <!-- Back Button -->
                    <button id="backBtn" class="mb-4 text-white hover:text-gray-300 transition-colors">
                        ← Back to Menu
                    </button>

                    <!-- Title -->
                    <h1 class="text-4xl font-extrabold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                        Credits
                    </h1>

                    <!-- Credits Content -->
                    <div class="space-y-4">
                        <!-- Version -->
                        <div class="gradient-border p-3">
                            <h2 class="text-lg font-bold text-white mb-2">Version</h2>
                            <p class="text-gray-300">${credits.version}</p>
                        </div>

                        <!-- Developer -->
                        <div class="gradient-border p-3">
                            <h2 class="text-lg font-bold text-white mb-2">Developer</h2>
                            <p class="text-gray-300">${credits.developer} © ${credits.year}</p>
                        </div>

                        <!-- Technologies -->
                        <div class="gradient-border p-3">
                            <h2 class="text-lg font-bold text-white mb-2">Technologies</h2>
                            <div class="grid grid-cols-2 gap-2">
                                ${credits.technologies.map(tech => `
                                    <div class="bg-gray-800 p-2 rounded text-center text-gray-300">
                                        ${tech}
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Description -->
                        <div class="gradient-border p-3">
                            <h2 class="text-lg font-bold text-white mb-2">About</h2>
                            <p class="text-gray-300">${credits.description}</p>
                        </div>

                        <!-- Repository -->
                        <div class="gradient-border p-3">
                            <h2 class="text-lg font-bold text-white mb-2">Repository</h2>
                            <a href="${credits.repository}" 
                               class="text-blue-400 hover:text-blue-300 transition-colors break-all">
                                ${credits.repository}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    addEventListeners() {
        const backBtn = this.container.querySelector('#backBtn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                this.app.showView('menu');
            });
        }
    }

    destroy() {
        this.container.innerHTML = '';
    }
}
