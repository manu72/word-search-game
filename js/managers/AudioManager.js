export class AudioManager {
    constructor(app) {
        this.app = app;
        this.sounds = {};
        this.soundStates = {
            wasEffectsEnabled: false
        };
        this.initializeSounds();
        this.setupFocusHandlers();
    }

    initializeSounds() {
        // Sound Effects
        this.sounds.wordFound = new Audio('assets/sounds/word-found.mp3');
        this.sounds.wordTry = new Audio('assets/sounds/word-try.mp3');
        this.sounds.click = new Audio('assets/sounds/click.mp3');
        this.sounds.win = new Audio('assets/sounds/win.mp3');
    }

    setupFocusHandlers() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.handleFocusLost();
            } else {
                this.handleFocusGained();
            }
        });

        window.addEventListener('blur', () => this.handleFocusLost());
        window.addEventListener('focus', () => this.handleFocusGained());
    }

    handleFocusLost() {
        // Store current states
        this.soundStates.wasEffectsEnabled = this.app.config.settings.soundEffects;

        // Pause all sounds
        Object.values(this.sounds).forEach(sound => {
            if (sound && !sound.paused) {
                sound.pause();
            }
        });
    }

    handleFocusGained() {
        // Only resume if sound is enabled in settings
        if (!this.app.config.settings.sound) return;

        // Restore sound effects state
        this.app.config.settings.soundEffects = this.soundStates.wasEffectsEnabled;
    }

    playSound(soundName) {
        // Check if sound should be played based on settings
        if (!this.app.config.settings.sound) return;
        
        const sound = this.sounds[soundName];
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(e => console.log('Audio playback failed:', e));
        }
    }

    stopSound(soundName) {
        const sound = this.sounds[soundName];
        if (sound) {
            sound.pause();
            sound.currentTime = 0;
        }
    }

    updateVolume(volume) {
        Object.values(this.sounds).forEach(sound => {
            sound.volume = volume;
        });
    }
}
