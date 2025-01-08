
// Disable specific key combinations and right-click context menu
document.addEventListener('keydown', function (e) {
    // Block F12 (DevTools)
    if (e.key === "F12") {
        e.preventDefault();
        alert("F12 (DevTools) is disabled.");
    }

    // Block Ctrl+Shift+I (Inspect)
    if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i")) {
        e.preventDefault();
        alert("Ctrl+Shift+I (Inspect) is disabled.");
    }

    // Block Ctrl+U (View Source)
    if (e.ctrlKey && (e.key === "U" || e.key === "u")) {
        e.preventDefault();
        alert("Ctrl+U (View Source) is disabled.");
    }

    // Block Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && (e.key === "J" || e.key === "j")) {
        e.preventDefault();
        alert("Ctrl+Shift+J (Console) is disabled.");
    }

    // Block Ctrl+S (Save As)
    if (e.ctrlKey && (e.key === "S" || e.key === "s")) {
        e.preventDefault();
        alert("Ctrl+S (Save As) is disabled.");
    }

    // Block Ctrl+Shift+S (Save As with Options)
    if (e.ctrlKey && e.shiftKey && (e.key === "S" || e.key === "s")) {
        e.preventDefault();
        alert("Ctrl+Shift+S (Save As with Options) is disabled.");
    }
});

// Disable right-click context menu
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    alert("This is disabled.");
});
