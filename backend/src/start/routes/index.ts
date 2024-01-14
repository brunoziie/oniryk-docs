import AppController from '@/src/controllers/app.controller';
// import AuthMiddleware from '../middlewares/auth';
import { route } from '../router';

const routes = [route('get', '/', AppController.healthcheck)];

export default routes;
