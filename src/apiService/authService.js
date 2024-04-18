import { createAsyncThunk } from '@reduxjs/toolkit';
import hostname from '~/utils/http';
import axios from 'axios';
import { callApi } from './apiUtils';

// export const loginUser = createAsyncThunk('auth/login', async (userCredentials) => {
//   try {
//     const req = await axios.post(`${hostname}/v1/auth/login`, userCredentials);
//     const res = req.data.data;
//     localStorage.setItem('accessToken', JSON.stringify(res.accessToken));
//     localStorage.setItem('refreshToken', JSON.stringify(res.refreshToken));
//     localStorage.setItem('user', JSON.stringify(res.user));
//     return res;
//   } catch (error) {
//     console.log(error);
//     throw error.response !== null ? new Error(error.response.data.message) : new Error('Đã xảy ra lỗi không mong đợi');
//   }
// });

export const loginUser = createAsyncThunk('auth/login', async (userCredentials, { rejectWithValue }) => {
  try {
    const res = await callApi('POST', '/v1/auth/login', null, userCredentials);
    console.log(res);
    localStorage.setItem('accessToken', JSON.stringify(res.data.accessToken));
    localStorage.setItem('refreshToken', JSON.stringify(res.data.refreshToken));
    localStorage.setItem('user', JSON.stringify(res.data.user));
    return res;
  } catch (error) {
    return rejectWithValue({ ...error });
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
    if (error.response)
      return {
        message: error.response.data.message,
        status: error.response.data.code,
      };
    throw new Error('Đã xảy ra lỗi không mong đợi');
  }
});

// export const getSecretKey = createAsyncThunk('auth/getSecretKey', async () => {
//   try {
//     const req = await axios.post(
//       `${hostname}/v1/auth/generate-2fa-secret`,
//       {},
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`,
//         },
//       },
//     );
//     const res = await req.data;

//     const test = await callApi("post", "v1/auth/generate-2fa-secret",null,{});
//     console.log(test);
//     console.log(res);
//     return res;
//   } catch (error) {
//     console.log(error);
//     throw error.response !== null ? new Error(error.response.data.message) : new Error('Đã xảy ra lỗi không mong đợi');
//   }
// });

export const getSecretKey = createAsyncThunk('auth/getSecretKey', async (_, { rejectWithValue }) => {
  try {
    const response = await callApi('post', '/v1/auth/generate-2fa-secret', null, {});
    return response;
  } catch (error) {
    return rejectWithValue({ ...error });
  }
});

export const clearError = createAsyncThunk('auth/clearError', async () => {});
