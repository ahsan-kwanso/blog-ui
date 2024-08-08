import React, { useState } from "react";
import PostItem from "./PostItem";
import useFetchPosts from "../../hooks/useFetchPosts";
import "./PostList.css";

const PostList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch posts based on current page
  const { data, error, loading } = useFetchPosts(
    `/posts?page=${currentPage}&limit=6`
  );

  const handleNextPage = () => {
    if (data.nextPage) {
      // Extract the next page from the URL
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
          Prev
        </button>
        <button onClick={handleNextPage} disabled={!data.nextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PostList;
