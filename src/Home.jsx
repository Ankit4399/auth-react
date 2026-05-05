import React from "react";
import { useEffect, useState } from "react";
import { api } from "./api.js";
import { useNavigate } from "@tanstack/react-router";

const Home = () => {
    const [user, setUser] = useState(null);
  const navigate = useNavigate();

useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    navigate({ to: "/login" }); // protect route
  } else {
    setUser(user);
  }
}, []);

  const logout = async () => {
  localStorage.removeItem("user"); // 
  alert("Logged out");
  navigate({ to: "/login" }); 
};

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-header">
          <h1 className="home-title">🏠 Welcome Home</h1>
          <p className="home-subtitle">You are successfully logged in</p>
        </div>
        
        <div className="home-card">
          <div className="card-icon">✨</div>
          <h3>Welcome!</h3>
          <p>Your secure authentication is complete. Enjoy your journey with us.</p>
        </div>

        <div className="home-container">
            <h2>Welcome {user?.username}</h2>
        </div>

        <div className="home-actions">
          <button className="action-btn primary-btn">Dashboard</button>
          <button className="action-btn secondary-btn">Settings</button>
          <button className="action-btn danger-btn" onClick={logout}>
            Logout
            </button>
        </div>
      </div>
    </div>
  );
};

export default Home;