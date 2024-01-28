import AppController from '@app:controllers/app.controller';
import { route } from '../router';
import account from './account';
import auth from './auth';
import project from './project';

const routes = [
  route('get', '/', AppController.healthcheck),
  ...auth,
  ...account,
  ...project,
];

export default routes;
