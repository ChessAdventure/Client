/* eslint-disable jest/valid-expect */
/* eslint-disable no-undef */
/// <reference types="cypress" />

describe("Show dashboard", () => {
  it("should display the dashboard", () => {
    cy.viewport(1000, 1000)
    cy.visit(Cypress.env("URL_ROOT"))
    cy.get(".signup-button").click()

    cy.get("input").eq(0).type("testusername")
    cy.get("input").eq(0).should("have.value", "testusername")

    cy.get("input").eq(1).type("testpassword")
    cy.get("input").eq(1).should("have.value", "testpassword")
    cy.get("input").eq(2).type("testpassword")
    cy.get("input").eq(2).should("have.value", "testpassword")

    cy.intercept("**/users", {
      fixture: "login.json",
    })

    cy.get(".enter-button").click({ force: true })

    cy.wait(1000)

    cy.get(".dashboard-header").should("exist").should("have.descendants", "h1")
    cy.get(".dashboard-header")
      .should("exist")
      .should("have.descendants", "button")

    cy.get("h1").should("have.text", "ChessPedition")
    cy.get("button").eq(0).should("have.text", "Sign Out")

    cy.get(".container")
      .should("exist")
      .should("have.descendants", "div.greeting")
      .should("have.descendants", "p")
      .should("have.descendants", "button")
      .should("have.descendants", "section.quest-start")
      .should("have.descendants", "div.rules-container")
      .should("have.descendants", "section")

    cy.get(".thumbnail-text")
      .should("exist")
      .should("have.text", "testusername")

    cy.get(".greeting")
      .should("exist")
      .should("have.text", "Welcome, testusername")

    cy.get(".quest-start")
      .should("exist")
      .should("have.attr", "id", "quest-start")
      .should("have.descendants", "button")
    cy.get(".start-button")
      .should("exist")
      .should("have.text", "Start A New ChessPedition")

    cy.get(".rules-container")
      .should("exist")
      .should("have.descendants", "h3.rules-text")

    cy.get(".rules-text")
      .eq(0)
      .should(
        "have.text",
        "♟Click Start A New ChessPedition and send the game URL to your opponent."
      )
      .should("have.descendants", "span.chess-piece")

    cy.get(".rules-text")
      .eq(1)
      .should(
        "have.text",
        "♟If you win the game, you carry only your leftover pieces to the next game!"
      )

    cy.get(".rules-text")
      .eq(2)
      .should(
        "have.text",
        "♟If you lose the game, you get a full set of pieces."
      )

    cy.get(".rules-text")
      .eq(3)
      .should(
        "have.text",
        "♟Keep playing against each other to find the true ChessPedition champion!"
      )

    cy.get(".previous-game-header")
      .should("exist")
      .should("have.text", "Play a game and its end board will show here.")

      // stub the /stats GET
  })

  it("should sign the user out", () => {    
    cy.viewport(1000, 1000)
    cy.visit(Cypress.env("URL_ROOT"))
    cy.get(".signup-button").click()

    cy.get("input").eq(0).type("testusername")
    cy.get("input").eq(0).should("have.value", "testusername")

    cy.get("input").eq(1).type("testpassword")
    cy.get("input").eq(1).should("have.value", "testpassword")
    cy.get("input").eq(2).type("testpassword")
    cy.get("input").eq(2).should("have.value", "testpassword")

    cy.intercept("**/users", {
      fixture: "login.json",
    })

    cy.get(".enter-button").click({ force: true })

    cy.wait(3000)

    cy.get(".thumbnail-text")
      .should("exist")
      .should("have.text", "testusername")

    cy.get("button").eq(0).click()

    cy.location().should((loc) => {
      expect(loc.host).to.eq("localhost:3000")
    })
  })

  it("should start a new game", () => {
    cy.viewport(1000, 1000)
    cy.visit(Cypress.env("URL_ROOT"))
    cy.get(".signup-button").click()

    cy.get("input").eq(0).type("testusername")
    cy.get("input").eq(0).should("have.value", "testusername")

    cy.get("input").eq(1).type("testpassword")
    cy.get("input").eq(1).should("have.value", "testpassword")
    cy.get("input").eq(2).type("testpassword")
    cy.get("input").eq(2).should("have.value", "testpassword")

    cy.intercept("**/users", { fixture: "login.json" })   

    cy.get(".enter-button").click({ force: true })

    cy.intercept("**/friendly_games", {fixture: "start-game.json"})
    cy.get("button").eq(1).click()

    cy.get(".dashboard-header").should("exist").should("have.descendants", "h1")
    cy.get(".dashboard-header")
      .should("exist")
      .should("have.descendants", "button")

    cy.get(".new-game-link-container")
      .should("exist")
      .should("have.descendants", "p.new-game-link-text")

    cy.get(".new-game-link-text")
      .should("exist")
      .should("have.descendants", "span.new-game-link")

    cy.get(".new-game-link").should("exist")
    // .should("have.text", `${URL_ROOT}/game/test`)

  })
})
