describe("Workspace", async () => {
  let name = Math.random();

  before(() => {
    cy.clearApp();
    cy.signIn("iakov.salikov+100@jamakase.com");
    name = Math.random();
  });

  describe("Create workspace", async () => {
    before(() => {
      cy.createWorkspace(name);
    });

    it("should be existed workspaces", () => {
      cy.get("h5").contains(name).click();
      cy.get("div").contains(name);
    });
  });

  describe("Rename workspace", async () => {
    before(() => {
      const newName = Math.random();
      cy.renameWorkspace(newName);
    });

    it("should be renamed workspace", () => {
      cy.get("#root > div > nav > div > div").click();
      cy.get("span").contains(name);
    });
  });

  describe("Remove workspace", async () => {
    before(() => {
      cy.removeWorkspace();
    });

    it("should be what ???", () => {});
  });
});
