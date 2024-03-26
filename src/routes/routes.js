import config from '~/config';

import Home from '~/pages/Home';
import Restaurants from '~/pages/Restaurants';

const publicRoutes = [
  { path: config.routes.home, component: Home },
  {
    path: config.routes.category,
    component: Restaurants,
  },
  {
    path: config.routes.restaurents,
    component: Restaurants,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
