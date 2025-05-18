const modal=document.getElementById("imageModal"),modalImage=document.getElementById("modalImage"),closeModal=document.getElementById("closeModal"),downloadBtn=document.getElementById("downloadBtn"),shareBtn=document.getElementById("shareBtn"),printBtn=document.getElementById("printBtn"),categoryContainer=document.getElementById("categoryContainer"),searchInput=document.getElementById("searchInput");let currentImage={};function renderGallery(e){categoryContainer.innerHTML="";const t=[...new Set(e.map(e=>e.category))];t.forEach(t=>{const n=document.createElement("div");n.className="category",n.innerHTML=`<h2>${t}</h2><div class="gallery" id="cat-${t}"></div>`,categoryContainer.appendChild(n);const s=n.querySelector(".gallery");e.filter(e=>e.category===t).forEach(e=>{const t=document.createElement("div");t.className="gallery-item",t.innerHTML=`
            <img loading="lazy" src="${e.src}" alt="${e.title}">
             <div class="icon">${e.icon}</div>
            <div class="image-title">${e.title}</div>`,t.onclick=()=>openModal(e),s.appendChild(t)})})}function openModal(e){modal.style.display="flex",modalImage.src=e.src,currentImage=e}closeModal.onclick=()=>modal.style.display="none",window.onclick=e=>{e.target===modal&&(modal.style.display="none")},downloadBtn.onclick=()=>downloadImage(currentImage.src,currentImage.title),shareBtn.onclick=async()=>{try{const n=await fetch(currentImage.src),e=await n.blob(),t=new File([e],currentImage.title+".gif",{type:e.type});navigator.canShare&&navigator.canShare({files:[t]})?await navigator.share({title:currentImage.title,files:[t]}):alert("यह ब्राउज़र इस फ़ाइल को शेयर नहीं कर सकता।")}catch(e){console.log("शेयर करने में त्रुटि:",e)}},printBtn.onclick=()=>{const e=window.open("","_blank");e.document.write(`
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
  `),e.document.close()};function downloadImage(e,t){return fetch(e).then(e=>e.blob()).then(e=>{const s=URL.createObjectURL(e),n=document.createElement("a");n.href=s,n.download=t+".gif",document.body.appendChild(n),n.click(),n.remove()})}searchInput.addEventListener("input",()=>{const e=searchInput.value.toLowerCase(),t=images.filter(t=>t.title.toLowerCase().includes(e)||t.category.toLowerCase().includes(e));renderGallery(t)}),renderGallery(images),detailBtn.onclick=()=>{currentImage.link?window.open(currentImage.link,"_blank"):alert("कोई डिटेल लिंक उपलब्ध नहीं है।")}