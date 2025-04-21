let lastScrollTop = 0;
const nav = document.querySelector(".bottom-nav");

window.addEventListener("scroll", function () {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (window.innerWidth <= 600) {
    if (currentScroll < lastScrollTop) {
      // Scrolling up
      nav.classList.add("show");
    } else {
      // Scrolling down
      nav.classList.remove("show");
    }
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});