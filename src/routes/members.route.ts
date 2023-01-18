import { Router } from 'express';
import MembersController from '@controllers/members.controller';
import { Routes } from '@interfaces/routes.interface';

class MembersRoute implements Routes {
  public path = '/members';
  public router = Router();
  public membersController = new MembersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.membersController.index);
    this.router.post(`${this.path}`, this.membersController.createMember);
  }
}

export default MembersRoute;
