document.addEventListener("DOMContentLoaded", function() {
    // सभी lazy-load-ad क्लास वाले एलिमेंट्स को सेलेक्ट करें
    const lazyAds = [].slice.call(document.querySelectorAll('.lazy-load-ad'));

    // Check करें कि ब्राउज़र Intersection Observer API को सपोर्ट करता है या नहीं
    if ("IntersectionObserver" in window) {
        let lazyAdObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    // जब विज्ञापन व्यूपोर्ट में आता है, तो उसे लोड करें
                    entry.target.innerHTML = '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4855323063398382" crossorigin="anonymous"></script><ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-4855323063398382" data-ad-slot="5787799671" data-ad-format="auto"></ins>';
                    // एक बार लोड होने के बाद, observer को हटा दें
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });  // 50% एलिमेंट व्यूपोर्ट में होना चाहिए

        // Lazy loading के लिए ads को observe करना शुरू करें
        lazyAds.forEach(function(ad) {
            lazyAdObserver.observe(ad);
        });
    }
});
