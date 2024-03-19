import config from '~/config';

import Home from '~/pages/Home';
import RestaurentsByCategory from '~/pages/RestaurentsByCategory';

const publicRoutes = [
  { path: config.routes.home, component: Home },
  {
    path: config.routes.category,
    component: RestaurentsByCategory,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
