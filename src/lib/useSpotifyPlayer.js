// lib/useSpotifyPlayer.js
import { useEffect, useState } from "react";

export default function useSpotifyPlayer(token) {
  const [player, setPlayer] = useState(null);
  const [deviceId, setDeviceId] = useState(null);

  useEffect(() => {
    if (!token) return;

    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const spotifyPlayer = new window.Spotify.Player({
        name: "My Web Player",
        getOAuthToken: (cb) => cb(token),
        volume: 0.8,
      });

      spotifyPlayer.addListener("ready", ({ device_id }) => {
        setDeviceId(device_id);
        console.log("Ready with Device ID", device_id);
      });

      spotifyPlayer.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      spotifyPlayer.connect();
      setPlayer(spotifyPlayer);
    };
  }, [token]);

  return { player, deviceId };
}
