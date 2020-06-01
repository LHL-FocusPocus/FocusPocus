describe("Navigation", () => {
  it("should visit root, which should be the login page", () => {
    cy.visit("/");
    cy.get(".MuiContainer-root").contains("Log In");
  });

  it("should navigate to the register form", () => {
    cy.get(".MuiGrid-root > .MuiTypography-root").click();
    cy.get(".MuiContainer-root").contains("Sign Up");
  });
});
