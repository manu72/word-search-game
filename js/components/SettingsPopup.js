export class SettingsPopup {
    constructor(app) {
        this.app = app;
        this.isOpen = false;
        this.element = null;
    }

    open() {
        if (this.isOpen) return;
        
        this.isOpen = true;
        this.render();
        this.addEventListeners();
    }

    close() {
        if (!this.isOpen) return;
        
        this.isOpen = false;
        if (this.element) {
            this.element.remove();
            this.element = null;
        }
    }

    render() {
        const settings = this.app.config.settings;
        
        this.element = document.createElement('div');
        this.element.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
        this.element.innerHTML = `
            <div class="bg-gray-800 rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-xl font-bold text-white">Settings</h2>
                    <button id="closeSettings" class="text-gray-400 hover:text-white">
                        ✕
                    </button>
                </div>
                
                <div class="space-y-4">
                    <!-- Sound Settings -->
                    <div class="space-y-2">
                        <label class="flex items-center justify-between text-white">
                            Sound Effects
                            <div class="relative inline-block w-12 h-6">
                                <input type="checkbox" id="masterSound" 
                                    class="peer sr-only" ${settings.sound ? 'checked' : ''}>
                                <div class="absolute inset-0 bg-gray-600 rounded-full transition peer-checked:bg-green-500"></div>
                                <div class="absolute inset-y-1 start-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:start-7"></div>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(this.element);
    }

    addEventListeners() {
        if (!this.element) return;

        // Close button
        const closeBtn = this.element.querySelector('#closeSettings');
        closeBtn?.addEventListener('click', () => this.close());

        // Click outside to close
        this.element.addEventListener('click', (e) => {
            if (e.target === this.element) {
                this.close();
            }
        });

        // Sound toggle
        const masterSound = this.element.querySelector('#masterSound');
        masterSound?.addEventListener('change', (e) => {
            this.app.config.settings.sound = e.target.checked;
            this.app.config.saveToStorage();
            
            // Stop all sounds if sound is off
            if (!e.target.checked) {
                Object.keys(this.app.audioManager.sounds).forEach(sound => {
                    this.app.audioManager.stopSound(sound);
                });
            }
        });
    }
}
