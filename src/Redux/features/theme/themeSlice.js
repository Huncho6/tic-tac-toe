import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDarkMode: false,  // Initial theme state, you can change it if needed
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;  // Toggling the theme
    },
    setTheme: (state, action) => {
      state.isDarkMode = action.payload;     // Explicitly setting the theme
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
