import { Router } from 'express';
import PaymentsController from '@controllers/payments.controller';
import { Routes } from '@interfaces/routes.interface';

export default class PaymentsRoute implements Routes {
  public path = '/payments';
  public router = Router();
  public paymentsController = new PaymentsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.paymentsController.index);
    this.router.post(`${this.path}`, this.paymentsController.createPayment);
    this.router.get(`${this.path}/:id`, this.paymentsController.getPayment);
    this.router.delete(
      `${this.path}/:id`,
      this.paymentsController.deletePayment,
    );
  }
}
