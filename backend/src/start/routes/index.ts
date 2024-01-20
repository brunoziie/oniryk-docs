import AppController from '@/src/controllers/app.controller';
// import AuthMiddleware from '../middlewares/auth';
import { route } from '../router';
import account from './account';
import auth from './auth';

const routes = [route('get', '/', AppController.healthcheck), ...auth, ...account];

export default routes;
