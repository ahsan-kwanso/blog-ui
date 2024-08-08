import { useState, useContext, useEffect } from "react";
import useFetchPosts from "./useFetchPosts";
import { AuthContext } from "../context/AuthContext";

const useFetchUserPosts = (initialPage = 1, limit = 6) => {
  const { user } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(initialPage);

  const { data, error, loading } = useFetchPosts(
    `/post/comments/user/${user.id}?page=${currentPage}&limit=${limit}`
  );

  useEffect(() => {
    // Reset to page 1 if the user changes or the current page is invalid
    setCurrentPage(initialPage);
  }, [user.id, initialPage]);

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

export default useFetchUserPosts;
