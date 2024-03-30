import { createAsyncThunk } from '@reduxjs/toolkit';
import hostname from '~/utils/http';
import axios from 'axios';

export const loginUser = createAsyncThunk('auth/login', async (userCredentials) => {
  const req = await axios.post(`${hostname}/v1/auth/login`, userCredentials);
  const res = await req.data.data;
  localStorage.setItem('accessToken', JSON.stringify(res.accessToken));
  localStorage.setItem('refreshToken', JSON.stringify(res.refreshToken));
  console.log(res);
  return res;
});

export const registerUser = createAsyncThunk('auth/signup', async (userCredentials) => {
  const req = await axios.post(`${hostname}/v1/auth/register`, userCredentials);
  const res = await req.data.data;
  console.log(res);
  return res;
});
