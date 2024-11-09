import { configureStore } from "@reduxjs/toolkit";
import themeReducer from '../Redux/features/theme/themeSlice';  // Adjust the path to point to where themeSlice is located

export const store = configureStore({
  reducer: {
    theme: themeReducer,  // Now themeReducer is correctly imported
  },
});

export default store;
