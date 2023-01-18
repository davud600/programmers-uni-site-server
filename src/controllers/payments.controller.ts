import { NextFunction, Request, Response } from 'express';
import PaymentsModel from '@models/payments.model';

export default class PaymentsController {
  public index = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const payments = await PaymentsModel.findAll();

      res.status(200).send(payments);
    } catch (error) {
      next(error);
    }
  };

  public getPayment = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;

      const payment = await PaymentsModel.getPayment(id);

      res.status(200).send(payment);
    } catch (error) {
      next(error);
    }
  };

  public createPayment = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { memberId, amount } = req.body;

      await PaymentsModel.save(memberId, amount);

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };

  public deletePayment = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;

      await PaymentsModel.delete(id);

      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };
}
