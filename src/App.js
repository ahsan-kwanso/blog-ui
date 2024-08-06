import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./hooks/PrivateRoute";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import PostView from "./pages/PostView"; // Import PostView page
import Intro from "./pages/Intro";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* Add other routes here, such as Dashboard or Home */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/edit-post/:postId" element={<EditPost />} />
            <Route path="/posts/:id" element={<PostView />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
