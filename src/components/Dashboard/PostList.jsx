import React from "react";
import PostItem from "./PostItem";
import useFetchPosts from "../../hooks/useFetchPosts";
import Pagination from "../Layout/Pagination";
import "./PostList.css";

const PostList = () => {
  const { data, error, loading, handlePageChange } = useFetchPosts("/posts"); // Initialize with default URL

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading posts: {error.message}</div>;
  }

  return (
    <div className="post-list">
      {data.posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
      <Pagination
        prevPageUrl={data.prevPage}
        nextPageUrl={data.nextPage}
        onPageChange={handlePageChange} // Pass handlePageChange for pagination
      />
    </div>
  );
};

export default PostList;
