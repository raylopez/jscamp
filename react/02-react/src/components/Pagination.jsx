import styles from "./Pagination.module.css";

export default function Pagination({
  currentPage = 1,
  totalPages = 3,
  onPageChange,
}) {
  const arrPages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;
  const prevButtonClass = isFirstPage ? "disabled" : "";
  const nextButtonClass = isLastPage ? "disabled" : "";

  const handlePrevClick = (event) => {
    event.preventDefault();
    if (isFirstPage === false) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = (event) => {
    event.preventDefault();
    if (isLastPage === false) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageChange = (event, page) => {
    event.preventDefault();
    if (page != currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className={styles.pagination}>
      <a href="#" className={prevButtonClass} onClick={handlePrevClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 6l-6 6l6 6" />
        </svg>
      </a>

      {arrPages.map((page) => (
        <a
          key={page}
          className={currentPage == page ? styles.active : ""}
          href="#"
          onClick={(event) => handlePageChange(event, page)}
        >
          {page}
        </a>
      ))}

      <a href="#" className={nextButtonClass} onClick={handleNextClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 6l6 6l-6 6" />
        </svg>
      </a>
    </div>
  );
}
