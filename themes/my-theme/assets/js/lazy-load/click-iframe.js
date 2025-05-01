document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".click-iframe").forEach(container => {
      container.addEventListener("click", () => {
        const src = container.dataset.src;
        const title = container.dataset.title || "Iframe";

        const iframe = document.createElement("iframe");
        iframe.src = src;
        iframe.width = "100%";
        iframe.height = "750";
        iframe.style.border = "none";
        iframe.loading = "lazy";
        iframe.title = title;

        container.innerHTML = "";
        container.appendChild(iframe);
      });
    });
  });