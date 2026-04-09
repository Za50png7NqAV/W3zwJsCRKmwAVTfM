function sharePost() {
  if (navigator.share) {
    navigator.share({
      title: document.title,
      url: window.location.href
    });
  } else {
    alert("Share not supported");
  }
}

function goToState(url) {
  if (url !== "") {
    window.location.href = url;
  }
}
document.addEventListener("DOMContentLoaded", function() {
  let currentPath = window.location.pathname.replace(/\/$/, "");
  let select = document.getElementById("stateSelect");

  for (let option of select.options) {
    let value = option.value.replace(/\/$/, "");
    if (value === currentPath) {
      option.selected = true;
    }
  }
});

function goToSearch() {
  let query = document.getElementById("searchInput").value.trim();

  // Direct redirect (empty भी चलेगा)
  window.location.href = "/search/?q=" + encodeURIComponent(query);
}
