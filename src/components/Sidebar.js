'use client';

import { useState } from "react";
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Sidebar() {
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setStatusMessage("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatusMessage("Thank you for subscribing! 🎉");
      } else {
        setStatusMessage("Oops, something went wrong. Please try again.");
      }
    } catch (error) {
      setStatusMessage("Network error. Please try again.");
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      });
      if (res.ok) {
        router.push("/login");
      }
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const handleLinkClick = () => {
    setSidebarOpen(false); // Close sidebar on mobile after clicking a link
  };

  return (
    <>
      {/* Toggle Button (fixed outside sidebar) */}
      <button
        className="sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? '✖' : '☰'}
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "active" : ""}`}>
        <h2>🎵 InsightSync</h2>
        <nav>
          <Link href="/" className={pathname === "/" ? "active" : ""} onClick={handleLinkClick}> 🏠︎ Home</Link>
          <Link href="/charts" className={pathname === "/charts" ? "active" : ""} onClick={handleLinkClick}>📊 Dashboard</Link>
          <Link href="/reports" className={pathname === "/reports" ? "active" : ""} onClick={handleLinkClick}>📑 Reports</Link>
          <Link href="/settings" className={pathname === "/settings" ? "active" : ""} onClick={handleLinkClick}>📰 Newsletter</Link>
          <Link href="/chatbot" className={pathname === "/chatbot" ? "active" : ""} onClick={handleLinkClick}>🤖 Chatbot</Link>
          <button onClick={handleLogout} className="signout">【﻿⏻】 Sign Out</button>
        </nav>

        <section className="newsletter">
          <h3>📰 Subscribe to our Newsletter</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-btn">Subscribe</button>
          </form>
          {statusMessage && <p className="status-message">{statusMessage.replace("'", "&#39;")}</p>}
        </section>
      </aside>
    </>
  );
}
