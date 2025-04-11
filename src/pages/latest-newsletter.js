import fs from "fs";
import path from "path";

export async function getServerSideProps() {
  const dir = path.join(process.cwd(), "public", "newsletters");
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".html"));
  const latest = files.sort((a, b) => b.localeCompare(a))[0];

  return {
    props: {
      file: latest || null,
    },
  };
}

export default function LatestNewsletter({ file }) {
  if (!file) return <p>No newsletters found.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>📰 Latest Newsletter</h2>
      <iframe
        src={`/newsletters/${file}`}
        style={{ width: "100%", height: "80vh", border: "1px solid #ccc", borderRadius: "8px" }}
      />
    </div>
  );
}
