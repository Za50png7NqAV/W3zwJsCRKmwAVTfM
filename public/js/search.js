// Assuming you have a `searchIndex` generated and accessible
function searchContent() {
  var query = document.getElementById("searchInput").value.toLowerCase();
  var results = [];
  
  // Loop through the search index to find matching content
  searchIndex.pages.forEach(function(page) {
    if (page.title.toLowerCase().includes(query) || page.content.toLowerCase().includes(query)) {
      results.push(page);
    }
  });

  displayResults(results);
}

function displayResults(results) {
  var resultList = document.getElementById("searchResults");
  resultList.innerHTML = ""; // Clear previous results

  if (results.length === 0) {
    resultList.innerHTML = "<li>No results found</li>";
    return;
  }

  results.forEach(function(result) {
    var li = document.createElement("li");
    li.innerHTML = `<a href="${result.url}">${result.title}</a>`;
    resultList.appendChild(li);
  });
}
