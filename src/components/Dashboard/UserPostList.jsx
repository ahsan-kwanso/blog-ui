import React, { useState, useContext } from "react";
import PostItem from "./PostItem";
import useFetchPosts from "../../hooks/useFetchPosts";
import "./PostList.css"; // Reuse the existing CSS
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
const UserPostList = () => {
  const { user } = useContext(AuthContext); // Get user from context
  console.log(user);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch posts based on current page and userId
  const { data, error, loading } = useFetchPosts(
    `/post/comments/user/${user.id}?page=${currentPage}&limit=6`
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

export default UserPostList;
