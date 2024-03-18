import config from '~/config';

import Home from '~/pages/Home';
import Restaurant from '~/pages/Restaurant';

const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.restaurant, component: Restaurant },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
