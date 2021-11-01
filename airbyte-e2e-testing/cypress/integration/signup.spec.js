Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe("Signup", () => {
  beforeEach(() => {
    cy.clearApp();
  });

  it("Sign up flow", async () => {
    cy.signUp(() => {
      cy.get("h1").contains("Welcome to Airbyte!");
    });
  });
});
