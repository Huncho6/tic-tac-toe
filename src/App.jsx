import { Routes, Route } from "react-router-dom";
import Auth from "./components/auth/Auth";
import Home from "./pages/Home";


function App() {
  return (
    <Routes>
      <Route path="/auth/*" element={<Auth />} /> {/* Nested routes for auth */}
      <Route path="/" element={<Home />} /> {/* Main app page */}
    </Routes>
  );
}

export default App;
