import React, { useState, useEffect } from "react";
import PostItem from "./PostItem";
import useFetchPosts from "../../hooks/useFetchPosts";
import Pagination from "../Layout/Pagination";
import { useNavigate, useLocation } from "react-router-dom";
import "./PostList.css";

const PostList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [pageUrl, setPageUrl] = useState(location.pathname + location.search);
  const { data, error, loading, handlePageChange } = useFetchPosts("/posts"); // Initialize with default URL

  useEffect(() => {
    // Ensure the URL is updated whenever `location` changes
    setPageUrl(location.pathname + location.search);
  }, [location]);

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
        prevPageUrl={null}
        nextPageUrl={data.nextPage}
        onPageChange={handlePageChange} // Pass handlePageChange for pagination
      />
    </div>
  );
};

export default PostList;
