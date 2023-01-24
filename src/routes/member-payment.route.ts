import { Router } from 'express';
import MemberPaymentController from '@/controllers/member-payments.controller';
import { Routes } from '@interfaces/routes.interface';
import { MemberPaymentDto } from '@/dtos/member-payment.dto';
import validationMiddleware from '@/middlewares/validation.middleware';

class MemberPaymentRoute implements Routes {
  public path = '/api/member-payments';
  public router = Router();
  public memberPaymentController = new MemberPaymentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      validationMiddleware(MemberPaymentDto, 'body'),
      this.memberPaymentController.index,
    );
  }
}

export default MemberPaymentRoute;
