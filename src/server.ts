import App from '@/app';
import MembersRoute from '@routes/members.route';
import PaymentsRoute from '@routes/payments.route';
import MemberPaymentRoute from '@routes/member-payment.route';
import ContactMailRoute from '@routes/contact-mail.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([
  new MembersRoute(),
  new PaymentsRoute(),
  new MemberPaymentRoute(),
  new ContactMailRoute(),
]);

app.listen();
