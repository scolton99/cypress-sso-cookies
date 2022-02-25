const cookieFixer = req => {
  req.continue(res => {
    // Add the desired SameSite and Secure flags to the end of the header setting the cookie
    res.headers['set-cookie'][0] += '; SameSite=None; Secure';
  });
};

describe('SSO login test', () => {
  it('this one fails', () => {
    cy.visit('https://sso.local.domain:8443/');

    cy.get('#username').type('username');
    cy.get('#password').type('password');
    cy.get('#submit').click();

    cy.location('pathname').should('include', 'callback');

    // It won't contain this text because we didn't send the right cookie
    cy.get('body').should('contain.text', 'Welcome back!');
  });

  it('this one succeeds', () => {
    cy.visit('https://sso.local.domain:8443/');

    cy.intercept({
      method: 'POST',
      url: 'https://sso.local.domain:8443/'
    }, cookieFixer);

    cy.get('#username').type('username');
    cy.get('#password').type('password');
    cy.get('#submit').click();

    cy.location('pathname').should('include', 'callback');

    cy.get('body').should('contain.text', 'Welcome back!');
  });
})