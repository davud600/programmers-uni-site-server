import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import MembersRoute from '@routes/members.route';
import PaymentsRoute from '@routes/payments.route';
import MemberPaymentRoute from '@routes/member-payment.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new MembersRoute(),
  new PaymentsRoute(),
  new MemberPaymentRoute(),
]);

app.listen();
