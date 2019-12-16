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
      .get('[data-test="register-button"]')
      .should("be.visible");
  });

  it("Rejecting instructions on screen", () => {
    cy.visit("/game")
      .get('[data-test="game-page-reject"]')
      .click();
    cy.contains("Welcome, " + initialPlayerData.name);

    cy.visit("/game")
      .get('[data-test="game-page-accept"]')
      .click();
    cy.get('[data-test="game-return-home"]').click();
    cy.contains("Welcome, " + initialPlayerData.name);
  });

  it("Has functionality to restart the game in middle of game", () => {
    cy.visit("/game")
      .get('[data-test="game-page-accept"]')
      .click();

    cy.get('[data-test="game-restart"]').click();
    cy.contains("Get Ready!");
    cy.contains("question 1 of");
  });

  it("won't show success on dashboard page if you fail the test", () => {
    cy.visit("/game")
      .get('[data-test="game-page-accept"]')
      .click();

    cy.get('[data-test="game-restart"]').click();
    cy.contains("Get Ready!");
    cy.contains("question 1 of");
  });
});
