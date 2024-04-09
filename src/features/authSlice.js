import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser, clearError } from '~/apiService/authService';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    user: null,
    error: null,
    isLogin: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        console.log("Pending")
        state.loading = true;
        state.error = null;
        state.user = null;
        state.isLogin = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("Fulfilled")
        console.log(action.payload.user);
        state.loading = false;
        state.user = action.payload.user;
        state.error = null;
        state.isLogin = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log("Rejected")
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
        state.isLogin = null;

      })
      .addCase(registerUser.pending, (state) => {
        console.log("Registered");
        state.loading = true;
        state.user = null;
        state.error = null;
        state.isLogin = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log("Registered");
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        state.isLogin = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log("Registered");
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
        state.isLogin = null;
      })
      .addCase(clearError.fulfilled, (state) => {
        state.error = null;
      });
  },
});

export default authSlice.reducer;
