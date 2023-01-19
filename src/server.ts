import App from '@/app';
import MembersRoute from '@routes/members.route';
import PaymentsRoute from '@routes/payments.route';
import MemberPaymentRoute from '@routes/member-payment.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([
  new MembersRoute(),
  new PaymentsRoute(),
  new MemberPaymentRoute(),
]);

app.listen();
