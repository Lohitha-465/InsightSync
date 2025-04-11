// src/pages/chatbot.js
import Chatbot from "../components/Chatbot";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../styles/chatbot.module.scss";

export default function ChatbotPage() {
  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <Navbar />
        <h2 style={{ textAlign: "center", margin: "1rem 0" }}>🎤 Music Chatbot Assistant</h2>
        <Chatbot />
      </main>
    </div>
  );
}
