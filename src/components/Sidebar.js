'use client';

import { useState } from "react";
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link'; // ✅ Import Link for navigation

// import "../styles/sidebar.scss";
// import "../styles/dashboard.scss";

export default function Sidebar() {
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
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

  return (
    <aside className="sidebar">
      <h2>🎵 InsightSync</h2>
      <nav>
        <Link href="/" className={pathname === "/" ? "active" : ""}> 🎤 Home</Link>
        <Link href="/charts" className={pathname === "/charts" ? "active" : ""}>📊 Dashboard</Link>
        <Link href="/reports" className={pathname === "/reports" ? "active" : ""}>📑 Reports</Link>
        <Link href="/settings" className={pathname === "/settings" ? "active" : ""}>⚙ Newsletter</Link>
        <Link href="/chatbot" className={pathname === "/chatbot" ? "active" : ""}>🤖 Chatbot</Link>
        <button onClick={handleLogout} className="signout">🚪 Sign Out</button>
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
  );
}
