/* eslint-disable jest/valid-expect */
/* eslint-disable no-undef */
/// <reference types="cypress" />

describe("Show dashboard", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/")
  })

  it.only("should display the dashboard", () => {
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

    cy.get(".rules-text").eq(0)
      .should("have.text", '♟Click Start A New ChessPedition and send the game URL to your opponent.')

    cy.get(".rules-text")
      .should("have.descendants", "span.chess-piece")

    cy.get("")
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
      .should("have.text", "Previous Game End:")
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
    
    cy.get(".thumbnail-text")
    .should("have.text", "test user name")

    cy.wait(2000)

    cy.get("button").eq(0).click()

    cy.location().should((loc) => {
      expect(loc.host).to.eq("localhost:3000")
      expect(loc.href).to.eq("http://localhost:3000/")
    })
  })

  it("should start a new game", () => {
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
      expect(loc.host).to.eq("localhost:3000")
      expect(loc.href).to.eq("http://localhost:3000/game/test")
    })
  })
})
