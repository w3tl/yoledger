import LoginBarComponent from './LoginBar';
import LoginPageComponent from './LoginPage';
import loginBarWithData from './LoginBarHOC';
import loginPageWithData from './LoginPageHOC';

const LoginBar = loginBarWithData(LoginBarComponent);
const LoginPage = loginPageWithData(LoginPageComponent);

export {
  LoginBar,
  LoginPage,
};
