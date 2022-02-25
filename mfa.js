const express = require('express');
const https = require('https');
const fs = require('fs');

const crt = fs.readFileSync('./cert.crt', { encoding: 'utf-8' });
const key = fs.readFileSync('./cert.key', { encoding: 'utf-8' });

const PORT = 8444;

const app = express();

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  if (!req.query.return) {
    res.status(400).send('Cannot do MFA without a place to return to!');
    return;
  }

  res.render('mfa', { redirect: req.query.return });
});

const server = https.createServer({ cert: crt, key }, app);

module.exports = callback => {
  server.listen(PORT, callback);
}