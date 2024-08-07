// PostView.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PostView.css"; // Import the stylesheet for styling
import axiosInstance from "../axiosInstance";

const PostView = ({ match }) => {
  const { postId } = useParams();
  //console.log(postId);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        //console.log(postId);
        const response = await axiosInstance.get(`/post/comments/${postId}`);
        //console.log(response);
        setPost(response.data[0]);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch post data.");
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="post-view">
      {post && (
        <div className="post">
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          <div className="comments">
            <h2>Comments</h2>
            {post.comments.length > 0 ? (
              <ul>
                {post.comments.map((comment) => (
                  <CommentItem key={comment.id} comment={comment} />
                ))}
              </ul>
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Recursive component to handle nested comments
const CommentItem = ({ comment }) => {
  return (
    <li className="comment">
      <p>{comment.content}</p>
      <ul>
        {comment.subComments.length > 0 &&
          comment.subComments.map((subComment) => (
            <CommentItem key={subComment.id} comment={subComment} />
          ))}
      </ul>
    </li>
  );
};

export default PostView;
