flatpickr("#fromDate", { dateFormat: "d/m/Y" });
flatpickr("#toDate", { dateFormat: "d/m/Y" });

let activeTag = '';

function parseDMY(str) {
  const [d, m, y] = str.split("/").map(Number);
  return new Date(y, m - 1, d);
}

function isSameDate(d1, d2) {
  return d1.getDate() === d2.getDate() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getFullYear() === d2.getFullYear();
}

function filterTable(autoReset = false) {
  if (autoReset) clearTag();

  const search = document.getElementById("searchInput").value.toLowerCase();
  const fromDateStr = document.getElementById("fromDate").value;
  const toDateStr = document.getElementById("toDate").value;
  const status = document.getElementById("statusFilter")?.value || "all";  // dropdown
  const rows = document.querySelectorAll("#postTable tbody tr");

  let today = new Date();
  today.setHours(0,0,0,0);

  rows.forEach(row => {
    const title = row.cells[0].textContent.toLowerCase();
    const category = row.cells[0].querySelector("span")?.textContent.toLowerCase() || '';
    const dateStr = row.cells[1].textContent.trim();
    const rowDate = parseDMY(dateStr);
    let show = true;

    // --- 1. Search Filter
    if (search && !(title.includes(search) || category.includes(search))) show = false;

    // --- 2. Date Range Filter
    if (fromDateStr && rowDate < parseDMY(fromDateStr)) show = false;
    if (toDateStr && rowDate > parseDMY(toDateStr)) show = false;

    // --- 3. Quick Tag Filter
    if (show && activeTag) {
      switch (activeTag) {
        case "today": show = isSameDate(rowDate, today); break;
        case "yesterday":
          const yest = new Date(today); yest.setDate(today.getDate() - 1);
          show = isSameDate(rowDate, yest); break;
        case "tomorrow":
          const tomo = new Date(today); tomo.setDate(today.getDate() + 1);
          show = isSameDate(rowDate, tomo); break;
        case "thisWeek":
          const start = new Date(today); start.setDate(today.getDate() - today.getDay());
          const end = new Date(start); end.setDate(start.getDate() + 6);
          show = rowDate >= start && rowDate <= end; break;
        case "lastWeek":
          const lastStart = new Date(today);
          lastStart.setDate(today.getDate() - today.getDay() - 7);
          const lastEnd = new Date(lastStart);
          lastEnd.setDate(lastStart.getDate() + 6);
          show = rowDate >= lastStart && rowDate <= lastEnd;
          break;
        case "thisMonth":
          show = rowDate.getMonth() === today.getMonth() && rowDate.getFullYear() === today.getFullYear(); break;
        case "nextMonth":
          const nextM = (today.getMonth() + 1) % 12;
          const year = today.getMonth() === 11 ? today.getFullYear() + 1 : today.getFullYear();
          show = rowDate.getMonth() === nextM && rowDate.getFullYear() === year; break;
      }
    }

    // --- 4. Status Filter (Active / Closed)
    if (show && status === "active") {
      show = (rowDate >= today);
    } else if (show && status === "closed") {
      show = (rowDate < today);
    }

    // --- Apply Display + Row Class
    if (show) {
      row.style.display = "";
      row.classList.remove("past", "today", "future");
      if (isSameDate(rowDate, today)) row.classList.add("today");
      else if (rowDate < today) row.classList.add("past");
      else row.classList.add("future");
    } else {
      row.style.display = "none";
    }
  });

  showActiveTag(); // header text update
}

function filterByTag(tag) {
  document.getElementById("searchInput").value = '';
  document.getElementById("fromDate").value = '';
  document.getElementById("toDate").value = '';
  activeTag = tag;
  filterTable(false);

  // Highlight active button
  document.querySelectorAll(".quick-tags button").forEach(btn => btn.classList.remove("active"));
  [...document.querySelectorAll(".quick-tags button")]
    .find(btn => btn.textContent.replace(/\s/g,'').toLowerCase() === tag.toLowerCase())
    ?.classList.add("active");
}

function resetFilters() {
  // सारे inputs clear करें
  document.getElementById("searchInput").value = '';
  document.getElementById("fromDate").value = '';
  document.getElementById("toDate").value = '';
  document.getElementById("statusFilter").value = 'all';

  // ActiveTag reset
  activeTag = '';

  // Quick Tag buttons से active class हटाएँ
  document.querySelectorAll(".quick-tags button").forEach(btn => btn.classList.remove("active"));

  // Table refresh करें
  filterTable(false);
}
function clearTag() {
  activeTag = '';
}

function showActiveTag() {
  const tagLabel = {
    today: 'Today',
    yesterday: 'Yesterday',
    tomorrow: 'Tomorrow',
    thisWeek: 'This Week',
    lastWeek: 'Last Week',
    thisMonth: 'This Month',
    nextMonth: 'Next Month'
  };

  const status = document.getElementById("statusFilter")?.value || "all";
  let statusText = "";
  if (status === "active") statusText = "Active";
  else if (status === "closed") statusText = "Closed";

  let tagText = activeTag ? tagLabel[activeTag] : "";

  // Combine Status + Tag in header
  document.getElementById("selectedTag").textContent = 
    (statusText || tagText) ? `${statusText} ${tagText}`.trim() : "";
}

function shareOnWhatsApp() {
  const rows = document.querySelectorAll("#postTable tbody tr");
  const visibleRows = Array.from(rows).filter(r => r.style.display !== "none");
  const maxRows = visibleRows.slice(0, 20);

  if (maxRows.length === 0) {
    alert("No posts to share.");
    return;
  }

  const tagLabel = {
    today: 'Today',
    yesterday: 'Yesterday',
    tomorrow: 'Tomorrow',
    thisWeek: 'This Week',
    lastWeek: 'Last Week',
    thisMonth: 'This Month',
    nextMonth: 'Next Month'
  };

  const status = document.getElementById("statusFilter")?.value || "all";
  let heading = "> 🔔Alert: Last Date";

  if (status !== "all") heading += ` ${status}`;
  if (activeTag && tagLabel[activeTag]) heading += ` ${tagLabel[activeTag]}`;

  let message = heading + "\n_____________________________________\n";

  maxRows.forEach(row => {
    const aTag = row.cells[0].querySelector("a");
    const title = aTag ? aTag.textContent.trim() : row.cells[0].textContent.trim();
    const permalink = aTag ? aTag.getAttribute("href").trim() : "";
    
    const shorturl = row.dataset.shorturl?.trim() || "";
    const seoTitle = row.dataset.seoTitle?.trim() || title;
    const date = row.cells[1].textContent.trim();

    const finalLink = shorturl ? `https://yojnaportal.com/${shorturl}` : permalink;

    message += `🎯 *${seoTitle}* \n📅 _Last Date: ${date}_\n🔗 ${finalLink}\n_____________________________________\n`;
  });

  const encodedMessage = encodeURIComponent(message.trim());
  const shareLink = `https://wa.me/?text=${encodedMessage}`;
  window.open(shareLink, "_blank");
}
function updateStatusColor() {
  const select = document.getElementById("statusFilter");
  select.className = ""; // पुरानी class हटाओ
  select.classList.add(select.value); // value को ही class बना दो (all, active, closed)
}

// पहली बार load होने पर भी color set करो
updateStatusColor();
document.getElementById("statusFilter").addEventListener("change", function() {
  updateStatusColor();
  filterTable(false);
});
