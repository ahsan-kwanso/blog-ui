import { useState, useEffect } from "react";
import useFetchPosts from "./useFetchPosts";

const usePagination = (initialPage = 1, limit = 6) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const { data, error, loading } = useFetchPosts(
    `/posts?page=${currentPage}&limit=${limit}`
  );

  const handleNextPage = () => {
    if (data.nextPage) {
      const nextPageNumber = new URL(data.nextPage).searchParams.get("page");
      setCurrentPage(parseInt(nextPageNumber, 10));
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return {
    currentPage,
    data,
    error,
    loading,
    handleNextPage,
    handlePrevPage,
    setCurrentPage,
  };
};

export default usePagination;
