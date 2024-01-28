import { group } from '@app:start/router';
import { createProject } from '@app:validators/project.schema';
import ProjectsController from '@app:controllers/projects.controller';
import AuthMiddleware from '@app:start/middlewares/auth';
import { validate } from '@app:start/middlewares/validator';
import { ownership } from '../middlewares/ownership';

export default [
  group(
    (route) => {
      route('get', '/', ProjectsController.index);
      route('post', '/', ProjectsController.store, [validate(createProject)]);
      route('get', '/:id', ProjectsController.show, [ownership('project')]);
      route('put', '/:id', ProjectsController.update, [
        ownership('project', ['owner', 'writer']),
      ]);
      route('delete', '/:id', ProjectsController.destroy, [
        ownership('project', ['owner', 'writer']),
      ]);
    },
    {
      prefix: '/projects',
      middlewares: [AuthMiddleware],
    }
  ),
];
