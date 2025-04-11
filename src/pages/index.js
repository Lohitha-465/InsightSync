// pages/index.js
import { parse } from 'cookie';
import Chatbot from "@/components/Chatbot";
import Dashboard from "@/components/Dashboard";
import NewsletterForm from "@/components/NewsletterForm";


// Server-side auth check
export async function getServerSideProps({ req }) {
  const cookies = parse(req.headers.cookie || '');
  console.log('🚀 Cookies:', cookies); // <- Add this
  const accessToken = cookies.spotify_access_token;

  if (!accessToken) {
    console.log('❌ No access token found in cookies. Redirecting to login...');
    return {
      redirect: {
        destination: '/api/login',
        permanent: false,
      },
    };
  }

  console.log('✅ Access token found. Rendering page.');

  return {
    props: {
      accessToken,
    },
  };
}

export default function Home({ accessToken }) {
  return (
    <div>
      <Dashboard accessToken={accessToken} />
      {/* You can add these back if needed */}
      {/* <NewsletterForm /> */}
      {/* <Chatbot /> */}
    </div>
  );
}