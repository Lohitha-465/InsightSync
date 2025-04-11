// pages/api/login.js
import querystring from "querystring";

export default function handler(req, res) {
  const scopes = [
    "user-read-private",
    "user-read-email",
    "user-read-playback-state",
    "user-read-recently-played",
    "user-read-currently-playing",
    "user-modify-playback-state",
    "streaming",
    "app-remote-control",
    "playlist-read-private",
    "user-library-read",
    "user-top-read"
  ];
  

  const authUrl =
    "https://accounts.spotify.com/authorize?" +
    querystring.stringify({
      response_type: "code",
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope: scopes.join(" "),
      redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
      show_dialog: true,
      
    });
    console.log("Redirecting to Spotify URL:", authUrl); 

  res.redirect(authUrl);
}
