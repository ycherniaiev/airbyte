describe("Signuot", () => {
  beforeEach(() => {
    cy.clearApp();
  });

  it("Sign out flow", () => {
    cy.signIn("iakov.salikov+100@jamakase.com");
    cy.signOut();
    cy.get("h1").contains("Sign in to Airbyte");
  });
});
