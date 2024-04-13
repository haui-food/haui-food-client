import { createSlice } from '@reduxjs/toolkit';
import { updateUserById, getUser } from '~/apiService/userService';
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: null,
    error: null,
    isUpdate: false,
  },

  reducers: {},
  extraReducers(builder) {
    builder
      // update user
      .addCase(updateUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isUpdate = true;
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isUpdate = true;
      })
      .addCase(updateUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isUpdate = true;
      })

      // get user
      .addCase(getUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      
  },
});
// export const { setCategoryClicked } = categorySlice.actions;
export default userSlice.reducer;
