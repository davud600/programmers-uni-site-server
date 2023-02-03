import { Router } from 'express';
import ContactMailController from '@/controllers/contact-mail.controller';
import { Routes } from '@interfaces/routes.interface';
import { ContactMailDto } from '@/dtos/contact-mail.dto';
import validationMiddleware from '@/middlewares/validation.middleware';

export default class ContactMailRoute implements Routes {
  public path = '/api/contact-mail';
  public router = Router();
  public contactMailController = new ContactMailController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      validationMiddleware(ContactMailDto, 'body'),
      this.contactMailController.index,
    );
  }
}
