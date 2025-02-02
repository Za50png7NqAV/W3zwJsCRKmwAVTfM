document.addEventListener("DOMContentLoaded", function () {
    const linkContainer = document.querySelector(".link-container");
    const links = document.querySelectorAll(".link-update");

    const linkCountDisplay = document.createElement("div");
    linkCountDisplay.className = "link-count";
    linkContainer.insertBefore(linkCountDisplay, linkContainer.firstChild);

    const noUpdatesMessage = document.createElement("div");
    noUpdatesMessage.className = "no-updates hidden";
    noUpdatesMessage.textContent = "No more new update links available.";
    linkContainer.appendChild(noUpdatesMessage);

    let remainingLinks = 0;

    function updateCount() {
        remainingLinks = Array.from(links).filter(container => !container.classList.contains("hidden")).length;
        linkCountDisplay.textContent = `Updates Left: ${remainingLinks}`;
        if (remainingLinks === 0) {
            noUpdatesMessage.classList.remove("hidden");
        } else {
            noUpdatesMessage.classList.add("hidden");
        }
    }

    links.forEach(container => {
        const link = container.querySelector("a");
        if (localStorage.getItem(link.href)) {
            container.classList.add("hidden");
        }

        link.addEventListener("click", function () {
            localStorage.setItem(link.href, true);
            container.classList.add("hidden");
            updateCount();
        });
    });

    updateCount();
});