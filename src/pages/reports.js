// src/pages/chatbot.js
import GenreExplorer from "../components/GenreExplorer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";


export default function ChatbotPage() {
  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <Navbar />
        <h2 style={{ textAlign: "center", margin: "1rem 0" }}></h2>
        <GenreExplorer />
      </main>
    </div>
  );
}
