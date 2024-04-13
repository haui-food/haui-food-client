import { createAsyncThunk } from '@reduxjs/toolkit';
import hostname from '~/utils/http';
import axios from 'axios';


export const updateUserById = createAsyncThunk('user/updateById', async ({ userData, avatar }) => {
  try {
    console.log(`${hostname}/v1/auth/me`);

    // Tạo một đối tượng FormData
    const formData = new FormData();

    // Thêm dữ liệu người dùng vào formData
    Object.keys(userData).forEach((key) => {
      formData.append(key, userData[key]);
    });

    // Thêm ảnh vào formData
    if (avatar) {
      formData.append('avatar', avatar);
    }

    const req = await axios.put(`${hostname}/v1/auth/me`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set header 'Content-Type' là multipart/form-data
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
      },
    });
    const res = req.data.data;
    // console.log(res);
    return res;
  } catch (error) {
    throw error.response !== null ? new Error(error.response.data.message) : new Error('Đã xảy ra lỗi không mong đợi');
  }
});

export const getUser = createAsyncThunk('user/getUser', async () => {
  try {
    console.log(`${hostname}/v1/auth/me`);

    const req = await axios.get(`${hostname}/v1/auth/me`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
      },
    });
    const res = req.data.data;

    return res;
  } catch (error) {
    throw error.response !== null ? new Error(error.response.data.message) : new Error('Đã xảy ra lỗi không mong đợi');
  }
});
