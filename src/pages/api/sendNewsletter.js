export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { email, content } = req.body;

    if (!email || !content) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Example: Send email logic (Replace with your actual email sending logic)
    console.log(`Sending newsletter to: ${email}`);
    console.log("Newsletter content:", content);

    return res.status(200).json({ success: true, message: "Newsletter sent!" });
  } catch (error) {
    console.error("Error sending newsletter:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
