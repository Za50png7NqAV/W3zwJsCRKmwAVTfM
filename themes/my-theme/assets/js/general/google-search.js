 document.getElementById('searchButton').addEventListener('click', function() {
            const query = document.getElementById('searchInput').value;
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
                document.getElementById('searchInput').value = query;
                search(query);
            }
        }

        window.onload = readQuery;