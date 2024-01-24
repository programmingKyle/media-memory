const minimizeButton_el = document.getElementById('minimizeButton');
const maximizeButton_el = document.getElementById('maximizeButton');
const exitButton_el = document.getElementById('exitButton');

let isMaximized;

minimizeButton_el.addEventListener('click', () => {
    api.frameHandler({request: 'Minimize'});
});

maximizeButton_el.addEventListener('click', () => {
    api.frameHandler({request: 'Maximize'});
});

exitButton_el.addEventListener('click', () => {
    api.frameHandler({request: 'Exit'});
});