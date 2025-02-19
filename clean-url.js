   // Function to remove the hash from the URL
   window.addEventListener('hashchange', function () {
    if (window.location.hash === '#gsc.tab=0') {
      // Use history.replaceState to remove the hash without reloading the page
      history.replaceState(null, null, window.location.pathname + window.location.search);
    }
  });

  // Check on page load as well
  window.addEventListener('DOMContentLoaded', function () {
    if (window.location.hash === '#gsc.tab=0') {
      history.replaceState(null, null, window.location.pathname + window.location.search);
    }
  });