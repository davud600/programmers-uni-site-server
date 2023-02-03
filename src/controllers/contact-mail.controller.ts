import { NextFunction, Request, Response } from 'express';
import { ContactMailDto } from '@/dtos/contact-mail.dto';
import MailService from '@/services/mail.service';

export default class ContactMailController {
  public index = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { fullName, email, messageContent }: ContactMailDto = req.body;

      await MailService.sendMail({ fullName, email, messageContent });

      res.status(200).send();
      return;
    } catch (error) {
      next(error);
    }
  };
}
