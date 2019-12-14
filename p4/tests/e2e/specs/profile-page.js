import {
  getDefaultPlayerData,
  playerDataKey,
  setJSONToLocalStorage
} from "../../../src/helpers/commons/constants";

describe("Profile Page", () => {
  const initialPlayerData = Object.assign(getDefaultPlayerData(), {
    name: "testUser",
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
      .invoke("text")
      .then(text => {
        expect(text).to.equal("testUser");
      });

    cy.get("[data-test='about-me-input']")
      .invoke("text")
      .then(text => {
        expect(text).to.equal("string");
      });

    cy.get("[data-test='looking-for-input']")
      .invoke("text")
      .then(text => {
        expect(text).to.equal("string");
      });
  });

  it("won't save any data if no data has been changed", () => {
    cy.visit("/profile")
      .get("[data-test='save-changes-button']")
      .click()
      .contains("No new changes needed to be saved.");
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
    cy.visit("/profile")
      .get("[data-test='name-input']")
      .type("str")
      .get("[data-test='save-changes-button']")
      .click()
      .contains("Welcome, stringstr");
  });
});
