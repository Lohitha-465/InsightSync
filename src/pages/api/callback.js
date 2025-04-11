import querystring from 'querystring';
import axios from 'axios';
import { serialize } from 'cookie'; // Correct modern import syntax

export default async function handler(req, res) {
  const { code, error: spotifyError } = req.query;

  // Handle Spotify auth errors
  if (spotifyError) {
    console.error('Spotify auth error:', spotifyError);
    return res.redirect(`/?error=${encodeURIComponent(spotifyError)}`);
  }

  if (!code) {
    return res.status(400).json({ error: 'Missing authorization code' });
  }

  try {
    // Exchange code for tokens
    const tokenResponse = await axios.post(
      'https://accounts.spotify.com/api/token',
      querystring.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token, refresh_token, expires_in } = tokenResponse.data;

    // Set cookies - production-safe configuration
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
      maxAge: expires_in * 1000, // Convert to milliseconds
    };

    res.setHeader('Set-Cookie', [
      serialize('spotify_access_token', access_token, cookieOptions),
      serialize('spotify_refresh_token', refresh_token, {
        ...cookieOptions,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
      }),
    ]);

    return res.redirect('/');

  } catch (error) {
    console.error('Full OAuth error:', {
      message: error.message,
      response: error.response?.data,
      stack: error.stack,
    });

    return res.redirect(`/?error=${encodeURIComponent('Authentication failed')}`);
  }
}