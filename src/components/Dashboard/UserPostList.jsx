import React, { useState, useEffect, useContext } from "react";
import PostItem from "./PostItem";
import useFetchPosts from "../../hooks/useFetchPosts";
import Pagination from "../Layout/Pagination";
import { useNavigate, useLocation } from "react-router-dom";
import "./PostList.css";
import { AuthContext } from "../../context/AuthContext";

const UserPostList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
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

  const userPosts = data.posts.filter((post) => post.UserId === user.id);

  return (
    <div className="post-list">
      {userPosts.length > 0 ? (
        userPosts.map((post) => <PostItem key={post.id} post={post} />)
      ) : (
        <div>No posts found.</div>
      )}
      <Pagination
        prevPageUrl={data.prevPage} // Update with actual pagination URLs
        nextPageUrl={data.nextPage}
        onPageChange={handlePageChange} // Pass handlePageChange for pagination
      />
    </div>
  );
};

export default UserPostList;
