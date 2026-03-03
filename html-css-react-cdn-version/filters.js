const filterLocation = document.querySelector("#filter-location");
const filterTechnology = document.querySelector("#filter-technology");
const filterLevel = document.querySelector("#filter-level");
const searchForm = document.querySelector("#search-form");
const jobsContainer = document.querySelector(".search-results-container");

filterLocation?.addEventListener("change", (event) => {
  const locationValue = event.target.value;
  const articles = jobsContainer.querySelectorAll("article");

  articles?.forEach((article) => {
    const modalidad = article.dataset.modalidad;
    console.log(modalidad);
    const isShown = locationValue == "" || modalidad == locationValue;
    article.classList.toggle("is-hidden", isShown === false);
  });
});

filterTechnology?.addEventListener("change", (event) => {
  const value = event.target.value;
  const articles = jobsContainer.querySelectorAll("article");

  articles?.forEach((article) => {
    /* if (!article.querySelector("p").textContent.toLowerCase().includes(value)) {
      article.style.display = "none";
    } else {
      article.style.display = "block";
    } */
    const technologies = article.dataset.technology.split(",");
    const isShown = technologies.includes(value);
    article.classList.toggle("is-hidden", isShown === false);
  });
});

filterLevel?.addEventListener("change", (event) => {
  const value = event.target.value;
  const articles = jobsContainer.querySelectorAll("article");
  articles.forEach((article) => {
    const level = article.dataset.nivel;
    const isShown = value === "" || level === value;
    article.classList.toggle("is-hidden", isShown === false);
  });
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("submit");
});
