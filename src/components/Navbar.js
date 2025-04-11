'use client';

import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
// import "../styles/dashboard.css";

const Navbar = () => {
  const [theme, setTheme] = useState("light");
  const [username, setUsername] = useState("User");

  useEffect(() => {
    // Theme setup
    const stored = localStorage.getItem("theme") || "light";
    setTheme(stored);
    document.documentElement.setAttribute("data-theme", stored);

    // Fetch Spotify user
    const fetchUserProfile = async () => {
      try {
        const res = await fetch("/api/spotify/me");
        if (res.ok) {
          const data = await res.json();
          setUsername(data.display_name || data.id || "Spotify User");
        } else {
          console.error("Failed to fetch user profile");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchUserProfile();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <div className="navbar">
      <div className="scrolling-text">
        <h2>🎵 InsightSync 🎵 </h2>
      </div>
      <div className="navbar-right">
        <button onClick={() => window.location.reload()} className="refresh-btn">
          🔄
        </button>

        <button onClick={toggleTheme} className="theme-toggle-btn">
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        <div className="user-info">
          <FaUserCircle className="user-icon" />
          <span className="user-name">{username}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
