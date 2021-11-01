Cypress.Commands.add("openWorkspace", (name) => {
  cy.get("nav > div > div").click();
  cy.get("div").contains(name).click();
  cy.wait(3000);
});

Cypress.Commands.add("createWorkspace", (name) => {
  cy.get("nav > div > div").click();
  cy.get("div").contains("View all workspaces").click();
  cy.wait(500);
  cy.get("button").contains("Create new workspace").click();
  cy.get("input[name=name]").type(name);
  cy.get("button").contains("Create workspace").click();
  cy.wait(1000);
});

Cypress.Commands.add("renameWorkspace", (name) => {
  cy.get("nav > ul > li").last().click();
  cy.get("div").contains("General Settings").click({ force: true });
  cy.get("input[name=name]").type(name);
  cy.get("button[type=submit]").click();
});

Cypress.Commands.add("removeWorkspace", () => {
  cy.get("nav > ul > li").last().click({ force: true });
  cy.get("div").contains("General Settings").click({ force: true });
  cy.get("button").contains("Delete").click({ force: true });
});
