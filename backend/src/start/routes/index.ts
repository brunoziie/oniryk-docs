import AuthMiddleware from '../middlewares/auth';
import { route } from '../router';

const routes = [
  route(
    'get',
    '/posts',
    ({ response }) => {
      response.json({ message: 'Hello, world!' });
    },
    [AuthMiddleware]
  ),
];

export default routes;
