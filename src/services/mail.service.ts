import { ContactMail } from '@/interfaces/contact-mail.interface';

export default class MailService {
  public static async sendMail(mail: ContactMail): Promise<void> {
    console.log(mail);
  }
}
