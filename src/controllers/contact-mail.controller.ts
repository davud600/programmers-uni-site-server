import { NextFunction, Request, Response } from 'express';
import { ContactMailDto } from '@/dtos/contact-mail.dto';

export default class ContactMailController {
  public index = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { email, fullName, subject, messageContent }: ContactMailDto =
        req.body;

      res.status(200).send({ email, fullName, subject, messageContent });
      return;
    } catch (error) {
      next(error);
    }
  };
}
