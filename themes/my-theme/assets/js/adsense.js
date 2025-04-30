document.addEventListener("DOMContentLoaded", function () {
    const lazyAds = document.querySelectorAll('.lazy-load-ad');

    if ("IntersectionObserver" in window) {
        let observer = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    const adContainer = entry.target;

                    // Script टैग बनाएँ
                    const script = document.createElement('script');
                    script.async = true;
                    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4855323063398382';
                    script.crossOrigin = 'anonymous';

                    // AdSense <ins> tag बनाएँ
                    const ins = document.createElement('ins');
                    ins.className = 'adsbygoogle';
                    ins.style.display = 'block';
                    ins.setAttribute('data-ad-client', 'ca-pub-4855323063398382');
                    ins.setAttribute('data-ad-slot', '5787799671');
                    ins.setAttribute('data-ad-format', 'auto');
                    ins.setAttribute('data-full-width-responsive', 'true');

                    // Append करें
                    adContainer.innerHTML = '';
                    adContainer.appendChild(script);
                    adContainer.appendChild(ins);

                    script.onload = function () {
                        (adsbygoogle = window.adsbygoogle || []).push({});
                    };

                    obs.unobserve(adContainer);
                }
            });
        }, {
            threshold: 0,
            rootMargin: '10% 0px'  // 🔍 टॉप से 10% पहले trigger होगा
        });

        lazyAds.forEach(function (ad) {
            observer.observe(ad);
        });
    }
});

