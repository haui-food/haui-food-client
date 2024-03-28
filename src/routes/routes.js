import config from '~/config';

import { AuthLayout, NotFoundLayout } from '~/Layouts';

import Home from '~/pages/Home';
import Restaurants from '~/pages/Restaurants';
<<<<<<< HEAD
import Restaurant from '../pages/Restaurant/Restaurant';
=======
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import ForgotPassword from '~/pages/ForgotPassword';
import VerifyOTP from '~/pages/VerifyOTP';
import ResetPassword from '~/pages/ResetPassword';
import NotFound from '~/pages/NotFound';
>>>>>>> 4202b7ca57c62d6abd6f11c1815b80b7bb8c3558

const publicRoutes = [
  { path: config.routes.home, component: Home },
  {
    path: config.routes.category,
    component: Restaurants,
  },
  {
    path: config.routes.restaurants,
    component: Restaurants,
  },
<<<<<<< HEAD
  {
    path: config.routes.restaurant,
    component: Restaurant,
  },
=======
  { path: config.routes.login, component: SignIn, layout: AuthLayout },
  { path: config.routes.signup, component: SignUp, layout: AuthLayout },
  { path: config.routes.forgotPassword, component: ForgotPassword, layout: AuthLayout },
  { path: config.routes.verifyOTP, component: VerifyOTP, layout: AuthLayout },
  { path: config.routes.resetPassword, component: ResetPassword, layout: AuthLayout },
  { path: config.routes.notFound, component: NotFound, layout: NotFoundLayout },
>>>>>>> 4202b7ca57c62d6abd6f11c1815b80b7bb8c3558
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
