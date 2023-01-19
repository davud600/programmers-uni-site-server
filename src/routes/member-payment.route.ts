import { Router } from 'express';
import MemberPaymentController from '@/controllers/member-payments.controller';
import { Routes } from '@interfaces/routes.interface';

class MemberPaymentRoute implements Routes {
  public path = '/api/member-payments';
  public router = Router();
  public memberPaymentController = new MemberPaymentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.memberPaymentController.index);
  }
}

export default MemberPaymentRoute;
