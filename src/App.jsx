import { Routes, Route, useLocation } from "react-router-dom";
import Auth from "./components/auth/Auth";
import Game from "./pages/Game";
import Profile from "./pages/Profile";
import ToggleButton from "./context/ToggleButton";
 // Import the ToggleButton

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith('/auth');  // Check if it's the auth page

  return (
    <>
      {/* Conditionally render the ToggleButton */}
      {!isAuthPage && <ToggleButton />}

      {/* Render your routes */}
      <Routes>
        <Route path="/auth/*" element={<Auth />} /> {/* Auth page */}
        <Route path="/" element={<Game />} />       {/* Main app page */}
        <Route path="/profile" element={<Profile />} />  {/* Profile page */}
      </Routes>
    </>
  );
}

export default App;
