const jobsContainer = document.querySelector(".search-results-container");
const PER_PAGE = 5;
const paginationContainer = document.querySelector(".pagination");

const query = new URLSearchParams(window.location.search);

function createPagination(pageSize, currentPage, jobsLenght) {
  const prevButton = document.createElement("a");
  prevButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg>`;
  prevButton.href = `?currentPage=${currentPage - 1}`;
  prevButton.classList.toggle("disabled", currentPage === 0);
  paginationContainer.appendChild(prevButton);

  for (let index = 0; index < pageSize; index++) {
    const pageItem = document.createElement("a");
    pageItem.innerHTML = `${index + 1}`;
    pageItem.href = `?currentPage=${index}`;
    if (index === currentPage) {
      pageItem.classList.add("active");
    }
    paginationContainer.appendChild(pageItem);
  }

  const nextButton = document.createElement("a");
  nextButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l6 6l-6 6" /></svg>`;
  nextButton.href = `?currentPage=${currentPage >= jobsLenght ? currentPage : currentPage + 1}`;
  nextButton.classList.toggle("disabled", currentPage + 1 === pageSize);
  paginationContainer.appendChild(nextButton);
}

fetch("./jobs.json")
  .then((resp) => resp.json())
  .then((jobs) => {
    const jobsTotal = jobs.length;
    let pageSize = Math.ceil(jobsTotal / PER_PAGE);
    const currentPage = Number(query.get("currentPage") ?? "0");
    createPagination(pageSize, currentPage, jobsTotal);

    jobs = jobs.slice(currentPage, currentPage + PER_PAGE);
    jobs.forEach((job) => {
      const article = document.createElement("article");
      article.dataset.modalidad = job.data.modalidad;
      article.dataset.nivel = job.data.nivel;
      article.dataset.technology = job.data.technology;
      article.innerHTML = `<div class="header">
        <div>
          <h2>${job.titulo}</h2>
          <h3>${job.empresa} | ${job.data.modalidad}</h3>
        </div>
        <button class="button-apply-job">Aplicar</button>
      </div>
      <p>
        ${job.descripcion}
      </p>`;

      jobsContainer.appendChild(article);
    });
  });
