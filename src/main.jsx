import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';  // Import Provider from react-redux
import App from './App.jsx';
import './index.css';
import "react-toastify/dist/ReactToastify.css";
import AuthContextProvider from './context/AuthContext';  // Import the AuthContextProvider
import store from './Redux/store';  // Import the Redux store

createRoot(document.getElementById('root')).render(
  <Provider store={store}>  {/* Wrap the app with Provider and pass the store */}
    <BrowserRouter>
      <AuthContextProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </AuthContextProvider>
    </BrowserRouter>
  </Provider>
);
