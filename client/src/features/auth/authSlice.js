// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  signInUser,
  checkAuth,
  logoutUser,
  updateAvatarSeed,
} from "./authThunks.js";

const initialState = {
  user: {
    id: null,
    username: null,
    email: null,
    role: null,
    avatarSeed: "",
  },
  status: "idle",
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle sign in
    builder
      .addCase(signInUser.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "succeeded";
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.isAuthenticated = false;
        state.user = state.initialState.user;
        state.error = action.payload || action.error.message;
      })

      // Handle auth check (e.g. on initial load with HttpOnly cookie)
      .addCase(checkAuth.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        console.log("checkauth action payload", action.payload);

        state.loading = false;
        state.status = "succeeded";
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.status = "unauthenticated";
        state.isAuthenticated = false;
        state.user = initialState.user;
        state.error = action.payload || action.error.message;
      })

      // Handle logout
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "idle";
        state.loading = false;
        state.isAuthenticated = false;
        state.user = initialState.user;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      //handle avatar
      // Handle avatar seed update
      .addCase(updateAvatarSeed.pending, (state) => {
        state.status = "updating_avatar";
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAvatarSeed.fulfilled, (state, action) => {
        console.log("avatar", action.payload.avatarSeed.avatarSeed);

        state.loading = false;
        state.status = "avatar_updated";
        state.user.avatarSeed = action.payload.avatarSeed.avatarSeed;
        state.error = null;
      })
      .addCase(updateAvatarSeed.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default authSlice.reducer;
