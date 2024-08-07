import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PostView.css";
import axiosInstance from "../axiosInstance";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext

const PostView = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext); // Get the logged-in user
  const [showPostReplyForm, setShowPostReplyForm] = useState(false);
  const [postReplyContent, setPostReplyContent] = useState("");
  const navigate = useNavigate();

  const handleReplyClick = () => setShowPostReplyForm(!showPostReplyForm);

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    // Add reply functionality here
    console.log("Reply submitted:", postReplyContent);
    setPostReplyContent("");
    setShowPostReplyForm(false);
  };
  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axiosInstance.get(`/post/comments/${postId}`);
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
          <div className="posthead">
            <h1>{post.title}</h1>
            <button className="back-btn" onClick={handleBackToDashboard}>
              Back
            </button>
          </div>
          <p>{post.content}</p>
          <button className="reply-btn" onClick={handleReplyClick}>
            Reply
          </button>
          {showPostReplyForm && (
            <form onSubmit={handleReplySubmit} className="reply-form">
              <textarea
                value={postReplyContent}
                onChange={(e) => setPostReplyContent(e.target.value)}
                placeholder="Write your reply..."
                required
              ></textarea>
              <button type="submit">Submit</button>
            </form>
          )}
          <div className="comments">
            <h2>Comments</h2>
            {post.comments.length > 0 ? (
              <ul>
                {post.comments.map((comment) => (
                  <CommentItem key={comment.id} comment={comment} user={user} />
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
const CommentItem = ({ comment, user }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const handleReplyClick = () => setShowReplyForm(!showReplyForm);
  const handleDeleteClick = () => {
    // Add delete functionality here
    console.log("Delete comment:", comment.id);
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    // Add reply functionality here
    console.log("Reply submitted:", replyContent);
    setReplyContent("");
    setShowReplyForm(false);
  };

  return (
    <li className="comment">
      <p>{comment.content}</p>
      {user && comment.UserId === user.id && (
        <button className="delete-btn" onClick={handleDeleteClick}>
          Delete
        </button>
      )}
      <button className="reply-btn" onClick={handleReplyClick}>
        Reply
      </button>
      {showReplyForm && (
        <form onSubmit={handleReplySubmit} className="reply-form">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write your reply..."
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      )}
      <ul>
        {comment.subComments.length > 0 &&
          comment.subComments.map((subComment) => (
            <CommentItem key={subComment.id} comment={subComment} user={user} />
          ))}
      </ul>
    </li>
  );
};

export default PostView;
