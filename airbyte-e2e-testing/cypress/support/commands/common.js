// cypress/support/commands.js
const { MailSlurp } = require("mailslurp-client");

const apiKey =
  "caf2ce54b4c3f71bf459491e36c256cdb4662e5a80307f75e63cb560ab8ace28";
const mailslurp = new MailSlurp({ apiKey });

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

Cypress.Commands.add("submit", () => {
  cy.get("button[type=submit]").click();
});

Cypress.Commands.add("fillTestLocalJsonForm", (name) => {
  cy.intercept("/destination_definition_specifications/get").as(
    "getDestinationSpecifications"
  );

  cy.get("input[name=name]").type(name);
  cy.get("div[data-testid='serviceType']").click();
  cy.get("div").contains("Local JSON").click();

  cy.wait("@getDestinationSpecifications");

  cy.get("input[name='connectionConfiguration.destination_path']").type(
    "/local"
  );
});

Cypress.Commands.add("openSourcePage", () => {
  cy.visit("/source");
  cy.intercept("/sources/list").as("getSourcesList");
  cy.wait("@getSourcesList");
});

Cypress.Commands.add("openDestinationPage", () => {
  cy.visit("/destination");
  cy.intercept("/destinations/list").as("getDestinationsList");
  cy.wait("@getDestinationsList");
});

Cypress.Commands.add("openNewSourceForm", () => {
  cy.openSourcePage();
  cy.get("button[data-id='new-source'").click();
  cy.url().should("eq", `${Cypress.config().baseUrl}/source/new-source`);
});

Cypress.Commands.add("openNewDestinationForm", () => {
  cy.openDestinationPage();
  cy.get("button[data-id='new-destination'").click();
  cy.url().should(
    "eq",
    `${Cypress.config().baseUrl}/destination/new-destination`
  );
});

Cypress.Commands.add("updateField", (field, value) => {
  cy.get("input[name='" + field + "']")
    .clear()
    .type(value);
});

Cypress.Commands.add("openSettingForm", (name) => {
  cy.get("div").contains(name).click();
  cy.get("div[data-id='settings-step']").click();
});

Cypress.Commands.add("deleteEntity", () => {
  cy.get("button[data-id='open-delete-modal']").click();
  cy.get("button[data-id='delete']").click();
});

Cypress.Commands.add("forceVisit", (url) => {
  cy.window().then((win) => {
    return win.open(url, "_self");
  });
});

Cypress.Commands.add("clearApp", (url) => {
  indexedDB.deleteDatabase("firebaseLocalStorageDb");
  cy.clearLocalStorage();
  cy.clearCookies();
});

Cypress.Commands.add("createInbox", () => {
  return mailslurp.createInbox();
});

Cypress.Commands.add("waitForLatestEmail", (inboxId) => {
  return mailslurp.waitForLatestEmail(inboxId);
});

Cypress.Commands.add("openSettings", (inboxId) => {
  cy.get("nav > ul > li").last().click();
});
