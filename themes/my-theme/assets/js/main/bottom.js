document.addEventListener("DOMContentLoaded", function () {
    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const nav = document.querySelector('.bottom-nav');

    // लोड के समय कोई क्लास न लगाएँ
    nav.classList.remove("show");
    nav.classList.add("hide");

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop < lastScrollTop) {
            // ऊपर स्क्रॉल → दिखाओ
            nav.classList.remove("hide");
            nav.classList.add("show");
        } else {
            // नीचे स्क्रॉल या वहीं रुका → छिपाओ
            nav.classList.remove("show");
            nav.classList.add("hide");
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
});
