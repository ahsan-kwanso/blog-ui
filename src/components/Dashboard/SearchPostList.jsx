import React from "react";
import PostItem from "./PostItem";
import useSearchPost from "../../hooks/useSearchPost";
import PaginationControls from "../Post/PaginationControls";
import "./PostList.css";

const SearchPostList = ({ searchQuery }) => {
  const { currentPage, data, error, loading, handleNextPage, handlePrevPage } =
    useSearchPost(searchQuery);

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

      <PaginationControls
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
        disablePrev={currentPage <= 1}
        disableNext={!data.nextPage}
      />
    </div>
  );
};

export default SearchPostList;
