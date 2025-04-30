document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll('.scroll-fade');
  
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1
      });
  
      elements.forEach(el => observer.observe(el));
    }
  });