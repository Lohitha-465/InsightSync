import { useState } from "react";
import { FiSend, FiMusic, FiStar, FiHeadphones } from "react-icons/fi";
import styles from "../styles/NewsLetter.module.scss"; // Make sure this path is correct

function NewsletterCard({ Icon, title, subtitle }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.includes("@")) {
      setStatus("success");
      setTimeout(() => setStatus(null), 3000);
      setEmail("");
    } else {
      setStatus("error");
      setTimeout(() => setStatus(null), 3000);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.iconCircle}>
        <Icon />
      </div>
      <h3 className={styles.heading}>{title}</h3>
      <p className={styles.subtext}>{subtitle}</p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>
          Subscribe
        </button>
      </form>
      {status === "success" && (
        <p className={styles.success}>✅ You&#39;re subscribed!</p>
      )}
      {status === "error" && (
        <p className={styles.error}>❌ Please enter a valid email.</p>
      )}
    </div>
  );
}

export default function NewsletterGrids() {
  return (
    <div className={styles.gridContainer}>
      <NewsletterCard
        Icon={FiSend}
        title="Weekly Vibes 🎧"
        subtitle="Stay in sync with top music trends"
      />
      <NewsletterCard
        Icon={FiMusic}
        title="Fresh Beats 🔥"
        subtitle="New releases, every single Friday"
      />
      <NewsletterCard
        Icon={FiHeadphones}
        title="Chill Hours 🌙"
        subtitle="Lo-fi, soft jazz, ambient and more"
      />
      <NewsletterCard
        Icon={FiStar}
        title="Editor's Picks 🌟"
        subtitle="Our team&#39;s handpicked favorites"

      />
    </div>
  );
}
