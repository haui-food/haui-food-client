import config from '~/config';

import Home from '~/pages/Home';
import Restaurants from '~/pages/Restaurants';
import Restaurant from '../pages/Restaurant/Restaurant';

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
  {
    path: config.routes.restaurant,
    component: Restaurant,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
