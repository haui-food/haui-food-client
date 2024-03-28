const routes = {
  home: '/',
  category: 'cuisines/:category',
  restaurants: '/restaurants',
  restaurant: '/restaurant/:restaurant',
  login: '/auth/login',
  signup: '/auth/signup',
  forgotPassword: '/auth/forgot-password',
  verifyOTP: '/auth/verify-otp',
  resetPassword: '/auth/reset-password',
  notFound: '*',
};

export default routes;
