import {
  getDefaultMessageData,
  getDefaultPlayerData,
  messageDataKey,
  playerDataKey,
  setJSONToLocalStorage
} from "../../../src/helpers/commons/constants";

describe("Visit Profile Page", () => {
  const initialPlayerData = Object.assign(getDefaultPlayerData(), {
    name: "string",
    selectedGender: "Agender",
    selectedPictureIdx: 2
  });

  const initialMessagesData = getDefaultMessageData();

  beforeEach(() => {
    setJSONToLocalStorage(playerDataKey, initialPlayerData);
    setJSONToLocalStorage(messageDataKey, initialMessagesData);
  });

  it("will shows all messages available", () => {
    cy.visit("/messages")
      .contains("Messages From Lovers")
      .get("[data-test*='message-tile']")
      .should("have.length", 1)
      .contains("Miss Boss Lady");
  });

  it("will show messages from a user upon click", () => {
    cy.visit("/messages")
      .contains("Messages From Lovers")
      .get("[data-test*='message-tile-21']")
      .click();

    cy.location().should(loc => {
      expect(loc.pathname).to.eq("/messages/21");
    });
    cy.get("[data-test='message-text']").should("have.length", 3);
  });

  it("will allow user to message others and it will appear on the messages", () => {
    const newMsg = "hello world";
    cy.visit("/messages/21");

    // nothing will happen if clicked with no message
    cy.get("[data-test='send-message-button']").click();
    cy.get("[data-test='message-text']").should("have.length", 3);

    // enter text in messages
    cy.get("[data-test='write-message-input']").type(newMsg);
    cy.get("[data-test='send-message-button']").click();

    // once submit is clicked, message bubble is increased by 1
    cy.get("[data-test='message-text']").should("have.length", 4);
    cy.get("[data-test='message-text']")
      .last()
      .contains(newMsg);
  });
});
