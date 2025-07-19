document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('search-query');
  const searchResults = document.getElementById('search-results');
  let index, documents;

  // JSON index fetch karein
  fetch('/index.json')
    .then(response => response.json())
    .then(data => {
      documents = data;
      index = lunr(function() {
        this.ref('permalink');
        this.field('title');
        this.field('content');
        data.forEach(doc => this.add(doc));
      });
    })
    .catch(error => console.error('Error loading index:', error));

  // Search input par event listener
  searchInput.addEventListener('input', function() {
    const query = this.value;
    searchResults.innerHTML = '';

    if (query.length < 2) {
      return;
    }

    const results = index.search(query);
    if (results.length === 0) {
      searchResults.innerHTML = '<p>No results found</p>';
      return;
    }

    results.forEach(result => {
      const doc = documents.find(d => d.permalink === result.ref);
      const resultElement = document.createElement('div');
      resultElement.innerHTML = `<h3><a href="${doc.permalink}">${doc.title}</a></h3><p>${doc.content.substring(0, 100)}...</p>`;
      searchResults.appendChild(resultElement);
    });
  });
});