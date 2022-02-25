const sso = require('./sso');
const mfa = require('./mfa');

mfa(() => {
  console.log('MFA listening...');
  sso(() => {
    console.log('SSO listening...');
  });
});