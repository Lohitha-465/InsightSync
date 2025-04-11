import axios from "axios";
import cron from "node-cron";

// Schedule to run every hour
cron.schedule("0 * * * *", async () => {
  console.log("⏰ Generating hourly newsletter...");
  try {
    const res = await axios.post("http://localhost:3000/api/sendNL");
    console.log("✅ Created:", res.data.url);
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
});
