document.addEventListener("DOMContentLoaded", function () {
  const apiKey='';
  const searchButton = document.getElementById("searchButton");
  const searchInput = document.getElementById("searchInput");
  const resultsList = document.getElementById("resultsList");

  

searchInput.addEventListener('input', function () {
  const searchTerm = searchInput.value.trim();
  if (searchTerm !== '') {
    searchWikipedia(searchTerm);
  }
});


searchInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    const searchTerm = searchInput.value.trim();
    if (searchTerm !== '') {
      searchWikipedia(searchTerm);
    }
  }
});
  function searchWikipedia(term) {
      const apiUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${term}&origin=*`;

      fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
              displayResults(data);
          })
          .catch((error) => {
              console.error("Error fetching data: ", error);
          });
  }

  function displayResults(data) {
      const [searchTerm, titles, descriptions, links] = data;


      resultsList.innerHTML = "";

      for (let i = 0; i < titles.length; i++) {
          const listItem = document.createElement("li");
          const link = document.createElement("a");

          link.textContent = titles[i];
          link.href = links[i];
          link.target = "_blank";

          listItem.appendChild(link);
          resultsList.appendChild(listItem);
      }
  }
});