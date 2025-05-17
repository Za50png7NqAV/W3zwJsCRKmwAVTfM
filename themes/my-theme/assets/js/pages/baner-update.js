

  const modal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const closeModal = document.getElementById("closeModal");
  const downloadBtn = document.getElementById("downloadBtn");
  const shareBtn = document.getElementById("shareBtn");
  const printBtn = document.getElementById("printBtn");
  const categoryContainer = document.getElementById("categoryContainer");
  const searchInput = document.getElementById("searchInput");

  let currentImage = {};

  function renderGallery(filteredImages) {
    categoryContainer.innerHTML = '';

    const categories = [...new Set(filteredImages.map(img => img.category))];
    categories.forEach(cat => {
      const catDiv = document.createElement('div');
      catDiv.className = "category";
      catDiv.innerHTML = `<h2>${cat}</h2><div class="gallery" id="cat-${cat}"></div>`;
      categoryContainer.appendChild(catDiv);

      const container = catDiv.querySelector('.gallery');

      filteredImages
        .filter(img => img.category === cat)
        .forEach(img => {
          const item = document.createElement('div');
          item.className = "gallery-item";
          item.innerHTML = `
            <img loading="lazy" src="${img.src}" alt="${img.title}">
             <div class="icon">${img.icon}</div>
            <div class="image-title">${img.title}</div>`;
          item.onclick = () => openModal(img);
          container.appendChild(item);
        });
    });
  }

  function openModal(img) {
    modal.style.display = "flex";
    modalImage.src = img.src;
    currentImage = img;
  }

  closeModal.onclick = () => (modal.style.display = "none");
  window.onclick = e => {
    if (e.target === modal) modal.style.display = "none";
  };

  downloadBtn.onclick = () => downloadImage(currentImage.src, currentImage.title);

  shareBtn.onclick = async () => {
    try {
      const response = await fetch(currentImage.src);
      const blob = await response.blob();
      const file = new File([blob], currentImage.title + ".gif", { type: blob.type });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: currentImage.title,
          files: [file],
        });
      } else {
        alert("यह ब्राउज़र इस फ़ाइल को शेयर नहीं कर सकता।");
      }
    } catch (err) {
      console.log("शेयर करने में त्रुटि:", err);
    }
  };

printBtn.onclick = () => {
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <html>
      <head>
        <title>${currentImage.title}</title>
        <style>
          body { margin: 0; text-align: center; }
          img { max-width: 100%; max-height: 100vh; }
        </style>
      </head>
      <body onload="window.print(); window.close();">
        <img src="${currentImage.src}" alt="${currentImage.title}" />
      </body>
    </html>
  `);
  printWindow.document.close();
};

  function downloadImage(src, title) {
    return fetch(src)
      .then(res => res.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = title + ".gif";
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
  }

  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.toLowerCase();
    const filtered = images.filter(
      img =>
        img.title.toLowerCase().includes(keyword) ||
        img.category.toLowerCase().includes(keyword)
    );
    renderGallery(filtered);
  });


    // Initial Render
  renderGallery(images);
  detailBtn.onclick = () => {
  if (currentImage.link) {
    window.open(currentImage.link, "_blank");
  } else {
    alert("कोई डिटेल लिंक उपलब्ध नहीं है।");
  }
};