const modal=document.getElementById("imageModal"),modalImage=document.getElementById("modalImage"),closeModal=document.getElementById("closeModal"),downloadBtn=document.getElementById("downloadBtn"),shareBtn=document.getElementById("shareBtn"),printBtn=document.getElementById("printBtn"),detailBtn=document.getElementById("detailBtn"),categoryContainer=document.getElementById("categoryContainer"),searchInput=document.getElementById("searchInput");let currentImage={};function getFileExtension(e){return e.split(".").pop().split("?")[0]}function getExtensionFromMime(e){return e.includes("png")?"png":e.includes("jpeg")?"jpg":e.includes("webp")?"webp":e.includes("gif")?"gif":"png"}function renderGallery(e){categoryContainer.innerHTML="";const t=[...new Set(e.map(e=>e.category))];t.forEach(t=>{const o=t.replace(/\s+/g,"-"),n=document.createElement("div");n.className="category",n.innerHTML=`
      <h2>${t}</h2>
      <div class="gallery" id="cat-${o}"></div>
    `,categoryContainer.appendChild(n);const s=n.querySelector(".gallery");e.filter(e=>e.category===t).forEach(e=>{const t=document.createElement("div");t.className="gallery-item",t.innerHTML=`
          <div class="loader"></div>
          <img 
            src="${e.src}" 
            alt="${e.title}"
            loading="lazy"
          >
          <div class="icon">${e.icon||""}</div>
          <div class="image-title">${e.title}</div>
        `;const n=t.querySelector("img");n.onload=()=>{t.classList.add("loaded"),s.prepend(t)},n.onerror=()=>{t.querySelector(".loader").innerText="❌"},t.onclick=()=>openModal(e),s.appendChild(t)})})}function openModal(e){modal.style.display="flex",modalImage.src=e.src,currentImage=e}closeModal.onclick=()=>{modal.style.opacity="0",setTimeout(()=>{modal.style.display="none",modal.style.opacity="1"},200)},window.onclick=e=>{e.target===modal&&closeModal.onclick()};function downloadImage(e,t){return fetch(e).then(e=>e.blob()).then(e=>{const s=getExtensionFromMime(e.type),o=URL.createObjectURL(e),n=document.createElement("a");n.href=o,n.download=t+"."+s,document.body.appendChild(n),n.click(),n.remove()})}downloadBtn.onclick=()=>downloadImage(currentImage.src,currentImage.title),shareBtn.onclick=async()=>{try{const n=await fetch(currentImage.src),e=await n.blob(),s=getExtensionFromMime(e.type),t=new File([e],currentImage.title+"."+s,{type:e.type});navigator.canShare&&navigator.canShare({files:[t]})?await navigator.share({title:currentImage.title,files:[t]}):(downloadImage(currentImage.src,currentImage.title),alert("शेयर सपोर्ट नहीं है, इमेज डाउनलोड कर दी गई है।"))}catch(e){console.log("शेयर करने में त्रुटि:",e)}},printBtn.onclick=()=>{const e=window.open("","_blank");e.document.write(`
    <html>
      <head>
        <title>${currentImage.title}</title>
        <style>
          body { margin: 0; text-align: center; }
          img { 
            max-width: 100%; 
            max-height: 100vh;
            margin: 0 auto;
            display: block;
          }
        </style>
      </head>
      <body onload="window.print(); window.close();">
        <img src="${currentImage.src}" alt="${currentImage.title}" />
      </body>
    </html>
  `),e.document.close()},detailBtn.onclick=()=>{currentImage.link?window.open(currentImage.link,"_blank"):alert("कोई डिटेल लिंक उपलब्ध नहीं है।")};let timeout;searchInput.addEventListener("input",()=>{clearTimeout(timeout),timeout=setTimeout(()=>{const e=searchInput.value.toLowerCase(),t=images.filter(t=>t.title.toLowerCase().includes(e)||t.category.toLowerCase().includes(e));renderGallery(t)},300)}),renderGallery(images)