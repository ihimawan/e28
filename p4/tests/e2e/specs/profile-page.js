import {
  getDefaultPlayerData,
  playerDataKey,
  setJSONToLocalStorage
} from "../../../src/helpers/commons/constants";

describe("Visit Profile Page", () => {
  const initialPlayerData = Object.assign(getDefaultPlayerData(), {
    name: "string",
    selectedGender: "Agender",
    selectedPictureIdx: 2,
    about: "string",
    lookingFor: "string"
  });

  beforeEach(() => {
    setJSONToLocalStorage(playerDataKey, Object.assign(initialPlayerData));
  });

  it("will present data correctly based on local storage", () => {
    cy.visit("/profile");
    cy.get("[data-test='name-input']")
      .invoke("val")
      .then(text => {
        expect(text).to.equal(initialPlayerData.name);
      });

    cy.get("[data-test='about-me-input']")
      .invoke("val")
      .then(text => {
        expect(text).to.equal(initialPlayerData.about);
      });

    cy.get("[data-test='looking-for-input']")
      .invoke("val")
      .then(text => {
        expect(text).to.equal(initialPlayerData.lookingFor);
      });
  });

  it("won't save any data if no data has been changed", () => {
    cy.visit("/profile")
      .get("[data-test='save-changes-button']")
      .should("be.disabled");

    cy.get("[data-test='name-input']")
      .clear()
      .type(initialPlayerData.name)
      .get("[data-test='save-changes-button']")
      .click();

    cy.get(".alert").contains("No new changes needed to be saved.");
  });

  it("won't allow submission if name is invalid", () => {
    cy.visit("/profile")
      .get("[data-test='name-input']")
      .clear()
      .type("!@#$")
      .get("[data-test='save-changes-button']")
      .should("be.disabled");
  });

  it("saves information upon change and click", () => {
    const append = "str";
    cy.visit("/profile")
      .get("[data-test='name-input']")
      .type(append)
      .get("[data-test='about-me-input']")
      .type(append)
      .get("[data-test='looking-for-input']")
      .type(append)
      .get("[data-test='save-changes-button']")
      .click();

    // ensure name gets updated immediately though vuex
    cy.contains("Welcome, string".concat(append));

    // as for the rest of the information, ensure still persist because of local storage
    cy.reload().contains("Welcome, string".concat(append));
    cy.get("[data-test='name-input']")
      .invoke("val")
      .then(text => {
        expect(text).to.equal(initialPlayerData.name.concat(append));
      });

    cy.get("[data-test='about-me-input']")
      .invoke("val")
      .then(text => {
        expect(text).to.equal(initialPlayerData.about.concat(append));
      });

    cy.get("[data-test='looking-for-input']")
      .invoke("val")
      .then(text => {
        expect(text).to.equal(initialPlayerData.lookingFor.concat(append));
      });
  });
});
