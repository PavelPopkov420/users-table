import styles from "./Pagination.module.scss";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxVisiblePages = 5;

  const calculatePageRange = () => {
    if (totalPages <= maxVisiblePages) {
      return { start: 1, end: totalPages };
    }

    let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end === totalPages) {
      start = totalPages - maxVisiblePages + 1;
    } else if (start === 1) {
      end = maxVisiblePages;
    }

    return { start, end };
  };

  const { start, end } = calculatePageRange();
  const pageNumbers = Array.from(
    { length: end - start + 1 },
    (_, i) => start + i
  );

  const goToFirstPage = () => onPageChange(1);
  const goToLastPage = () => onPageChange(totalPages);
  const goToPrevPage = () => onPageChange(Math.max(1, currentPage - 1));
  const goToNextPage = () =>
    onPageChange(Math.min(totalPages, currentPage + 1));

  return (
    <div className={styles.pagination}>
      <button
        onClick={goToFirstPage}
        disabled={currentPage === 1}
        className={styles.navButton}
        aria-label="First page"
      >
        «
      </button>
      <button
        onClick={goToPrevPage}
        disabled={currentPage === 1}
        className={styles.navButton}
        aria-label="Previous page"
      >
        ‹
      </button>

      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`${styles.pageButton} ${
            currentPage === number ? styles.active : ""
          }`}
          aria-label={`Page ${number}`}
          aria-current={currentPage === number ? "page" : undefined}
        >
          {number}
        </button>
      ))}

      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className={styles.navButton}
        aria-label="Next page"
      >
        ›
      </button>
      <button
        onClick={goToLastPage}
        disabled={currentPage === totalPages}
        className={styles.navButton}
        aria-label="Last page"
      >
        »
      </button>
    </div>
  );
};
