import {
  getDefaultPlayerData,
  playerDataKey,
  setJSONToLocalStorage
} from "../../../src/helpers/commons/constants";

describe("Visit Dashboard page as REGISTERED user", () => {
  const initialPlayerData = Object.assign(getDefaultPlayerData(), {
    name: "testUser",
    selectedGender: "Agender",
    selectedPictureIdx: 2
  });
  it("Displays you haven't taken L&A test if you haven't", () => {
    setJSONToLocalStorage(
      playerDataKey,
      Object.assign(initialPlayerData, {
        passedTest: false
      })
    );

    // assertions of text
    cy.visit("/")
      .contains("Welcome, " + initialPlayerData.name)
      .contains("you haven't taken");

    // assertion for lover reel
    cy.get('[data-test="lover-reel-profile"]')
      .should("have.length", 3)
      .get('[data-test="load-more-button]')
      .click();

    // able to navigate to game page through CHAT ME button
    cy.get('[data-test="lover-reel-profile-2"] button')
      .click()
      .contains("What is the Llama or Alpaca test?");
    cy.get('[data-test="modal-agree-button]')
      .click()
      .contains("Llama or Alpaca Test");
  });
});
