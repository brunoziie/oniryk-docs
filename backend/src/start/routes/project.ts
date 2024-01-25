import { group } from '@app/start/router';
import { createProject } from '@/src/schemas/project.schema';
import ProjectsController from '@app/controllers/projects.controller';
import AuthMiddleware from '@app/start/middlewares/auth';
import { validate } from '@app/start/middlewares/validator';

export default [
  group(
    (route) => {
      route('post', '/', ProjectsController.store, [validate(createProject)]);
      route('get', '/:id', ProjectsController.show);
    },
    {
      prefix: '/projects',
      middlewares: [AuthMiddleware],
    }
  ),
];
