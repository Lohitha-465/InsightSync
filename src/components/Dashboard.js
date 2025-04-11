import { useEffect, useState } from "react";
import Image from "next/image";
import {
  getTopTracks,
  getTopArtists,
  getRecentlyPlayed,
  getUserPlaylists,
  getNewReleases,
} from "../lib/spotify";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
// import "../styles/home.scss";
import useSpotifyPlayer from "../lib/useSpotifyPlayer";
import playTrack from "../lib/playTrack";

export default function Dashboard() {
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [newReleases, setNewReleases] = useState([]);
  const [token, setToken] = useState(null);
  const { player, deviceId } = useSpotifyPlayer(token);

  useEffect(() => {
    async function fetchData() {
      const userToken = localStorage.getItem("spotify_access_token");
      setToken(userToken);

      setTopTracks(await getTopTracks(50));
      setTopArtists(await getTopArtists(20));
      setRecentlyPlayed(await getRecentlyPlayed());
      setPlaylists(await getUserPlaylists());
      setNewReleases(await getNewReleases());
    }
    fetchData();
  }, []);

  const renderGrid = (title, items, isArtist = false) => (
    <section className="spotify-section">
      <h2>{title}</h2>
      <div className="track-grid">
        {items.map((item, index) => (
          <div
            key={index}
            className="track-card"
            onClick={() => {
              if (!isArtist && item.uri && token && deviceId) {
                playTrack(token, deviceId, item.uri);
              }
            }}
          >
            <Image
              src={
                item.album?.images?.[0]?.url ||
                item.images?.[0]?.url ||
                "https://via.placeholder.com/300"
              }
              alt={item.name}
              width={300}
              height={300}
              className="track-img"
              style={{ objectFit: "cover" }}
            />
            <h4>{item.name}</h4>
            <p>
              {item.artists
                ? item.artists.map((a) => a.name).join(", ")
                : item.owner?.display_name || "Spotify"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content bg-black text-white">
        <Navbar />
        {renderGrid("Top Tracks", topTracks)}
        {renderGrid("Top Artists", topArtists, true)}
        {renderGrid("Recently Played", recentlyPlayed)}
        {renderGrid("Your Playlists", playlists)}
        {renderGrid("New Releases", newReleases)}
      </main>
    </div>
  );
}
