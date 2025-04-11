// pages/login.js
const Login = () => {
    const handleLogin = () => {
      window.location.href = '/api/login'; // redirect to the API route
    };
  
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-6">Login with Spotify</h1>
        <button
          onClick={handleLogin}
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Connect Spotify
        </button>
      </div>
    );
  };
  
  export default Login;
  