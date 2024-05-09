import { createAsyncThunk } from '@reduxjs/toolkit';
import { callApi } from './apiUtils';

export const addProductToCart = createAsyncThunk('addProductToCart', async (data, { rejectWithValue }) => {
  try {
    const response = await callApi('get', 'v1/carts/add-product', data);
    return response;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});
