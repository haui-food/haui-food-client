import { createSlice } from '@reduxjs/toolkit';
import { getRestaurants } from '~/apiService/restaurantService';

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState: {
    restaurants: null,
    loading: null,
    error: null,
  },

  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.restaurants = null;
      })
      .addCase(getRestaurants.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.loading = false;
        state.restaurants = action.data;
        state.error = null;
      })
      .addCase(getRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.restaurants = null;
        state.error = action.error.message;
      });
  },
});
// export const { setCategoryClicked } = categorySlice.actions;
export default restaurantSlice.reducer;
