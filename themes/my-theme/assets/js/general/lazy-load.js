document.addEventListener("DOMContentLoaded", function() {
    // सभी lazy-load एलिमेंट्स को सेलेक्ट करें (header, main, sidebar, footer, आदि)
    const lazySections = [].slice.call(document.querySelectorAll('.lazy-load-section'));

    // Check करें कि ब्राउज़र Intersection Observer API को सपोर्ट करता है
    if ("IntersectionObserver" in window) {
        let lazySectionObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    // जब कोई element viewport में आता है, तो उसे लोड करें
                    // अगर यह header, main, sidebar, या अन्य lazy-load सेक्शन है
                    entry.target.innerHTML = `<h2>${entry.target.dataset.content} Content</h2><p>This section has now been loaded lazily.</p>`;
                    observer.unobserve(entry.target);  // लोड होने के बाद उसे अनobserve करें
                }
            });
        }, { threshold: 0.5 });  // 50% visibility जरूरी है

        // Lazy loading के लिए सभी sections को observe करना शुरू करें
        lazySections.forEach(function(section) {
            lazySectionObserver.observe(section);
        });
    }
});
