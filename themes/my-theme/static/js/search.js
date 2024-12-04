let searchIndex = [];

// Load the search index JSON
fetch('/search.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    searchIndex = data;
  })
  .catch(error => {
    console.error("Error loading search index:", error);
  });

// Perform search
function searchPosts() {
  const query = document.getElementById('searchBar').value.toLowerCase();
  const resultsContainer = document.getElementById('searchResults');
  resultsContainer.innerHTML = ''; // Clear previous results

  if (query.trim() === '') return;

  const filteredResults = searchIndex.filter(post => {
    return post.title.toLowerCase().includes(query) || post.content.toLowerCase().includes(query);
  });

  if (filteredResults.length === 0) {
    resultsContainer.innerHTML = '<p>No results found</p>';
    return;
  }

  // Render search results
  filteredResults.forEach(post => {
    const resultItem = document.createElement('div');
    resultItem.innerHTML = `
      <h3><a href="${post.permalink}">${post.title}</a></h3>
      <p>${post.content.substring(0, 150)}...</p>
    `;
    resultsContainer.appendChild(resultItem);
  });
}
