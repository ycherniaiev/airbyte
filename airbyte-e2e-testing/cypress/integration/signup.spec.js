Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe("Signup main actions", () => {
  beforeEach(() => {
    cy.clearApp();
  });

  it("Sign up flow", async () => {
    cy.visit("/signup");

    cy.createInbox().then((inbox) => {
      const email = inbox.emailAddress;

      cy.get("input[name=name]").type(email);
      cy.get("input[name=company]").type(email);
      cy.get("input[name=email]").type(email);
      cy.get("input[name=password]").type(email);
      cy.get("input[name=security]").click();
      cy.get("button[type=submit]").click();

      cy.wait(10000);

      cy.waitForLatestEmail(inbox.id).then((email) => {
        cy.log(email.body);
        cy.visitConfirmationLink(email.body);
        cy.wait(3000);
        cy.visit("/");
        cy.wait(10000);

        cy.get("h5").click();
        cy.get("h1").contains("Welcome to Airbyte!");
      });
    });
  });
});
