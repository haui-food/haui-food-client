import { createAsyncThunk } from '@reduxjs/toolkit';
import hostname from '~/utils/http';
import axios from 'axios';

export const updateUserById = createAsyncThunk('user/updateById', async ( {userId, userData}) => {
  try {
    console.log(`${hostname}/v1/users/${userId}`);
    const req = await axios.put(`${hostname}/v1/users/${userId}`,userData);
    const res = req.data.data;
    // console.log(res);
    return res;
  } catch (error) {
    throw error.response !== null ? new Error(error.response.data.message) : new Error('Đã xảy ra lỗi không mong đợi');
  }
});
