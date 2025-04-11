import fs from "fs";
import path from "path";
import ejs from "ejs";
import nodemailer from "nodemailer";

const TEMPLATE_PATH = path.join(process.cwd(), "src", "templates", "newsletterTemplate.ejs");
const NEWSLETTER_DIR = path.join(process.cwd(), "public", "newsletters");

const getTopTracks = async () => {
  return [
    { title: "Blinding Lights", artist: "The Weeknd" },
    { title: "Levitating", artist: "Dua Lipa" },
    { title: "As It Was", artist: "Harry Styles" },
  ];
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,         // set in .env
    pass: process.env.EMAIL_PASS,     // set in .env
  },
});

const subscribers = ["lohithakoneru@gmail.com", "thanushgarimella@gmailcom"]; // fetch from DB or use a static array for now

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  try {
    const tracks = await getTopTracks();
    const html = await ejs.renderFile(TEMPLATE_PATH, { tracks });

    const fileName = `newsletter_${Date.now()}.html`;
    const outPath = path.join(NEWSLETTER_DIR, fileName);

    fs.writeFileSync(outPath, html);

    // ✅ Send email to each subscriber
    for (let email of subscribers) {
      await transporter.sendMail({
        from: `"Weekly Vibes" <${process.env.EMAIL_FROM}>`,
        to: email,
        subject: "🎧 Your Music Newsletter is Here!",
        html,
      });
    }

    return res.status(200).json({ message: "Newsletter generated and sent!", url: `/newsletters/${fileName}` });
  } catch (err) {
    return res.status(500).json({ error: "Failed to send newsletter", details: err.message });
  }
}
