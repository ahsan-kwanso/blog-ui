import React, { useState } from "react";
import Comment from "../components/Dashboard/Comment";
import { useParams } from "react-router-dom";
import "./PostView.css"; // Import your CSS file

const dummyPost = {
  id: 1,
  title: "Understanding React Hooks",
  content: `React Hooks are functions that let you use state and other React features without writing a class. They are a way to use state and lifecycle features in functional components. Some commonly used hooks include useState, useEffect, and useContext.`,
  user: "JaneDoe",
};

const dummyComments = [
  {
    id: 1,
    content:
      "Great explanation of React Hooks! This really helped me understand how to use them effectively.",
    user: "Alice",
    subcomments: [
      {
        id: 1,
        content:
          "I'm glad you found it helpful! Do you have any specific questions about useEffect?",
        user: "JaneDoe",
      },
      {
        id: 2,
        content:
          "Yes, I was wondering how to manage multiple useEffect calls with different dependencies.",
        user: "Alice",
      },
    ],
  },
  {
    id: 2,
    content:
      "I still prefer class components for certain use cases. Hooks seem a bit too complex for me.",
    user: "Bob",
    subcomments: [
      {
        id: 3,
        content:
          "Hooks might seem complex at first, but they simplify code in the long run. Have you tried using them in small projects?",
        user: "JaneDoe",
      },
    ],
  },
  {
    id: 3,
    content:
      "Does anyone have examples of custom hooks? I'd love to see some practical implementations.",
    user: "Charlie",
    subcomments: [],
  },
  {
    id: 4,
    content:
      "React Hooks are fantastic for functional components. They've really improved my development workflow.",
    user: "David",
    subcomments: [
      {
        id: 4,
        content:
          "Absolutely! Custom hooks have made it easier to share logic between components.",
        user: "Alice",
      },
    ],
  },
];

const PostView = () => {
  const [comments, setComments] = useState(dummyComments);

  const handleEditComment = (id, newContent) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id ? { ...comment, content: newContent } : comment
      )
    );
  };

  const handleDeleteComment = (id) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== id)
    );
  };

  const handleReply = () => {
    // Logic for replying to a post
  };

  return (
    <div className="post-view-container">
      <h1>{dummyPost.title}</h1>
      <p>{dummyPost.content}</p>
      <button className="btn reply-btn" onClick={handleReply}>
        Reply
      </button>
      <div className="comments-section">
        <h3>Comments:</h3>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onEdit={handleEditComment}
            onDelete={handleDeleteComment}
          />
        ))}
      </div>
    </div>
  );
};

export default PostView;
