import { useState, useEffect } from "react";
import useFetchPosts from "./useFetchPosts";

const useSearchPost = (searchQuery, initialPage = 1, limit = 6) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const { data, error, loading } = useFetchPosts(
    `/post/comments/search?title=${searchQuery}&content=${searchQuery}&page=${currentPage}&limit=${limit}`
  );

  useEffect(() => {
    // Reset to page 1 when search query changes
    setCurrentPage(1);
  }, [searchQuery]);

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
  };
};

export default useSearchPost;
