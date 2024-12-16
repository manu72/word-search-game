import { App } from './app.js';

document.addEventListener('deviceready', () => {
    const app = new App();
    app.init();
}, false);

// For browser testing
if (!window.cordova) {
    document.addEventListener('DOMContentLoaded', () => {
        const app = new App();
        app.init();
    });
}
