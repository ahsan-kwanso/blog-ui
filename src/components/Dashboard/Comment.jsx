import React, { useState } from "react";
import "./Comment.css"; // Import your CSS file

const Comment = ({ comment, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [showSubcommentReplyForm, setShowSubcommentReplyForm] = useState(null);
  const [subcommentReplyContent, setSubcommentReplyContent] = useState("");

  const handleEdit = () => {
    onEdit(comment.id, editContent);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(comment.id);
  };

  const handleReply = () => {
    setShowReplyForm(true);
  };

  const handleSaveReply = () => {
    // Implement logic to save the reply
    setShowReplyForm(false);
    setReplyContent("");
  };

  const handleReplyToSubcomment = (subcommentId) => {
    setShowSubcommentReplyForm(subcommentId);
  };

  const handleSaveSubcommentReply = (subcommentId) => {
    // Implement logic to save the subcomment reply
    setShowSubcommentReplyForm(null);
    setSubcommentReplyContent("");
  };

  return (
    <div className="comment-item">
      {isEditing ? (
        <div className="edit-comment">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            rows="3"
          />
          <div className="comment-actions">
            <button className="btn save-btn" onClick={handleEdit}>
              Save
            </button>
            <button
              className="btn cancel-btn"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="comment-content">
          <p>{comment.content}</p>
          <p>
            <i>by {comment.user}</i>
          </p>
          <div className="comment-actions">
            <button className="btn edit-btn" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className="btn delete-btn" onClick={handleDelete}>
              Delete
            </button>
            <button className="btn reply-btn" onClick={handleReply}>
              Reply
            </button>
          </div>
        </div>
      )}

      {showReplyForm && (
        <div className="reply-form">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            rows="3"
            placeholder="Write your reply..."
          />
          <div className="comment-actions">
            <button className="btn save-btn" onClick={handleSaveReply}>
              Post Reply
            </button>
            <button
              className="btn cancel-btn"
              onClick={() => setShowReplyForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {comment.subcomments && (
        <div className="subcomments-section">
          {comment.subcomments.map((subcomment) => (
            <div key={subcomment.id} className="subcomment-item">
              <p>{subcomment.content}</p>
              <p>
                <i>by {subcomment.user}</i>
              </p>
              <div className="subcomment-actions">
                <button className="btn edit-btn">Edit</button>
                <button className="btn delete-btn">Delete</button>
                <button
                  className="btn reply-btn"
                  onClick={() => handleReplyToSubcomment(subcomment.id)}
                >
                  Reply
                </button>
              </div>
              {showSubcommentReplyForm === subcomment.id && (
                <div className="reply-form">
                  <textarea
                    value={subcommentReplyContent}
                    onChange={(e) => setSubcommentReplyContent(e.target.value)}
                    rows="3"
                    placeholder="Write your reply..."
                  />
                  <div className="comment-actions">
                    <button
                      className="btn save-btn"
                      onClick={() => handleSaveSubcommentReply(subcomment.id)}
                    >
                      Post Reply
                    </button>
                    <button
                      className="btn cancel-btn"
                      onClick={() => setShowSubcommentReplyForm(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
