let fuse;
let searchData = [];

fetch("/index.json")
    .then((response) => response.json())
    .then((data) => {
        searchData = data;
        console.log("Search data loaded:", searchData);
        fuse = new Fuse(searchData, {
            keys: ["title", "content", "tags", "categories"],
            threshold: 0.3,
        });
    })
    .catch((error) => console.error("Error loading search data:", error));

function performSearch() {
    const query = document.getElementById("search-input").value;
    console.log("Search query:", query);
    const results = query ? fuse.search(query) : [];
    console.log("Search results:", results);

    const resultsList = document.getElementById("search-results");
    resultsList.innerHTML = "";

    results.forEach(({ item }) => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${item.link}">${item.title}</a>`;
        resultsList.appendChild(li);
    });
}
