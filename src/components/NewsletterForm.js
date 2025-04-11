import { useState } from "react";
import axios from "axios";

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const content = `<h1>Your Spotify Weekly Stats</h1><p>Check your top tracks and artists!</p>`;
    try {
      await axios.post("/api/sendNewsletter", { email, content });
      setMessage("Newsletter sent successfully!");
    } catch (error) {
      setMessage("Error sending newsletter.");
    }
  };

  return (
    <div>
      <h2>Subscribe to Newsletter</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" required />
        <button type="submit">Subscribe</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default NewsletterForm;
