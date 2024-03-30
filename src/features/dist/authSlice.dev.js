"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _authService = require("~/apiService/authService");

var authSlice = (0, _toolkit.createSlice)({
  name: 'auth',
  initialState: {
    loading: false,
    user: null,
    error: null
  },
  extraReducers: function extraReducers(builder) {
    builder.addCase(_authService.loginUser.pending, function (state) {
      state.loading = true;
      state.error = null;
      state.user = null;
    }).addCase(_authService.loginUser.fulfilled, function (state, action) {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    }).addCase(_authService.loginUser.rejected, function (state, action) {
      state.loading = false;
      state.user = null;
      state.error = action.error.message; // Set error message directly
    }).addCase(_authService.registerUser.pending, function (state) {
      state.loading = true;
      state.user = null;
      state.error = null;
    }).addCase(_authService.registerUser.fulfilled, function (state, action) {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    }).addCase(_authService.registerUser.rejected, function (state, action) {
      state.loading = false;
      state.user = null;
      state.error = action.error.message; // Set error message directly
    });
  }
});
var _default = authSlice.reducer;
exports["default"] = _default;