import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser, clearError, changePassword, getSecretKey } from '~/apiService/authService';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    user: null,
    error: null,
    isLogin: null,
    status: null,
    secretKey: '',
    message: '',
    secretStatus: null,
  },

  reducers: {
    reFreshStatus: (state) => {
      state.status = null;
      state.secretStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // get secret key
      .addCase(getSecretKey.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSecretKey.fulfilled, (state, action) => {
        state.loading = false;
        state.secretKey = action.payload.data.secret;
        state.secretStatus = action.payload.code;
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(getSecretKey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.secretStatus = action.payload.code;
      })

      // change password
      .addCase(changePassword.pending, (state) => {
        console.log('change password Pending');
        state.loading = true;
        state.error = null;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        console.log('change password fulfilled', action.payload);
        state.loading = false;
        state.status = action.payload.code || action.payload.status;
        console.log(action.payload.code || action.payload.error);
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        console.log('change password rejected', typeof action.error);
        state.status = action.error.status;
        state.error = action.error.message;
      })

      // login
      .addCase(loginUser.pending, (state) => {
        console.log('Pending');
        state.loading = true;
        state.error = null;
        state.user = null;
        state.isLogin = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log('Fulfilled');
        console.log(action.payload);
        state.loading = false;
        state.user = action.payload.data.user;
        state.error = null;
        state.isLogin = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log('Rejected');
        console.log(action.payload);
        state.loading = false;
        state.user = null;
        state.error = action.payload.message;
        state.isLogin = null;
      })

      // register
      .addCase(registerUser.pending, (state) => {
        console.log('Registered');
        state.loading = true;
        state.user = null;
        state.error = null;
        state.isLogin = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log('Registered');
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        state.isLogin = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log('Registered');
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

export const { reFreshStatus } = authSlice.actions;
export default authSlice.reducer;
