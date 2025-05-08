// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@/features/auth/authSlice.js";
import projectsReducer from "@/features/projects/projectSlice.js";
import confettiSlice from "@/features/confettiSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    confetti: confettiSlice,
  },
});
