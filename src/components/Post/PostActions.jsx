import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faNewspaper,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import { AuthContext } from "../../context/AuthContext";
import "./PostAction.css"; // If you have specific styles for this component

const PostActions = ({ post, onDelete }) => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {post.UserId === user.id ? (
        <div className="post-actions">
          <Link to={`/posts/${post.id}`} className="btn view-btn">
            <FontAwesomeIcon icon={faNewspaper} className="edit-icon" />
          </Link>
          <Link to={`/edit-post/${post.id}`} className="btn edit-btn">
            <FontAwesomeIcon icon={faPenToSquare} className="edit-icon" />
          </Link>
          <button className="btn delete-btn" onClick={onDelete}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      ) : (
        <Link to={`/posts/${post.id}`} className="btn view-btn">
          <FontAwesomeIcon icon={faNewspaper} className="edit-icon" />
        </Link>
      )}
    </>
  );
};

export default PostActions;
