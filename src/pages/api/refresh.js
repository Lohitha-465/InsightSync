// pages/api/refresh_token.js
import cookie from 'cookie';

export default async function handler(req, res) {
  const cookies = cookie.parse(req.headers.cookie || '');
  const refreshToken = cookies.refresh_token;

  if (!refreshToken) {
    return res.status(400).json({ error: 'Missing refresh token' });
  }

  const authOptions = {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  };

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', authOptions);
    const data = await response.json();

    if (data.error) {
      return res.status(400).json({ error: data.error_description });
    }

    // Update access_token in cookie
    res.setHeader('Set-Cookie', cookie.serialize('access_token', data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: data.expires_in,
      path: '/',
    }));

    res.status(200).json({ access_token: data.access_token });
  } catch (err) {
    console.error('Error refreshing token:', err);
    res.status(500).json({ error: 'Failed to refresh token' });
  }
}
