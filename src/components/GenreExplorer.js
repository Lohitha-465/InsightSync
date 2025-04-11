'use client';

import React, { useState } from 'react';
import {
  getTopArtistsByLanguage,
  getTopTracksByLanguage,
} from '../lib/lastfm';
import { searchSpotifyArtist, searchSpotifyTrack } from '../lib/spotify';
// import "../styles/genreExplorer.scss";


import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const SPOTIFY_ACCESS_TOKEN = "YOUR_SPOTIFY_ACCESS_TOKEN"; // Replace this!

const GenreExplorer = () => {
  const [language, setLanguage] = useState('');
  const [genre, setGenre] = useState('');
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!language) return;

    setLoading(true);
    setError('');
    setArtists([]);
    setTracks([]);

    try {
      const fetchedArtists = await getTopArtistsByLanguage(language);
      const fetchedTracks = await getTopTracksByLanguage(language);

      const spotifyArtists = await Promise.all(
        fetchedArtists.slice(0, 10).map(async (artist) => {
          const spotifyData = await searchSpotifyArtist(artist.name, SPOTIFY_ACCESS_TOKEN);
          return {
            ...artist,
            spotifyUrl: spotifyData?.external_urls?.spotify || null,
          };
        })
      );

      const spotifyTracks = await Promise.all(
        fetchedTracks.slice(0, 10).map(async (track) => {
          const spotifyData = await searchSpotifyTrack(track.name, track.artist?.name || '', SPOTIFY_ACCESS_TOKEN);
          return {
            ...track,
            spotifyUrl: spotifyData?.external_urls?.spotify || null,
          };
        })
      );

      setArtists(spotifyArtists);
      setTracks(spotifyTracks);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch data. Please try again.');
    }

    setLoading(false);
  };

  const greenShades = [
    '#11700E', '#198754', '#28a745', '#218838', '#1e7e34',
    '#20c997', '#38b000', '#2b9348', '#006400', '#4caf50',
  ];
  
  const getArtistPieData = () => ({
    labels: artists.map((a) => a.name),
    datasets: [
      {
        label: 'Top Artists',
        data: artists.map((_, i) => 10 - i),
        backgroundColor: artists.map((_, i) => greenShades[i % greenShades.length]),
      },
    ],
  });
  
  const getTrackPieData = () => ({
    labels: tracks.map((t) => t.name),
    datasets: [
      {
        label: 'Top Tracks',
        data: tracks.map((_, i) => 10 - i),
        backgroundColor: tracks.map((_, i) => greenShades[i % greenShades.length]),
      },
    ],
  });

  const languages = ['English', 'Hindi', 'Telugu', 'Tamil', 'Kannada', 'Malayalam'];
  const genres = ['Romance', 'Classical', 'Pop', 'Rock', 'Hip-hop', 'Mass', 'Melody'];

  return (
    <div className="genre-explorer" style={{ padding: '1rem' }}>
      <h2>🎧 Explore Music by Language & Genre</h2>

      <div className="selectors" style={{ marginBottom: '1rem' }}>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="">Select Language</option>
          {languages.map((lang, idx) => (
            <option key={idx} value={lang.toLowerCase()}>{lang}</option>
          ))}
        </select>

        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">Select Genre (Optional)</option>
          {genres.map((g, idx) => (
            <option key={idx} value={g.toLowerCase()}>{g}</option>
          ))}
        </select>

        <button onClick={handleSearch} style={{ marginLeft: '1rem' }}>
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {artists.length > 0 && (
        <div>
        <div style={{ marginTop: '2rem' }}>
            <h4>📊 Track Popularity Pie Chart</h4>
            <Pie data={getTrackPieData()} />
          {/* </div>
          <div style={{ marginTop: '2rem' }}> */}
            <h4>📊 Artist Popularity Pie Chart</h4>
            <Pie data={getArtistPieData()} />
          </div>
          <h3>🎤 Top Artists in {language.charAt(0).toUpperCase() + language.slice(1)}</h3>
          <table className="spotify-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Artist Name</th>
                <th>Spotify Link</th>
              </tr>
            </thead>
            <tbody>
              {artists.map((artist, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="black-text">{artist.name}</td>
                  <td>
                    {artist.spotifyUrl ? (
                      <a href={artist.spotifyUrl} target="_blank" rel="noopener noreferrer">
                        View on Spotify
                      </a>
                    ) : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>


        </div>
      )}

      {tracks.length > 0 && (
        <div>
          <h3 style={{ marginTop: '2rem' }}>🎵 Top Tracks in {language.charAt(0).toUpperCase() + language.slice(1)}</h3>
          <table className="spotify-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Track Name</th>
                <th>Artist</th>
                <th>Spotify Link</th>
              </tr>
            </thead>
            <tbody>
              {tracks.map((track, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className="black-text">{track.name}</td>
                  <td className="black-text">{track.artist?.name || 'Unknown'}</td>
                  <td>
                    {track.spotifyUrl ? (
                      <a href={track.spotifyUrl} target="_blank" rel="noopener noreferrer">
                        Listen on Spotify
                      </a>
                    ) : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>


        </div>
      )}
    </div>
  );
};

export default GenreExplorer;
