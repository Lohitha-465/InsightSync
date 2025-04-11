// src/lib/lastfm.js
const API_KEY = '60544ac288a310bb654cea3f6c28c817'; // Replace with your real key
const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';

export async function getTopArtistsByLanguage(language) {
  const res = await fetch(
    `${BASE_URL}?method=tag.gettopartists&tag=${language}&api_key=${API_KEY}&format=json`
  );
  const data = await res.json();
  return data.topartists?.artist || [];
}

export async function getTopTracksByLanguage(language) {
  const res = await fetch(
    `${BASE_URL}?method=tag.gettoptracks&tag=${language}&api_key=${API_KEY}&format=json`
  );
  const data = await res.json();
  return data.tracks?.track || [];
}
// src/lib/lastfm.js

export const fetchTopArtists = async () => {
  const res = await fetch('https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=YOUR_API_KEY&format=json');
  const data = await res.json();
  return data.artists.artist;
};
