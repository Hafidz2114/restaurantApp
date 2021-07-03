import Home from '../views/pages/resto';
import Detail from '../views/pages/detail';
import Like from '../views/pages/like';

const routes = {
  '/': Home, // default page
  '/favorite': Like,
  '/detail/:id': Detail,
};

export default routes;
