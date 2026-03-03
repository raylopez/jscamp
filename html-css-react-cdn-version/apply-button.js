const jobsContainer = document.querySelector(".search-results-container");
jobsContainer?.addEventListener("click", (event) => {
  const element = event.target;
  if (element.classList.contains("button-apply-job")) {
    element.textContent = "¡Aplicado!";
    element.classList.add("is-applied");
    element.disabled = true;
  }
});

/* const btns = document.querySelectorAll(".button-apply-job");

btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.textContent = "¡Aplicado!";
    btn.classList.add("is-applied");
    btn.disabled = true;
  });
});
 */
