import React from "react";
import PostItem from "./PostItem";

const dummyPosts = [
  { id: 1, title: "Post Title 1", content: "Post content 1...", user: "User1" },
  {
    id: 2,
    title: "Post Title 2",
    content: "Post content 2...",
    user: "User2",
  },
  { id: 3, title: "Post Title 4", content: "Post content 4...", user: "User3" },
  { id: 4, title: "Post Title 4", content: "Post content 4...", user: "User4" },
  { id: 5, title: "Post Title 5", content: "Post content 5...", user: "User5" },
  // Add more dummy posts as needed
];

const PostList = () => {
  return (
    <div className="post-list">
      {dummyPosts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
      {/* Add pagination controls here */}
    </div>
  );
};

export default PostList;
