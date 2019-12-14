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

  beforeEach(() => {
    setJSONToLocalStorage(playerDataKey, Object.assign(initialPlayerData));
  });

  it("Displays username with a welcome", () => {
    cy.visit("/").contains("Welcome, " + initialPlayerData.name);
  });

  it("Shows navigation and able to navigate", () => {
    cy.visit("/")
      .contains("Why are Alpacas such good lovers?")
      .get('[data-test=*"navigation-item"]')
      .should("have.length", 3);

    // visit profile page
    cy.get("[data-test=navigation-item-profilepage]")
      .click()
      .contains("Edit Your Profile");

    // visit messages page, initially will have one new message from the boss
    cy.get("[data-test=navigation-item-messagespage]")
      .click()
      .contains("Miss Boss Lady")
      .contains("NEW");
    cy.get("[data-test=message-badge]").contains("1");

    // visit back home
    cy.get("[data-test=navigation-item-dashboardpage]")
      .click()
      .contains("Why are Alpacas such good lovers?");
  });

  it("Displays a lover reel and shows more if you click on load more", () => {
    cy.visit("/")
      .get('[data-test*="lover-reel-profile"]')
      .should("have.length", 3)
      .get('[data-test="load-more-button]')
      .click();
    // TODO ensure that they are different profiles
    cy.get('[data-test="lover-reel-profile"]').should("have.length", 3);
  });

  it("Displays you haven't taken L&A test if you haven't taken it and able to navigate to game page", () => {
    // assertions of text
    cy.visit("/").contains("you haven't taken");

    // able to navigate to game page through CHAT ME button
    cy.get('[data-test*="lover-reel-profile-2"] button')
      .click()
      .contains("What is the Llama or Alpaca test?");
    cy.get('[data-test="modal-agree-button]')
      .click()
      .contains("Llama or Alpaca Test");
  });

  it("Displays you have taken L&A test and able to chat to dates", () => {
    setJSONToLocalStorage(
      playerDataKey,
      Object.assign(initialPlayerData, {
        passedTest: true
      })
    );

    // assertions of text
    cy.visit("/").contains("You've passed");

    // able to navigate to game page through CHAT ME button
    cy.get('[data-test*="lover-reel-profile-2"] button')
      .click()
      .contains("What is the Llama or Alpaca test?");
  });
});
