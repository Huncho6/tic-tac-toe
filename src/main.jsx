import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import "react-toastify/dist/ReactToastify.css";
import AuthContextProvider from './context/AuthContext';  // Import the AuthContextProvider

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContextProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </AuthContextProvider>
  </BrowserRouter>
);