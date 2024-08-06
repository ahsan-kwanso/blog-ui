import React from "react";
import "./Pagination.css"; // Import your CSS file for styling

const Pagination = ({ prevPageUrl, nextPageUrl, onPageChange }) => {
  const handlePrevPage = () => {
    if (prevPageUrl) {
      onPageChange(prevPageUrl); // Call the handler to fetch the previous page
    }
  };

  const handleNextPage = () => {
    if (nextPageUrl) {
      onPageChange(nextPageUrl); // Call the handler to fetch the next page
    }
  };

  return (
    <div className="pagination-container">
      <button
        className="pagination-button"
        onClick={handlePrevPage}
        disabled={!prevPageUrl}
      >
        Previous
      </button>
      <button
        className="pagination-button"
        onClick={handleNextPage}
        disabled={!nextPageUrl}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
