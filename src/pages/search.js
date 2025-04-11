'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [tracks, setTracks] = useState([]);

  const searchTracks = async () => {
    const res = await fetch('/api/refresh'); // Refresh token first
    const refreshed = await res.json();

    const accessToken = refreshed.access_token;

    const response = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        q: query,
        type: 'track',
        limit: 10,
      },
    });

    setTracks(response.data.tracks.items);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🔍 Search Tracks</h2>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        style={{ padding: '0.5rem', marginRight: '1rem', width: '300px' }}
      />
      <button onClick={searchTracks}>Search</button>

      <div style={{ marginTop: '2rem' }}>
        {tracks.map((track) => (
          <div key={track.id} style={{ marginBottom: '1.5rem' }}>
            <strong>{track.name}</strong> by {track.artists[0]?.name}
            {track.preview_url ? (
              <audio controls src={track.preview_url} />
            ) : (
              <p>No preview available</p>
            )}
            <div>
              <a href={track.external_urls.spotify} target="_blank">Open in Spotify</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
