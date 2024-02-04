import MembersController from '@app:controllers/teams/members.controller';
import TeamsController from '@app:controllers/teams/teams.controller';
import { validate } from '@app:start/middlewares/validator';
import { group } from '@app:start/router';
import {
  createTeam,
  createTeamMember,
  updateTeam,
  updateTeamMember,
} from '@app:validators/team.schema';
import ownership from '../middlewares/ownership';

export default [
  group('/teams', ({ route, group }) => {
    route('get', '/', TeamsController.index);
    route('post', '/', TeamsController.store, [validate(createTeam)]);
    route('get', '/:id', TeamsController.show, [ownership('team')]);
    route('put', '/:id', TeamsController.update, [
      validate(updateTeam),
      ownership('team', ['owner', 'writer']),
    ]);
    route('delete', '/:id', TeamsController.destroy, [ownership('team', ['owner'])]);

    group('/:id/members', ({ route }) => {
      route('get', '/', MembersController.index, [ownership('team')]);
      route('post', '/', MembersController.store, [
        ownership('team', ['owner']),
        validate(createTeamMember),
      ]);
      route('put', '/:userId', MembersController.update, [
        ownership('team', ['owner']),
        validate(updateTeamMember),
      ]);
      route('delete', '/:userId', MembersController.destroy, [
        ownership('team', ['owner']),
      ]);
    });
  }),
];
