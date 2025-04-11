import { useEffect, useState } from "react";
import {
  getUserGenres,
  getTopArtists,
  getTopTracks,
  getActiveHours,
} from "../lib/spotify";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  Bar as ChartBar,
  Line as ChartLine,
  Doughnut,
  Pie as ChartPie,
  Radar,
  PolarArea,
  Scatter,
  Bubble,
} from "react-chartjs-2";
import "chart.js/auto";
import Navbar from "../components/Navbar";

import Sidebar from "../components/Sidebar";

import "../styles/chart.module.scss";



export default function Charts() {
  const [genres, setGenres] = useState([]);
  const [artists, setArtists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [activeHours, setActiveHours] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setGenres(await getUserGenres());
      setArtists(await getTopArtists());
      setTracks(await getTopTracks());
      setActiveHours(await getActiveHours());
    }
    fetchData();
  }, []);

  const COLORS = [
    "#33FF57", // vibrant green (mirror of #FF5733)
    "#A3FF33", // yellow-green (variant of #FFC300)
    "#A6F7DA", // mint green (flip of #DAF7A6)
    "#039C00", // deep green (analogous to #C70039)
    "#0C9040", // forest green (variant of #900C3F)
  ];  

  const trackData = tracks.length
    ? tracks.map((track) => ({ name: track.name, popularity: track.popularity }))
    : [{ name: "No Data", popularity: 0 }];

  const artistData = artists.length
    ? artists.map((artist) => ({ name: artist.name, followers: artist.followers.total }))
    : [{ name: "No Data", followers: 0 }];

  return (
    <div className="dashboard">
      <Sidebar />
      <main className="main-content">
        <Navbar />

        <h2>📊 Listening Insights</h2>
        <div className="charts-grid">
          {/* ✅ Chart.js Charts */}
          <div className="chart-card">
            <h3>📈 Top Tracks (Popularity)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={trackData}>
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#fff" }} />
                <YAxis tick={{ fill: "#fff" }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="popularity" fill="#11700E" />
              </BarChart>
            

            </ResponsiveContainer>
            <p>This bar chart displays your most popular tracks based on Spotify’s popularity metric.</p>
            <p>Higher values indicate greater streaming and user engagement.</p>
          </div>

          {/* Pie Chart for Followers */}
          <div className="chart-card">
            <h3>👥 Top Artists (Followers)</h3>
            <ResponsiveContainer width={300} height={300}>
              <PieChart>
                <Pie
                  data={artistData}
                  dataKey="followers"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                >
                  {artistData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
              

            </ResponsiveContainer>
            <p>This pie chart shows the follower distribution of your top artists.</p>
<p>The bigger the slice, the more followers that artist has.</p>
          </div>

          {/* Line Chart for Follower Trends */}
          <div className="chart-card">
            <h3>📉 Follower Trends</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={artistData}>
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#fff" }} />
                <YAxis tick={{ fill: "#fff" }} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="followers"
                  stroke="#11700E"
                  strokeWidth={2}
                />
              </LineChart>
              

            </ResponsiveContainer>
            <p>This line chart visualizes the follower trends across your top artists.</p>
<p>Use this to compare popularity patterns between different artists.</p>
          </div>

          {/* Bar Chart for Followers */}
          <div className="chart-card">
            <h3>📊 Top Artists (Bar - Followers)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={artistData}>
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#fff" }} />
                <YAxis tick={{ fill: "#fff" }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="followers" fill="#11700E" />
              </BarChart>
              

            </ResponsiveContainer>
            <p>This bar chart highlights how many followers each of your top artists has.</p>
<p>It provides a comparative view of artist reach and popularity.</p>
          </div>
          {/* 🎼 Favorite Genres */}
          <div className="chart-card">
            <h3>🎼 Favorite Genres</h3>
            <ChartBar
              data={{
                labels: genres.map((g) => g.genre),
                datasets: [
                  {
                    label: "Top Genres",
                    data: genres.map((g) => g.count),
                    backgroundColor: "#11700E",
                  },
                ],
              }}
            />
            <p>This bar chart shows your favorite music genres by listening count.</p>
<p>More bars indicate higher listening frequency for those genres.</p>

          </div>

          {/* 🎵 Top Artists */}
          <div className="chart-card">
            <h3>🎵 Top Artists</h3>
            <Doughnut
              data={{
                labels: artists.map((a) => a.name),
                datasets: [
                  {
                    data: artists.map((a) => a.followers.total),
                    backgroundColor: ["#0F5C0B", "#11700E", "#1B8A16"]

                  },
                ],
              }}
            />
            <p>This doughnut chart visualizes how your listening is spread across top artists.</p>
<p>The size of each segment shows the relative artist prominence.</p>

          </div>

          {/* 🔥 Top Tracks */}
          <div className="chart-card">
            <h3>🔥 Top Tracks</h3>
            <ChartPie
              data={{
                labels: tracks.map((t) => t.name),
                datasets: [
                  {
                    data: tracks.map((t) => t.popularity),
                    backgroundColor: ["#0F5C0B", "#11700E", "#1B8A16"]

                  },
                ],
              }}
            />
            <p>This pie chart compares the popularity of your top tracks.</p>
<p>Each slice represents a track, sized by its popularity score.</p>


          </div>
{/* 
          ⏳ Listening Hours
          <div className="chart-card">
            <h3>⏳ Listening Hours</h3>
            <ChartLine
              data={{
                labels: activeHours.map((_, i) => `Hour ${i}`),
                datasets: [
                  {
                    label: "Activity",
                    data: activeHours,
                    borderColor: "#11700E",
                  },
                ],
              }}
            />
          </div> */}

          {/* 🎧 Listening Patterns (Radar) */}
          <div className="chart-card">
            <h3>🎧 Listening Patterns</h3>
            <Radar
              data={{
                labels: genres.map((g) => g.genre),
                datasets: [
                  {
                    label: "Listening Distribution",
                    data: genres.map((g) => g.count),
                    backgroundColor: "#11700E",
                  },
                ],
              }}
            />
            <p>This radar chart illustrates how your listening habits are distributed across genres.</p>
<p>Spikes show genres you’ve listened to more frequently.</p>

          </div>

          {/* 🎤 Artist Popularity (Polar Area) */}
          <div className="chart-card">
            <h3>🎤 Artist Popularity</h3>
            <PolarArea
              data={{
                labels: artists.map((a) => a.name),
                datasets: [
                  {
                    data: artists.map((a) => a.followers.total),
                    backgroundColor: ["#0F5C0B", "#11700E", "#1B8A16"]

                  },
                ],
              }}
            />
            <p>This polar area chart shows the popularity of your top artists.</p>
<p>Wider segments indicate more followers and broader appeal.</p>

          </div>

          {/* 📊 Track Popularity Scatter */}
          <div className="chart-card">
            <h3>📊 Track Popularity</h3>
            <Scatter
              data={{
                datasets: [
                  {
                    label: "Tracks",
                    data: tracks.map((t) => ({
                      x: t.popularity,
                      y: Math.random() * 100,
                    })),
                    backgroundColor: "#11700E",
                  },
                ],
              }}
            />
            <p>This scatter plot gives a random visual distribution of track popularity.</p>
<p>X-axis is the popularity; Y-axis is randomized for spread.</p>

          </div>

          {/* 🔊 Bubble Chart - Track Features */}
          <div className="chart-card">
            <h3>🔊 Bubble Chart - Track Features</h3>
            <Bubble
              data={{
                datasets: [
                  {
                    label: "Tracks",
                    data: tracks.map((t) => ({
                      x: t.popularity,
                      y: Math.random() * 100,
                      r: Math.random() * 10,
                    })),
                    backgroundColor: "#11700E",
                  },
                ],
              }}
            />
            <p>This bubble chart visualizes track popularity on the X-axis and a randomized metric on the Y-axis, with bubble size representing another random value. It provides a quick overview of how tracks vary in popularity and distribution.







4o

</p>
          </div>

          {/* ✅ Recharts Section */}

        
        </div>
      </main>
    </div>
  );
}
