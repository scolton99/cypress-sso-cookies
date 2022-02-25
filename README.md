# Cypress SSO Example
An example of how to use Cypress to alter cookie settings to facilitate cross-domain tests, specifically those involving
SSO.

## Setup
You will need NodeJS installed to run this.

Run `npm install` to install required dependencies.

Generate yourself an SSL certificate and private key pair and save them in this directory as `cert.crt` and `cert.key`.

[Edit your `/etc/hosts` file](https://linuxize.com/post/how-to-edit-your-hosts-file/) for the domains used in this project:
```
127.0.0.1      sso.local.domain
127.0.0.1      mfa.external.domain
```

## Running
Run the servers with `npm start`.

In your own browser, go to `https://sso.local.domain:8443` and use any username and password to "log in". After several seconds you should see a page that says 
"Welcome back!"

## Testing
Run Cypress with `npm test`. (Make sure the servers are running first.)

Open the `sso.spec.js` test. The first test should fail, since the `iframe` involved in the test prevents cookies from being properly sent.

The second test should succeed by modifying the `Set-Cookie` header as it arrives to add flags to the cookie that make it sendable in more scenarios.