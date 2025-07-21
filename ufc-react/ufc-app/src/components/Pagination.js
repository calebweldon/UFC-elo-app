import React from "react";
import "../styles/Pagination.css"; 

const Pagination = ({ page, totalPages, setPage }) => {
  return (
    <div className="pagination">
      <button disabled={page === 0} onClick={() => setPage(page - 1)}>
        Previous
      </button>
      <span>
        Page {page + 1} of {totalPages}
      </span>
      <button
        disabled={page + 1 === totalPages}
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;