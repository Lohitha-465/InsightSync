// pages/_app.js
import '../styles/dashboard.scss'; // your global SCSS
   // optional: other global CSS files
   import "../styles/genreExplorer.scss";
   import "../styles/home.scss";
   import "../styles/sidebar.scss";
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
