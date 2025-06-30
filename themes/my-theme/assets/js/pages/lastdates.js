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
    const rows = document.querySelectorAll("#postTable tbody tr");

    let today = new Date();
    let allDates = Array.from(rows).map(r => parseDMY(r.cells[1].textContent.trim()));
    let hasToday = allDates.some(date => isSameDate(date, today));
    let hasFuture = allDates.some(date => date > today);
    let hasPast = allDates.some(date => date < today);

    const thead = document.querySelector("#postTable thead");
    thead.className = "";
    if (hasToday) thead.classList.add("today");
    else if (hasPast && !hasFuture) thead.classList.add("past");
    else thead.classList.add("future");

    rows.forEach(row => {
      const title = row.cells[0].textContent.toLowerCase();
      const category = row.cells[0].querySelector("span")?.textContent.toLowerCase() || '';
      const dateStr = row.cells[1].textContent.trim();
      const rowDate = parseDMY(dateStr);
      let show = true;

      if (search && !(title.includes(search) || category.includes(search))) show = false;
      if (fromDateStr && rowDate < parseDMY(fromDateStr)) show = false;
      if (toDateStr && rowDate > parseDMY(toDateStr)) show = false;

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

    document.querySelectorAll(".quick-tags button").forEach(btn => {
      btn.classList.remove("active");
    });
  }

  function filterByTag(tag) {
  document.getElementById("searchInput").value = '';
  document.getElementById("fromDate").value = '';
  document.getElementById("toDate").value = '';
  activeTag = tag;
  showActiveTag();

  const today = new Date();
  const rows = document.querySelectorAll("#postTable tbody tr");

  const thead = document.querySelector("#postTable thead");

  // ✅ Header color logic
  if (tag === "today") thead.className = "today";
  else if (["yesterday", "lastWeek"].includes(tag)) thead.className = "past";
  else thead.className = "future";

  // Highlight active button
  document.querySelectorAll(".quick-tags button").forEach(btn => btn.classList.remove("active"));
  [...document.querySelectorAll(".quick-tags button")].find(btn => btn.textContent.replace(/\s/g,'').toLowerCase() === tag.toLowerCase()).classList.add("active");

  rows.forEach(row => {
    const dateStr = row.cells[1].textContent.trim();
    const rowDate = parseDMY(dateStr);
    let show = false;

    switch (tag) {
      case "today":
        show = isSameDate(rowDate, today); break;
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
}

  function resetFilters() {
    document.getElementById("searchInput").value = '';
    document.getElementById("fromDate").value = '';
    document.getElementById("toDate").value = '';
    activeTag = '';
    showActiveTag();
    filterTable(false);
  }

  function clearTag() {
    activeTag = '';
    showActiveTag();
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
    document.getElementById("selectedTag").textContent = activeTag ? ` ${tagLabel[activeTag]}` : '';
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

  let heading = ">🔔 Alert:";
  if (typeof activeTag !== "undefined" && tagLabel[activeTag]) {
    heading += ` last date ${tagLabel[activeTag]}`;
  }

  let message = heading + "\n";

  maxRows.forEach(row => {
    const aTag = row.cells[0].querySelector("a");
    const title = aTag ? aTag.textContent.trim() : row.cells[0].textContent.trim();
    const permalink = aTag ? aTag.getAttribute("href").trim() : "";
    
    const shorturl = row.dataset.shorturl?.trim() || "";
    const seoTitle = row.dataset.seoTitle?.trim() || title;
    const date = row.cells[1].textContent.trim();

    const finalLink = shorturl ? `https://yojnaportal.com/${shorturl}` : permalink;

    message += `🎯 *${seoTitle}* \n📅 _Last Date: ${date}_\n🔗 ${finalLink}\n__________________________________________\n`;
  });

  const encodedMessage = encodeURIComponent(message.trim());
  const shareLink = `https://wa.me/?text=${encodedMessage}`;
  window.open(shareLink, "_blank");
}
