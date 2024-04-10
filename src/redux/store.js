import { configureStore } from '@reduxjs/toolkit';
import authReducer from '~/features/authSlice.js';
import categoryReducer from '../features/categorySlice';
import userReducer from '../features/userSlice';
export default configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    user: userReducer,
  },
});
