// lib/playTrack.js
const playTrack = async (token, deviceId, trackUri) => {
    try {
      const res = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: "PUT",
        body: JSON.stringify({
          uris: [trackUri],
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (!res.ok) {
        console.error("Error playing track:", await res.json());
      }
    } catch (err) {
      console.error("Playback error:", err);
    }
  };
  
  export default playTrack;
  