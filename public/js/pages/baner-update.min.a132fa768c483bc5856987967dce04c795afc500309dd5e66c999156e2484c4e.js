const modal=document.getElementById("imageModal"),modalImage=document.getElementById("modalImage"),closeModal=document.getElementById("closeModal"),downloadBtn=document.getElementById("downloadBtn"),shareBtn=document.getElementById("shareBtn"),printBtn=document.getElementById("printBtn"),detailBtn=document.getElementById("detailBtn"),categoryContainer=document.getElementById("categoryContainer"),searchInput=document.getElementById("searchInput");let currentImage={};function getExtensionFromMime(e){return e.includes("png")?"png":e.includes("jpeg")?"jpg":e.includes("webp")?"webp":e.includes("gif")?"gif":"png"}function renderGallery(e){categoryContainer.innerHTML="";const t=[...new Set(e.map(e=>e.category))];t.forEach(t=>{const o=t.replace(/\s+/g,"-"),n=document.createElement("div");n.className="category",n.innerHTML=`
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
        `;const n=t.querySelector("img");n.onload=()=>{t.classList.add("loaded"),s.prepend(t)},n.onerror=()=>{t.querySelector(".loader").innerText="❌"},t.onclick=()=>openModal(e),s.appendChild(t)})})}function openModal(e){modal.style.display="flex",modalImage.src=e.src,currentImage=e}closeModal.onclick=()=>{modal.style.opacity="0",setTimeout(()=>{modal.style.display="none",modal.style.opacity="1"},200)},window.onclick=e=>{e.target===modal&&closeModal.onclick()};async function downloadImage(e,t){try{const o=await fetch(e),s=await o.blob(),i=getExtensionFromMime(s.type),a=URL.createObjectURL(s),n=document.createElement("a");n.href=a,n.download=t+"."+i,document.body.appendChild(n),n.click(),n.remove()}catch{const n=document.createElement("a");n.href=e,n.download=t,document.body.appendChild(n),n.click(),n.remove()}}downloadBtn.onclick=async()=>{if(!currentImage.src)return;const e=downloadBtn.innerText;downloadBtn.innerHTML="⏳ Downloading...",downloadBtn.disabled=!0;try{await downloadImage(currentImage.src,currentImage.title)}catch(e){console.log("Download error:",e)}setTimeout(()=>{downloadBtn.innerText=e,downloadBtn.disabled=!1},1200)},shareBtn.onclick=async()=>{if(!currentImage.src)return;const e=shareBtn.innerText;shareBtn.innerHTML="⏳ Sharing...",shareBtn.disabled=!0;try{let e=!1;try{const s=await fetch(currentImage.src),t=await s.blob(),o=getExtensionFromMime(t.type),n=new File([t],currentImage.title+"."+o,{type:t.type});navigator.canShare&&navigator.canShare({files:[n]})&&(await navigator.share({title:currentImage.title,files:[n]}),e=!0)}catch(e){console.log("Blob share failed:",e)}e||(navigator.share?await navigator.share({title:currentImage.title,url:currentImage.src}):alert("शेयर सपोर्ट नहीं है"))}catch(e){console.log("Share error:",e)}shareBtn.innerText=e,shareBtn.disabled=!1},printBtn.onclick=()=>{const e=window.open("","_blank");e.document.write(`
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
        <img src="${currentImage.src}" />
      </body>
    </html>
  `),e.document.close()},detailBtn.onclick=()=>{currentImage.link?window.open(currentImage.link,"_blank"):alert("कोई डिटेल लिंक उपलब्ध नहीं है।")};let timeout;searchInput.addEventListener("input",()=>{clearTimeout(timeout),timeout=setTimeout(()=>{const e=searchInput.value.toLowerCase(),t=images.filter(t=>t.title.toLowerCase().includes(e)||t.category.toLowerCase().includes(e));renderGallery(t)},300)}),renderGallery(images)