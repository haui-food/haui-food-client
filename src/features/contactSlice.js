import { createSlice } from '@reduxjs/toolkit';
import { contactUs } from '~/apiService/contactService';

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    loading: false,
    contacts: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(contactUs.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.user = null;
        state.isLogin = null;
      })
      .addCase(contactUs.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
        state.isLogin = true;
      })
      .addCase(contactUs.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.error.message;
        state.isLogin = null;
      });
  },
});

export default contactSlice.reducer;
