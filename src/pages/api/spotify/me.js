// pages/api/spotify/me.js
export default async function handler(req, res) {
  const refreshToken = req.cookies['spotify_refresh_token']; // Adjust key based on storage
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!refreshToken) {
    return res.status(401).json({ error: "Not authenticated - No refresh token" });
  }

  try {
    // Step 1: Get new access token using refresh token
    const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      return res.status(tokenResponse.status).json({ error: "Failed to refresh token", details: tokenData });
    }

    const accessToken = tokenData.access_token;

    // Step 2: Use the new access token to fetch user data
    const userResponse = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!userResponse.ok) {
      return res.status(userResponse.status).json({ error: "Failed to fetch Spotify user" });
    }

    const userData = await userResponse.json();
    return res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching Spotify user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
