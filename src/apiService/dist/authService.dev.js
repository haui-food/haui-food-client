"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerUser = exports.loginUser = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _http = _interopRequireDefault(require("~/utils/http"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var loginUser = (0, _toolkit.createAsyncThunk)('auth/login', function _callee(userCredentials) {
  var req, res;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(_http["default"], "/v1/auth/login"), userCredentials));

        case 2:
          req = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(req.data.data);

        case 5:
          res = _context.sent;
          localStorage.setItem('accessToken', JSON.stringify(res.accessToken));
          localStorage.setItem('refreshToken', JSON.stringify(res.refreshToken));
          console.log(res);
          return _context.abrupt("return", res);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.loginUser = loginUser;
var registerUser = (0, _toolkit.createAsyncThunk)('auth/signup', function _callee2(userCredentials) {
  var req, res;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post("".concat(_http["default"], "/v1/auth/register"), userCredentials));

        case 2:
          req = _context2.sent;
          _context2.next = 5;
          return regeneratorRuntime.awrap(req.data.data);

        case 5:
          res = _context2.sent;
          console.log(res);
          return _context2.abrupt("return", res);

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.registerUser = registerUser;