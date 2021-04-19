/* eslint-disable jest/valid-expect */
/* eslint-disable no-undef */
/// <reference types="cypress" />

describe("Show dashboard", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/")
  })

  it.skip("should display the dashboard", () => {
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
      .should("have.descendants", "section.thumbnail")
    cy.get(".container")
      .should("exist")
      .should("have.descendants", "section.quest-start")
    cy.get(".container").should("exist").should("have.descendants", "br")

    cy.get(".thumbnail")
      .should("exist")
      .should("have.descendants", "div.thumbnail-image")
    cy.get(".thumbnail-image")
      .should("exist")
      .should("have.attr", "aria-label", "Player thumbnail")
    cy.get(".thumbnail-text")
      .should("exist")
      .should("have.text", "Welcome, test user name")

    cy.get(".quest-start")
      .should("exist")
      .should("have.attr", "id", "quest-start")
      .should("have.descendants", "button")
    cy.get(".start-button")
      .should("exist")
      .should("have.text", "Start A ChessPedition")

    cy.get(".previous-game-header")
      .should("exist")
      .should("have.text", "Previous Game End:")

    cy.get(".gameboard-wrapper")
      .should("exist")
      .should("have.descendants", "div")
      .children()
      .should("exist")
      .children()
      .should("exist")
      .should("have.attr", "style")
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
    .should("have.text", "Welcome, test user name")

    cy.wait(2000)

    cy.get("button").eq(0).click()

    cy.location().should((loc) => {
      expect(loc.host).to.eq("localhost:3000")
      expect(loc.href).to.eq("http://localhost:3000/")
    })
  })
})
