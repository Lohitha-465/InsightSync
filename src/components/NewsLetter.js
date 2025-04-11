import { useState } from "react";
import { FiSend, FiMusic, FiStar, FiHeadphones, FiAlertCircle } from "react-icons/fi";
import styles from "../styles/NewsLetter.module.scss"; // Adjust path as needed

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

function NewsCard({ title, description }) {
  return (
    <div className={styles.newsCard}>
      <div className={styles.newsIcon}>
        <FiAlertCircle />
      </div>
      <h4 className={styles.newsTitle}>{title}</h4>
      <p className={styles.newsDescription}>{description}</p>
    </div>
  );
}

export default function NewsletterGrids() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.sectionTitle}>🎶 Hot Music Updates</h2>
      <div className={styles.newsGrid}>
        <NewsCard
          title="Taylor Swift drops surprise album"
          description="‘Midnight Echoes’ tops global charts within hours of release!"
        />
        <NewsCard
          title="Drake x The Weeknd"
          description="A mysterious new collab drops this Friday — fans are hyped!"
        />
        <NewsCard
          title="Streaming record broken"
          description="Spotify hits 200 billion streams in a month — music is booming!"
        />
        <NewsCard
          title="AI genre takes over"
          description="‘HyperLofi’ — the AI-generated genre blowing up on TikTok."
        />
      </div>

      <h2 className={styles.sectionTitle}>💌 Subscribe to Our Newsletters</h2>
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
          subtitle="Our team's handpicked favorites"
        />
      </div>
    </div>
  );
}
