import { createAsyncThunk } from '@reduxjs/toolkit';
import hostname from '~/utils/http';
import axios from 'axios';

export const loginUser = createAsyncThunk('auth/login', async (userCredentials) => {
  try {
    const req = await axios.post(`${hostname}/v1/auth/login`, userCredentials);
    const res = req.data.data;
    localStorage.setItem('accessToken', JSON.stringify(res.accessToken));
    localStorage.setItem('refreshToken', JSON.stringify(res.refreshToken));
    localStorage.setItem('user', JSON.stringify(res.user));
    return res;
  } catch (error) {
    console.log(error);
    throw error.response !== null ? new Error(error.response.data.message) : new Error('Đã xảy ra lỗi không mong đợi');
  }
});

export const registerUser = createAsyncThunk('auth/signup', async (userCredentials) => {
  try {
    const req = await axios.post(`${hostname}/v1/auth/register`, userCredentials);
    const res = await req.data.data;

    return res;
  } catch (error) {
    throw error.response !== null ? new Error(error.response.data.message) : new Error('Đã xảy ra lỗi không mong đợi');
  }
});

export const changePassword = createAsyncThunk('auth/change-password', async (userData) => {
  try {
    const req = await axios.post(`${hostname}/v1/auth/change-password`, userData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
      },
    });
    const res = await req.data;
    return res;
  } catch (error) {
    console.log(error);
    if (error.response)
      return {
        message: error.response.data.message,
        status: error.response.data.code,
      };
    throw new Error('Đã xảy ra lỗi không mong đợi');
  }
});

export const clearError = createAsyncThunk('auth/clearError', async () => {});
