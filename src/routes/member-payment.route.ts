import { Router } from 'express';
import MemberPaymentController from '@/controllers/member-payments.controller';
import { Routes } from '@interfaces/routes.interface';
import { MemberDto } from '@/dtos/member.dto';
import validationMiddleware from '@/middlewares/validation.middleware';

export default class MemberPaymentRoute implements Routes {
  public path = '/api/member-payments';
  public router = Router();
  public memberPaymentController = new MemberPaymentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      validationMiddleware(MemberDto, 'body'),
      this.memberPaymentController.index,
    );
  }
}
