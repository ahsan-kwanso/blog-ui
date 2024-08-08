// src/components/Dashboard/SearchPostList.js
import React, { useState, useEffect } from "react";
import PostItem from "./PostItem";
import useFetchPosts from "../../hooks/useFetchPosts";
import "./PostList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const SearchPostList = ({ searchQuery }) => {
  const [currentPage, setCurrentPage] = useState(1);
  // Fetch posts based on search query and current page
  const { data, error, loading } = useFetchPosts(
    `/post/comments/search?title=${searchQuery}&content=${searchQuery}&page=${currentPage}&limit=6`
  );
  console.log(searchQuery, data);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading posts: {error.message}</div>;
  }

  return (
    <div className="post-list-container">
      <div className="post-list">
        {data.posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>

      <div className="pagination-controls">
        <button onClick={handlePrevPage} disabled={currentPage <= 1}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button onClick={handleNextPage} disabled={!data.nextPage}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default SearchPostList;
