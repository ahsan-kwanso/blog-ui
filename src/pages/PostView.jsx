import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PostView.css";
import axiosInstance from "../axiosInstance";
import { AuthContext } from "../context/AuthContext";
import useError from "../hooks/useError";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faBackward } from "@fortawesome/free-solid-svg-icons";

const PostView = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useError();
  const { user } = useContext(AuthContext);
  const [showPostReplyForm, setShowPostReplyForm] = useState(false);
  const [postReplyContent, setPostReplyContent] = useState("");
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const handleReplyClick = () => setShowPostReplyForm(!showPostReplyForm);

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/comments", {
        PostId: postId,
        title: postReplyContent.split(" ")[0], // First word of content
        content: postReplyContent,
        ParentId: null,
      });
      setPostReplyContent("");
      setShowPostReplyForm(false);
      fetchPost();
    } catch (err) {
      setError("Failed to submit reply.");
    }
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="post-view">
      {post && (
        <div className="post">
          <div className="posthead">
            <h1>{post.title}</h1>
            <button className="back-btn" onClick={handleBackToDashboard}>
              <FontAwesomeIcon icon={faBackward} />
            </button>
          </div>
          <p>{post.content}</p>
          <button className="reply-btn" onClick={handleReplyClick}>
            <FontAwesomeIcon icon={faReply} />
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
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    user={user}
                    fetchPost={fetchPost}
                    setError={setError} // Pass setError to CommentItem
                  />
                ))}
              </ul>
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
        </div>
      )}
      {error && <div className="popup error-popup">{error}</div>}
    </div>
  );
};

const CommentItem = ({ comment, user, fetchPost, setError }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const handleReplyClick = () => setShowReplyForm(!showReplyForm);

  const handleDeleteClick = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.delete(`/comments/${comment.id}`);
      fetchPost();
    } catch (err) {
      setError("Failed to delete comment.");
    }
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/comments", {
        PostId: comment.PostId,
        title: replyContent.split(" ")[0], // First word of content
        content: replyContent,
        ParentId: comment.id,
      });
      setReplyContent("");
      setShowReplyForm(false);
      fetchPost();
    } catch (err) {
      setError("Failed to submit reply.");
    }
  };

  return (
    <li className="comment">
      <p>{comment.content}</p>
      {user && comment.UserId === user.id && (
        <button className="delete-btn" onClick={handleDeleteClick}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      )}
      <button className="reply-btn" onClick={handleReplyClick}>
        <FontAwesomeIcon icon={faReply} />
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
            <CommentItem
              key={subComment.id}
              comment={subComment}
              user={user}
              fetchPost={fetchPost}
              setError={setError} // Pass setError to nested CommentItem
            />
          ))}
      </ul>
    </li>
  );
};

export default PostView;
