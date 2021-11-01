describe("Signin", () => {
  beforeEach(() => {
    cy.clearApp();
  });

  it("Sign in flow", async () => {
    cy.signIn("iakov.salikov+100@jamakase.com");
    cy.get("h1").contains("Welcome to Airbyte!");
  });
});
