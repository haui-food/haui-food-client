import config from '~/config';

import Home from '~/pages/Home';

const publicRoutes = [{ path: config.routes.home, component: Home }];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
