describe("Login", () => {
  it("should visit root, which should be the login page", () => {
    cy.visit("/");
    cy.get(".MuiContainer-root").contains("Log In");
  });

  it("should be able to fill out the form", () => {
    cy.get("#email").type("a@a.com");
    cy.get("#password").type("password");    
  });

  it("should be able to login", () => {    
    cy.get(".MuiButton-label").click();
    cy.url().should('include', '/dashboard');
  });
});
