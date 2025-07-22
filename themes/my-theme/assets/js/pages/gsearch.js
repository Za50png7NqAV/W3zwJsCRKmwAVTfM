    document.getElementById('search-button').addEventListener('click', function() {
            const query = document.getElementById('search-input').value;
            if (query) {
                updateURL(query);
                search(query);
            }
        });

        function updateURL(query) {
            const hash = `#gsc.tab=0&gsc.sort=&gsc.q=${encodeURIComponent(query)}`;
            window.location.hash = hash;
        }


        function readQuery() {
            const hash = window.location.hash;
            const params = new URLSearchParams(hash.substring(1)); // Remove the '#' character
            const query = params.get('gsc.q');
            if (query) {
                document.getElementById('search-input').value = query;
                search(query);
            }
        }

        window.onload = readQuery;
 
    document.querySelectorAll('.dynamic-link').forEach(link => {
      link.addEventListener('click', function(event) {
        event.preventDefault(); 
        const queryParam = this.getAttribute('data-search');
        const newUrl = `?gsc.q=${encodeURIComponent(queryParam)}`;
         window.history.pushState({}, '', newUrl);
         document.querySelector("input.gsc-input").value = queryParam;
         document.querySelector("button.gsc-search-button").click();
      });
    });

  function removeGSCtabHash() {
    // अगर hash जुड़ा है तो उसे remove करें
    if (location.hash.startsWith("#gsc.tab=")) {
      history.replaceState(null, document.title, window.location.pathname + window.location.search);
    }
  }

  // Page load के 500ms बाद चेक करें
  window.addEventListener("load", function () {
    setTimeout(removeGSCtabHash, 100);
  });

  // किसी भी hashchange पर हटाएं (जैसे user search करे)
  window.addEventListener("hashchange", function () {
    setTimeout(removeGSCtabHash, 200); // थोड़ी देरी जरूरी है
  });