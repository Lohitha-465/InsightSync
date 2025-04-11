import cookie from 'cookie';

export default function handler(req, res) {
    res.setHeader("Set-Cookie", [
      "spotify_access_token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Lax",
    ]);
    res.status(200).json({ message: "Logged out successfully" });
  }
  