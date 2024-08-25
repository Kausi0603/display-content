document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("apiForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const baseUrl = document.getElementById("base_url").value;
    const partition = document.getElementById("partition").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const un = `${partition}/${username}`;
    const url = `https://${baseUrl}/pricefx/${partition}/productmanager.fetchformulafilteredproducts`;
    const payload = {
      operationType: "fetch",
    };
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(un + ":" + password),
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((responseJson) => {
        localStorage.setItem(
          "apiData",
          JSON.stringify(responseJson.response.data)
        );
        window.location.href = "results.html";
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        alert("An error occurred: " + error.message);
      });
  });
});
