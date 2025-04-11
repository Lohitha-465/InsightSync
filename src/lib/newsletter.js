import nodemailer from "nodemailer";

export const sendNewsletter = async (email, content) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Weekly Spotify Newsletter",
    html: content,
  });
};
