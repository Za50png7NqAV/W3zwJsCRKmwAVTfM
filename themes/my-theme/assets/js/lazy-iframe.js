document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const container = entry.target;
        const src = container.dataset.src;
        const title = container.dataset.title || "YouTube video player";

        const iframe = document.createElement("iframe");
        iframe.src = src;
        iframe.width = "100%";
        iframe.height = "315";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        iframe.frameBorder = "0";
        iframe.title = title;

        container.innerHTML = "";
        container.appendChild(iframe);
        observer.unobserve(container);
      }
    });
  });

  document.querySelectorAll(".lazy-iframe").forEach(el => observer.observe(el));
});