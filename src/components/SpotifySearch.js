'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const SpotifyPage = () => {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [query, setQuery] = useState('');
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    if (router.isReady) {
      const { access_token } = router.query;
      if (!access_token) {
        router.push('/api/login'); // redirect to login
      } else {
        setToken(access_token);
      }
    }
  }, [router.isReady]);

  const searchSpotify = async () => {
    if (!query || !token) return;

    try {
      const res = await axios.get('https://api.spotify.com/v1/search', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: query,
          type: 'track',
          limit: 10,
        },
      });

      setTracks(res.data.tracks.items);
    } catch (err) {
      console.error('Search failed', err.response?.data || err.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🎧 Search & Play Spotify Tracks</h2>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a song..."
        style={{ padding: '8px', width: '250px', marginRight: '10px' }}
      />
      <button onClick={searchSpotify} style={{ padding: '8px 16px' }}>
        Search
      </button>

      {tracks.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          {tracks.map((track) => (
            <div key={track.id} style={{ marginBottom: '20px' }}>
              <strong>{track.name}</strong> by {track.artists.map(a => a.name).join(', ')}
              <div>
                {track.preview_url ? (
                  <audio controls src={track.preview_url} style={{ marginTop: '10px' }} />
                ) : (
                  <p>No preview available</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SpotifyPage;
