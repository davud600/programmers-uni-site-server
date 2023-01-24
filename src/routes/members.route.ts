import { Router } from 'express';
import MembersController from '@controllers/members.controller';
import { Routes } from '@interfaces/routes.interface';

export default class MembersRoute implements Routes {
  public path = '/members';
  public router = Router();
  public membersController = new MembersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.membersController.index);
    this.router.post(`${this.path}`, this.membersController.createMember);
    this.router.get(`${this.path}/:id`, this.membersController.getMember);
    this.router.get(
      `${this.path}`,
      this.membersController.getMemberByDiscordUsername,
    );
    this.router.delete(`${this.path}/:id`, this.membersController.deleteMember);
    this.router.delete(
      `${this.path}`,
      this.membersController.deleteMemberByDiscordUsername,
    );
    this.router.post(
      `${this.path}/warn/:id`,
      this.membersController.warnMember,
    );
    this.router.post(
      `${this.path}/remove/:id`,
      this.membersController.removeMember,
    );
    this.router.get(
      `${this.path}/warn/get`,
      this.membersController.getMembersToWarn,
    );
    this.router.get(
      `${this.path}/downgrade/get`,
      this.membersController.getMembersToRemove,
    );
    this.router.get(
      `${this.path}/upgrade/get`,
      this.membersController.getMembersToUpgrade,
    );
  }
}
