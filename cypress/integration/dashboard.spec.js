/* eslint-disable jest/valid-expect */
/* eslint-disable no-undef */
/// <reference types="cypress" />

describe("Show dashboard", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/")
  })

  it("should display the dashboard", () => {
    cy.get(".signup-button").click()

    cy.get("input").eq(0).type("test user name")
    cy.get("input").eq(0).should("have.value", "test user name")

    cy.get("input").eq(1).type("testpassword")
    cy.get("input").eq(1).should("have.value", "testpassword")
    cy.get("input").eq(2).type("testpassword")
    cy.get("input").eq(2).should("have.value", "testpassword")

    cy.intercept(
      {
        method: "POST",
        url: "http://localhost:3001/api/v1/users",
      },
      {
        status: 200,
        fixture: "login.json",
      }
    )

    cy.get(".log-in").click({ force: true })

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
      .should("have.text", "test user name")

    cy.get(".greeting")
      .should("exist")
      .should("have.text", "Welcome, test user name")

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
  })

  it("should sign the user out", () => {
    cy.get(".signup-button").click()

    cy.get("input").eq(0).type("test user name")
    cy.get("input").eq(0).should("have.value", "test user name")

    cy.get("input").eq(1).type("testpassword")
    cy.get("input").eq(1).should("have.value", "testpassword")
    cy.get("input").eq(2).type("testpassword")
    cy.get("input").eq(2).should("have.value", "testpassword")

    cy.intercept(
      {
        method: "POST",
        url: "http://localhost:3001/api/v1/users",
      },
      {
        status: 200,
        fixture: "login.json",
      }
    )

    cy.get(".log-in").click({ force: true })

    cy.get(".thumbnail-text").should("have.text", "test user name")

    cy.wait(2000)

    cy.get("button").eq(0).click()

    cy.location().should((loc) => {
      expect(loc.host).to.eq("localhost:3000")
      expect(loc.href).to.eq("http://localhost:3000/")
    })
  })

  it.only("should start a new game and return to the dashboard", () => {
    cy.get(".signup-button").click()

    cy.get("input").eq(0).type("test user name")
    cy.get("input").eq(0).should("have.value", "test user name")

    cy.get("input").eq(1).type("testpassword")
    cy.get("input").eq(1).should("have.value", "testpassword")
    cy.get("input").eq(2).type("testpassword")
    cy.get("input").eq(2).should("have.value", "testpassword")

    cy.intercept(
      {
        method: "POST",
        url: "http://localhost:3001/api/v1/users",
      },
      {
        status: 200,
        fixture: "login.json",
      }
    )

    cy.get(".log-in").click({ force: true })

    cy.intercept(
      {
        method: "POST",
        url: "http://localhost:3001/api/v1/friendly_games",
      },
      {
        status: 200,
        fixture: "start-game.json",
      }
    )
    cy.get("button").eq(1).click()

    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:3000/game/test")
    })

    cy.get(".dashboard-header").should("exist").should("have.descendants", "h1")
    cy.get(".dashboard-header")
      .should("exist")
      .should("have.descendants", "button")

    cy.get(".new-game-link-container")
      .should("exist")
      .should("have.descendants", "p.new-game-link-text")

    cy.get(".new-game-link-text")
      .should("exist")
      .should(
        "have.text",
        "Send this link to a friend to start playing!http://localhost:3000/game/testThe game board will appear when the second player joins the room."
      )
      .should("have.descendants", "span.new-game-link")

    cy.get(".new-game-link")
      .should("exist")
      .should("have.text", "http://localhost:3000/game/test")

    cy.get(".game-screen-lower-third")
      .should("exist")
      .should("have.descendants", "button.leave-game")

    cy.get(".leave-game")
      .should("exist")
      .should("have.text", "Back to Dashboard")
      .click()

    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:3000/dashboard")
    })
  })
})
