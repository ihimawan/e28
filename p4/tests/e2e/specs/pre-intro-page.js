describe("Visit Registration page", () => {
  it("As unregistered user, visits the app root url and able to register", () => {
    const name = "testUser";

    // registration
    cy.visit("/")
      .contains("Alpacan Mingle")
      // click to register
      .get('[data-test="register-button"]')
      .click()
      .get('[data-test*="picture-select"]')
      .should("have.length", 3)
      // choose profile picture
      .get('[data-test*="picture-select-2"]')
      .click()
      // enter name
      .get('[data-test="enter-name-input"]')
      .type(name)
      // choose gender
      .get('[data-test="select-gender"]')
      .select("Agender")
      // finalize to display modal
      .get('[data-test="final-register-button"]')
      .click();

    cy.contains("Terms and Conditions")
      .get('[data-test="dismiss-modal-button"]') // disagree click test
      .click()
      .get('[data-test="final-register-button"]')
      .click()
      .get('[data-test="agree-modal-button"]')
      .click(); // agree click

    cy.contains("Welcome, " + name);
  });
});
