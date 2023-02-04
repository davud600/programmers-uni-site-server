import { ContactMail } from '@/interfaces/contact-mail.interface';
import nodemailer from 'nodemailer';
import { EMAIL_USER, EMAIL_PASSWORD } from '@/config';

export default class MailService {
  public static async sendMail(mail: ContactMail): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: mail.email,
      to: EMAIL_USER,
      subject: `${mail.fullName}, ${mail.email}`,
      text: mail.messageContent,
    });

    console.log('Message sent: %s', info.messageId);
  }
}
