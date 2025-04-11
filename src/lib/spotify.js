import axios from "axios";

// ✅ Your Spotify API Credentials
const client_id = "bde87616cf174b4b92f2d43aec755078";
const client_secret = "2ffd4713770742988593d65edd1a699a";
const refresh_token =
  "AQDkKkNUwDBoi2xCtBBppR_3G-jRLTu2_d2W-EhVi1i0mFEM9D3t1bOKdXEHWwV0nGd7se0MHj5xHRP9wrV6m7GEOHtgkJVoVqS58F_mPnoTClIscm-gNdElYktWHR4jUwI";

// ✅ Get a new access token using the refresh token
const getAccessToken = async () => {
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token,
        client_id,
        client_secret,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("❌ Error getting access token:", error.response?.data || error);
    return null;
  }
};
export const getArtistTopTracks = async (artistId) => {
  const accessToken = await getAccessToken();
  if (!accessToken) return [];

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data.tracks;
  } catch (error) {
    console.error("❌ Error fetching artist's top tracks:", error.response?.data || error);
    return [];
  }
};
export const getTrackAudioFeatures = async (trackId) => {
  const accessToken = await getAccessToken();
  if (!accessToken) return null;

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/audio-features/${trackId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching audio features:", error.response?.data || error);
    return null;
  }
};

// ✅ Fetch Top Tracks
export const getTopTracks = async () => {
  const accessToken = await getAccessToken();
  if (!accessToken) return [];

  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks?limit=10",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    return response.data.items;
  } catch (error) {
    console.error("❌ Error fetching top tracks:", error.response?.data || error);
    return [];
  }
};
export const getRecentlyPlayed = async () => {
  const accessToken = await getAccessToken();
  if (!accessToken) return [];

  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/recently-played?limit=50",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    return response.data.items;
  } catch (error) {
    console.error("❌ Error fetching recently played tracks:", error.response?.data || error);
    return [];
  }
};

export const getUserPlaylists = async () => {
  const accessToken = await getAccessToken();
  if (!accessToken) return [];

  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/playlists?limit=15",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data.items;
  } catch (error) {
    console.error("❌ Error fetching user playlists:", error.response?.data || error);
    return [];
  }
};

export const getNewReleases = async () => {
  const accessToken = await getAccessToken();
  if (!accessToken) return [];

  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/browse/new-releases?limit=50",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    return response.data.albums.items;
  } catch (error) {
    console.error("❌ Error fetching new releases:", error.response?.data || error);
    return [];
  }
};


// ✅ Fetch Top Artists
export const getTopArtists = async () => {
  const accessToken = await getAccessToken();
  if (!accessToken) return [];

  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/top/artists?limit=10",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    return response.data.items;
  } catch (error) {
    console.error("❌ Error fetching top artists:", error.response?.data || error);
    return [];
  }
};

// ✅ Get User's Favorite Genres
export const getUserGenres = async () => {
  const accessToken = await getAccessToken();
  if (!accessToken) return [];

  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/top/artists?limit=20",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const genreCounts = {};
    response.data.items.forEach((artist) => {
      artist.genres.forEach((genre) => {
        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
      });
    });

    return Object.entries(genreCounts)
      .map(([genre, count]) => ({ genre, count }))
      .sort((a, b) => b.count - a.count);
  } catch (error) {
    console.error("❌ Error fetching user genres:", error.response?.data || error);
    return [];
  }
};

// ✅ Get Active Hours
export const getActiveHours = async () => {
  const accessToken = await getAccessToken();
  if (!accessToken) return [];

  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/recently-played?limit=50",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const activeHours = {};
    response.data.items.forEach((item) => {
      const hour = new Date(item.played_at).getHours();
      activeHours[hour] = (activeHours[hour] || 0) + 1;
    });

    return Object.entries(activeHours).map(([hour, plays]) => ({
      hour: `${hour}:00`,
      plays,
    }));
  } catch (error) {
    console.error("❌ Error fetching active hours:", error.response?.data || error);
    return [];
  }
};

// ✅ Get Listening History
export const getListeningHistory = async () => {
  const accessToken = await getAccessToken();
  if (!accessToken) return [];

  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/recently-played?limit=10",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    return response.data.items.map((item) => ({
      track: item.track.name,
      artist: item.track.artists.map((a) => a.name).join(", "),
      played_at: item.played_at,
    }));
  } catch (error) {
    console.error("❌ Error fetching listening history:", error.response?.data || error);
    return [];
  }
};

// ✅ Get Listening Summary
export const getListeningSummary = async () => {
  const accessToken = await getAccessToken();
  if (!accessToken) return { totalPlays: 0, uniqueTracks: 0, uniqueArtists: 0 };

  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/recently-played?limit=50",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const tracks = new Set();
    const artists = new Set();

    response.data.items.forEach((item) => {
      tracks.add(item.track.id);
      item.track.artists.forEach((artist) => artists.add(artist.id));
    });

    return {
      totalPlays: response.data.items.length,
      uniqueTracks: tracks.size,
      uniqueArtists: artists.size,
    };
  } catch (error) {
    console.error("❌ Error fetching listening summary:", error.response?.data || error);
    return { totalPlays: 0, uniqueTracks: 0, uniqueArtists: 0 };
  }
};

// ✅ Search Artist by Name
export const searchSpotifyArtist = async (artistName) => {
  const accessToken = await getAccessToken();
  if (!accessToken) return null;

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist&limit=1`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    return response.data.artists.items[0] || null;
  } catch (error) {
    console.error("❌ Error searching artist:", error.response?.data || error);
    return null;
  }
};

// ✅ Search Track by Name
export const searchSpotifyTrack = async (trackName) => {
  const accessToken = await getAccessToken();
  if (!accessToken) return null;

  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(trackName)}&type=track&limit=1`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    return response.data.tracks.items[0] || null;
  } catch (error) {
    console.error("❌ Error searching track:", error.response?.data || error);
    return null;
  }
};
export async function playTrack(token, trackUri) {
  const res = await fetch("https://api.spotify.com/v1/me/player/play", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uris: [trackUri],
    }),
  });

  if (!res.ok) {
    console.error("Failed to play track", await res.text());
  }

  return res.status;
}

