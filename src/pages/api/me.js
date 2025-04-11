import cookie from 'cookie';

export default async function handler(req, res) {
  const cookies = cookie.parse(req.headers.cookie || '');
  const token = cookies.spotify_access_token;

  if (!token) {
    console.error('❌ No access token found in cookies');
    return res.status(401).json({ error: 'No access token in cookies' });
  }

  try {
    const spotifyRes = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('➡️ Spotify status:', spotifyRes.status);

    if (!spotifyRes.ok) {
      const err = await spotifyRes.json();
      console.error('❌ Spotify error:', err);
      return res.status(spotifyRes.status).json({ error: err });
    }

    const data = await spotifyRes.json();
    console.log('✅ Spotify user:', data);
    return res.status(200).json(data);
  } catch (error) {
    console.error('❌ Fetch exception:', error);
    return res.status(500).json({ error: 'Failed to fetch Spotify user' });
  }
}
