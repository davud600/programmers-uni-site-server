import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import MemberPaymentRoute from '@routes/member-payment.route';
import validateEnv from '@utils/validateEnv';
import MembersRoute from './routes/members.route';

validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new MembersRoute(),
  new MemberPaymentRoute(),
]);

app.listen();
