import { useEffect, useState } from 'react';
import { getTopArtistsByLanguage, getTopTracksByLanguage } from '../lib/lastfm';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import NewsLetter from '../components/NewsLetter';

const languages = ['english', 'hindi', 'telugu', 'tamil', 'korean', 'japanese'];

export default function Suggest() {
  const [language, setLanguage] = useState('english');
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const topArtists = await getTopArtistsByLanguage(language);
      const topTracks = await getTopTracksByLanguage(language);
      setArtists(topArtists.slice(0, 5));
      setTracks(topTracks.slice(0, 5));
    }
    fetchData();
  }, [language]);

  return (
    <div className="dashboard" style={{ display: 'flex' }}>
      <Sidebar />
      <div className="main-content" style={{ flex: 1 }}>
        <Navbar />
        <div className="content p-4">
          <NewsLetter />
          {/* You can also display artists and tracks here if needed */}
        </div>
      </div>
    </div>
  );
}
