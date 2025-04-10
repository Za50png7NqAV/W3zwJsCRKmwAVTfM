document.addEventListener("DOMContentLoaded", function () {
    let lastScrollTop = 0;
    const nav = document.querySelector('.bottom-nav');

    if (window.innerWidth <= 600) {
        nav.classList.add("show");
    }

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // नीचे स्क्रॉल → छिपाओ
            nav.classList.remove("show");
            nav.classList.add("hide");
        } else {
            // ऊपर स्क्रॉल → दिखाओ
            nav.classList.remove("hide");
            nav.classList.add("show");
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
});