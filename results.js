document.addEventListener("DOMContentLoaded", function () {
  const resultsDiv = document.getElementById("results");
  const prevPageBtn = document.getElementById("prevPage");
  const nextPageBtn = document.getElementById("nextPage");
  let data = JSON.parse(localStorage.getItem("apiData")) || [];
  let currentPage = 1;
  const recordsPerPage = 50;
  function displayResults() {
    const start = (currentPage - 1) * recordsPerPage;
    const end = start + recordsPerPage;
    const paginatedData = data.slice(start, end);
    let html = "<table><thead><tr>";
    if (paginatedData.length > 0) {
      Object.keys(paginatedData[0]).forEach((key) => {
        html += `<th>${key}</th>`;
      });
      html += "</tr></thead><tbody>";
      paginatedData.forEach((item) => {
        html += "<tr>";
        Object.values(item).forEach((value) => {
          html += `<td>${value}</td>`;
        });
        html += "</tr>";
      });
      html += "</tbody></table>";
    } else {
      html = "<p>No data available.</p>";
    }

    resultsDiv.innerHTML = html;

    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = end >= data.length;
  }

  prevPageBtn.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      displayResults();
    }
  });
  nextPageBtn.addEventListener("click", function () {
    if (currentPage * recordsPerPage < data.length) {
      currentPage++;
      displayResults();
    }
  });

  displayResults();
});
