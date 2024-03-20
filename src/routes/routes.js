import config from '~/config';

import Home from '~/pages/Home';
import Restaurent from '~/pages/Restaurant';

const publicRoutes = [
  { path: config.routes.home, component: Home },
  {
    path: config.routes.category,
    component: Restaurent,
  },
  {
    path: config.routes.restaurent,
    component: Restaurent,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
