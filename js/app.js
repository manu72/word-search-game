import { Config } from './config/config.js';
import { MainMenuView } from './views/MainMenuView.js';
import { GameView } from './views/GameView.js';
import { CreditsView } from './views/CreditsView.js';
import { AudioManager } from './managers/AudioManager.js';
import { SettingsPopup } from './components/SettingsPopup.js';

export class App {
    constructor() {
        this.container = document.getElementById('app');
        this.currentView = null;
        this.init();
    }

    init() {
        this.config = new Config();
        this.audioManager = new AudioManager(this);
        this.settingsPopup = new SettingsPopup(this);
        
        // Start background music if enabled
        if (this.config.settings.sound && this.config.settings.bgMusic) {
            this.audioManager.playSound('bgMusic');
        }
        
        this.showView('menu');
    }
    
    showView(viewName, params = {}) {
        // Clean up current view
        if (this.currentView) {
            this.currentView.destroy();
        }

        // Create and show new view
        switch (viewName.toLowerCase()) {
            case 'menu':
                this.currentView = new MainMenuView(this);
                break;
            case 'game':
                this.currentView = new GameView(this);
                break;
            case 'credits':
                this.currentView = new CreditsView(this);
                break;
            default:
                console.error('Invalid view name:', viewName);
                return;
        }

        this.currentView.init(params);
    }

    showSettings() {
        this.settingsPopup.open();
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
