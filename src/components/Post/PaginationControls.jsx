import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./PaginationControls.css"; // Add CSS for styling

const PaginationControls = ({
  onPrevPage,
  onNextPage,
  disablePrev,
  disableNext,
}) => (
  <div className="pagination-controls">
    <button onClick={onPrevPage} disabled={disablePrev}>
      <FontAwesomeIcon icon={faChevronLeft} />
    </button>
    <button onClick={onNextPage} disabled={disableNext}>
      <FontAwesomeIcon icon={faChevronRight} />
    </button>
  </div>
);

export default PaginationControls;
