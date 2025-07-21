 const burger = document.getElementById('burger');
    const menu = document.getElementById('menu');
    const overlay = document.getElementById('overlay');
    const searchToggle = document.getElementById('searchToggle');
    const searchBlock = document.getElementById('searchBlock');
    const searchCancel = document.getElementById('searchCancel');

    burger.addEventListener('click', () => {
      menu.classList.add('is-active');
      overlay.classList.add('is-active');
    });

    overlay.addEventListener('click', () => {
      menu.classList.remove('is-active');
      overlay.classList.remove('is-active');
    });

    document.querySelectorAll('.menu-link').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('is-active');
        overlay.classList.remove('is-active');
      });
    });

    searchToggle.addEventListener('click', () => {
      searchBlock.classList.add('is-active');
    });

    searchCancel.addEventListener('click', () => {
      searchBlock.classList.remove('is-active');
    });




  document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-query');
    const searchResults = document.getElementById('search-results');
    const searchIframe = document.getElementById('search-iframe');
    let index, documents;

    // Load JSON index
    fetch('/index.json')
      .then(response => response.json())
      .then(data => {
        documents = data;
        index = lunr(function () {
          this.ref('permalink');
          this.field('title');
          this.field('content');
          data.forEach(doc => this.add(doc));
        });
      })
      .catch(error => console.error('Error loading index:', error));

    // Realtime suggestion
    searchInput.addEventListener('input', function () {
      performSearch(this.value);
    });

    // 🔍 Submit handler
    window.handleSearch = function (event) {
      if (event) event.preventDefault();
      const query = searchInput.value.trim();
      if (!query || query.length < 2) return;

      const results = index.search(query);
      displayResults(results, query);
      saveSearchToHistory(query);

      // Optional: Google CSE fallback anchor
      const newURL = `#gsc.tab=0&gsc.sort=&gsc.q=${encodeURIComponent(query)}`;
      window.location.hash = newURL;
    };

    // Highlight matched words
    function highlight(text, keyword) {
      const regex = new RegExp(`(${keyword})`, 'gi');
      return text.replace(regex, `<mark>$1</mark>`);
    }

    // Result Display
    function displayResults(results, query) {
      searchResults.innerHTML = '';

      if (results.length === 0) {
        searchIframe.style.display = 'block'; // fallback iframe
        return;
      }

      searchIframe.style.display = 'none'; // hide iframe if results found

      results.forEach(result => {
        const doc = documents.find(d => d.permalink === result.ref);
        const titleHighlighted = highlight(doc.title, query);
        const contentSnippet = doc.content.substring(0, 80);
        const contentHighlighted = highlight(contentSnippet, query);

        const resultElement = document.createElement('div');
        resultElement.innerHTML = `
          <h3><a href="${doc.permalink}">${titleHighlighted}</a></h3>
          <p>${contentHighlighted}...</p>`;
        searchResults.appendChild(resultElement);
      });
    }

    // Input-based suggestion
    function performSearch(query) {
      if (!index || query.length < 2) {
        searchResults.innerHTML = '';
        searchIframe.style.display = 'none';
        return;
      }

      const results = index.search(query);
      displayResults(results, query);
    }

    // Recent Search History (localStorage)
    function saveSearchToHistory(query) {
      let history = JSON.parse(localStorage.getItem('searchHistory')) || [];
      if (!history.includes(query)) {
        history.unshift(query);
        if (history.length > 10) history = history.slice(0, 10); // limit
        localStorage.setItem('searchHistory', JSON.stringify(history));
      }
      showSearchHistory();
    }

   function showSearchHistory() {
  const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
  const container = document.getElementById('recent-searches');
  container.innerHTML = '';

  if (history.length === 0) return;

  const title = document.createElement('h4');
  title.textContent = 'Recent Searches';
  title.style.marginBottom = '5px';
  container.appendChild(title);

  // 🔘 Clear All Button
  const clearBtn = document.createElement('button');
  clearBtn.textContent = '🗑️Clear  ';
  clearBtn.style.marginBottom = '10px';
  clearBtn.style.padding = '5px 3px';
  clearBtn.style.backgroundColor = '#e74c3c';
  clearBtn.style.color = '#fff';
  clearBtn.style.border = 'none';
  clearBtn.style.borderRadius = '5px';
  clearBtn.style.cursor = 'pointer';
  clearBtn.onclick = () => {
    localStorage.removeItem('searchHistory');
    showSearchHistory();
  };
  container.appendChild(clearBtn);

  // 🔍 Individual Buttons with Icon + Text + Cut
  history.forEach(query => {
    const wrapper = document.createElement('div');
    wrapper.style.display = 'inline-flex';
    wrapper.style.alignItems = 'center';
    wrapper.style.margin = '5px';
    wrapper.style.border = '1px solid #ccc';
    wrapper.style.borderRadius = '5px';
    wrapper.style.overflow = 'hidden';
    wrapper.style.backgroundColor = '#f9f9f9';

    const iconSpan = document.createElement('span');
    iconSpan.innerHTML = '<i class="bx bx-search"></i>';
    iconSpan.style.padding = '2px 3px';
    iconSpan.style.backgroundColor = '#e0e0e0';
    iconSpan.style.borderRight = '1px solid #ccc';

    const btn = document.createElement('button');
    btn.textContent = query;
    btn.style.padding = '3px 5px';
    btn.style.border = 'none';
    btn.style.background = 'none';
    btn.style.cursor = 'pointer';
    btn.style.fontSize = '14px';
    btn.onclick = () => {
      searchInput.value = query;
      handleSearch();
    };

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.style.padding = '3px 5px';
    closeBtn.style.border = 'none';
    closeBtn.style.backgroundColor = '#ffe6e6';
    closeBtn.style.cursor = 'pointer';
    closeBtn.title = 'Remove';

    closeBtn.onclick = () => {
      const newHistory = history.filter(item => item !== query);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      showSearchHistory(); // refresh UI
    };

    wrapper.appendChild(iconSpan);
    wrapper.appendChild(btn);
    wrapper.appendChild(closeBtn);
    container.appendChild(wrapper);
  });
}

    // On page load, show previous search history
    showSearchHistory();
  });
  
  const searchInput2 = document.getElementById('search-query');
const clearInputBtn = document.getElementById('clearInputBtn');

// Show/hide clear button on input
searchInput2.addEventListener('input', () => {
  clearInputBtn.style.display = searchInput2.value.length > 0 ? 'block' : 'none';
});

// Clear input on click
clearInputBtn.addEventListener('click', () => {
  searchInput2.value = '';
  clearInputBtn.style.display = 'none';
  searchInput.focus();

  // Optional: clear search result and iframe too
  document.getElementById('search-results').innerHTML = '';
  document.getElementById('search-iframe').style.display = 'none';
});
