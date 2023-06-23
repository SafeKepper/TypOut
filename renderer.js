document.getElementById('editor').addEventListener('input', updateWordCount);

function handleMenu(action) {
    const editor = document.getElementById('editor');
    const fileInput = document.getElementById('fileInput');

    switch (action) {
        case 'new':
            editor.value = '';
            break;

        case 'open':
            fileInput.click();
            break;

        case 'save':
            const content = editor.value;
            const blob = new Blob([content], { type: 'text/plain' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'untitled.txt';
            a.click();
            break;
        case 'minimize':
            window.electron.send('minimize-window');
            break;
        case 'fullscreen':
            window.electron.send('toggle-fullscreen');
            break;

        case 'close':
            // @ts-ignore
            window.electron.send('close-window');
            break;
    }
}

function openFile(event) {
    const input = event.target;
    const reader = new FileReader();

    reader.onload = function () {
        const text = reader.result;
        document.getElementById('editor').value = text;
    };

    reader.readAsText(input.files[0]);
}

function updateWordCount() {
    const text = document.getElementById('editor').value;
    const words = text.split(/\s+/).filter(Boolean).length;
    document.getElementById('word-count').textContent = `Words: ${words}`;
}


// WPM calculator

// renderer.js

let startTime = null;
let typingTimer = null;

document.getElementById('editor').addEventListener('input', () => {
    updateWordCount();
    calculateTypingSpeed();
});

function updateWordCount() {
    const text = document.getElementById('editor').value;
    const words = text.split(/\s+/).filter(Boolean).length;
    document.getElementById('word-count').textContent = `Words: ${words}`;
}

function calculateTypingSpeed() {
    if (startTime === null) {
        // User started typing
        startTime = new Date();
    }
    
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
        // Reset after user stops typing for 2 seconds
        startTime = null;
        document.getElementById('typing-speed').textContent = `Speed: 0 WPM`;
    }, 2000);

    const currentTime = new Date();
    const timeDiff = (currentTime - startTime) / 1000; // time difference in seconds

    const text = document.getElementById('editor').value;
    const characters = text.length;

    const words = characters / 5; // assuming 5 characters per word
    const wpm = (words / timeDiff) * 60; // words per minute
    
    document.getElementById('typing-speed').textContent = `Speed: ${Math.round(wpm)} WPM`;
}


