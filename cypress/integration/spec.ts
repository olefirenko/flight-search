describe("CRA", () => {
  it("renders home page", () => {
    cy.visit("http://localhost:3000");
    cy.get("h1").should("be.visible").and("have.text", "Flights");
  });
  it("adds new flight", () => {
    cy.get(".MuiFab-primary").click();

    cy.get("h1").should("be.visible").and("have.text", "Add New Flight");
    cy.get("input[name=departure]").type("Cairo");
    cy.get("input[name=arrival]").type("Paris");
    cy.get("input[name=departureTime]").click();
    cy.contains("OK").click();
    cy.get("input[name=arrivalTime]").click();
    cy.contains("OK").click();
    cy.get("#add-button").click();
    cy.get("body").should("contain", "The flight was successfully added");
  });
  it("can filter flights", () => {
    cy.get("input[placeholder=Search]").type("Cairo");
    cy.get("tr.MuiTableRow-root").should('contain', "Cairo")
    cy.get("input[placeholder=Search]").clear();
    cy.get("input[placeholder=Search]").type("Fake City");
    cy.get("tr.MuiTableRow-root").should('not.contain', "Cairo")
    cy.get("tr.MuiTableRow-root").should('contain', "No records to display")
  });
  it("can edit flight", () => {
    cy.visit("http://localhost:3000");
    cy.contains('edit').click()
    cy.get('input[placeholder=Departure]').clear().type('Singapore')
    cy.contains('check').click()
    cy.get("body").should("contain", "Updated");
    
  })

  it("can delete flight", () => {
    cy.contains('delete').click()
    cy.contains('check').click()
    cy.get("body").should("contain", "Deleted");
    
  })
  it("show validation errors on add flight form", () => {
    cy.get(".MuiFab-primary").click();
    cy.get("#add-button").click();
    cy.get("form").should("contain", "Field Required");
  });
});
