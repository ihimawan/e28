import {
  getDefaultPlayerData,
  playerDataKey,
  setJSONToLocalStorage
} from "../../../src/helpers/commons/constants";

describe("Visit game page", () => {
  const initialPlayerData = Object.assign(getDefaultPlayerData(), {
    name: "testUser",
    selectedGender: "Agender",
    selectedPictureIdx: 2
  });

  beforeEach(() => {
    setJSONToLocalStorage(playerDataKey, Object.assign(initialPlayerData));
  });

  it("Will prompt you to register first if user is unregistered", () => {
    cy.clearLocalStorage(playerDataKey);
    cy.visit("/game")
      .get('[data-test="final-register-button"]')
      .should("be.visible");
  });

  it("Rejecting instructions on screen", () => {
    cy.visit("/game")
      .get('[data-test="game-page-reject"]')
      .click()
      .contains("Welcome, " + initialPlayerData.name);

    cy.visit("/game")
      .get('[data-test="game-return-home"]')
      .click()
      .contains("Welcome, " + initialPlayerData.name);
  });

  it("Has functionality to restart the game in middle of game", () => {
    cy.visit("/game")
      .get('[data-test="game-page-agree"]')
      .click();

    cy.get('[data-test="game-restart"]')
      .click()
      .contains("Get Ready!");
  });

  it("Continuing game to winner, win must reflect on dashboard.", async () => {
    cy.visit("/game")
      .get('[data-test="game-page-agree"]')
      .click();

    await new Promise(resolve => setTimeout(resolve));
  });

  it("Continuing game to lose, lose must refelct on dashboard", () => {
    cy.visit("/game")
      .get('[data-test="game-page-agree"]')
      .click();
  });
});
