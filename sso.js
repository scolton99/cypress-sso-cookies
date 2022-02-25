const express = require('express');
const https = require('https');
const fs = require('fs');
const cookies = require('cookie-parser');

const crt = fs.readFileSync('./cert.crt', { encoding: 'utf-8' });
const key = fs.readFileSync('./cert.key', { encoding: 'utf-8' });

const HOSTNAME = 'sso.local.domain';
const MFA_DOMAIN = 'mfa.external.domain';

const PORT = 8443;
const MFA_PORT = 8444;

const app = express();

app.use(cookies());
app.set('view engine', 'pug');

const wait = async ms => (new Promise(resolve => setTimeout(resolve, ms)));

app.get('/', async (_req, res) => {
  res.render('sso');
});

app.post('/', async (_req, res) => {
  await wait(3000);
  
  res.cookie('ssoCookie', 'success', {
    path: '/'
  });

  const returnUrl = encodeURIComponent(`https://${HOSTNAME}:${PORT}/callback`);
  res.redirect(`https://${MFA_DOMAIN}:${MFA_PORT}/?return=${returnUrl}`);
});

app.get('/callback', (req, res) => {
  if (req.cookies.ssoCookie === 'success') {
    res.send('Welcome back!');
  } else {
    res.send('Who are you?');
  }
});

const server = https.createServer({ cert: crt, key }, app);

module.exports = callback => {
  server.listen(PORT, callback);
}