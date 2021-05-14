/* eslint-disable jest/valid-expect */
/* eslint-disable no-undef */
/// <reference types="cypress" />

describe("Sign Up and Log In", () => {
  it("should display the login screen", () => {
    cy.viewport(1000, 1000)
    cy.visit(Cypress.env("URL_ROOT"))
    cy.get(".splash").should("exist").should("have.descendants", "section")

    cy.get(".login-modal").should("exist").should("have.descendants", "h1")

    cy.get(".title").should("exist").should("have.text", "ChessPedition")

    cy.get(".form-wrapper")
      .should("exist")
      .should("have.text", "Username:Password:ENTER")
      .should("have.descendants", "form")

    cy.get(".form").should("exist").should("have.descendants", "label")

    cy.get(".label")
      .eq(0)
      .should("exist")
      .should("have.text", "Username:")
      .should("have.descendants", "br")
      .should("have.descendants", "input")

    cy.get("input")
      .eq(0)
      .should("exist")
      .should("have.attr", "type", "text")
      .should("have.attr", "class", "input")
      .should("have.attr", "name", "username")

    cy.get(".label")
      .eq(1)
      .should("exist")
      .should("have.text", "Password:")
      .should("have.descendants", "br")
      .should("have.descendants", "input")

    cy.get("input")
      .eq(1)
      .should("exist")
      .should("have.attr", "type", "password")
      .should("have.attr", "class", "input")
      .should("have.attr", "name", "password")

    cy.get(".log-in-wrapper")
      .should("exist")
      .should("have.descendants", "button")

    cy.get(".enter-button").should("exist").should("have.text", "ENTER")

    cy.get(".signup-button").should("exist").should("have.text", "Show Account Creation")
  })

  it("should display the sign up screen", () => {
    cy.viewport(1000, 1000)
    cy.visit(Cypress.env("URL_ROOT"))
    cy.get(".signup-button").click()

    cy.get(".splash").should("exist").should("have.descendants", "section")

    cy.get(".login-modal").should("exist").should("have.descendants", "h1")

    cy.get(".title").should("exist").should("have.text", "ChessPedition")

    cy.get(".form-wrapper")
      .should("exist")
      .should("have.text", "Username:Password:Confirm Password:ENTER")
      .should("have.descendants", "form")

    cy.get(".form").should("exist").should("have.descendants", "label")

    cy.get(".label")
      .eq(0)
      .should("exist")
      .should("have.text", "Username:")
      .should("have.descendants", "br")
      .should("have.descendants", "input")

    cy.get("input")
      .eq(0)
      .should("exist")
      .should("have.attr", "type", "text")
      .should("have.attr", "class", "input")
      .should("have.attr", "name", "username")

    cy.get(".label")
      .eq(1)
      .should("exist")
      .should("have.text", "Password:")
      .should("have.descendants", "br")
      .should("have.descendants", "input")

    cy.get("input")
      .eq(1)
      .should("exist")
      .should("have.attr", "type", "password")
      .should("have.attr", "class", "input")
      .should("have.attr", "name", "password")
    cy.get(".label")
      .eq(1)
      .should("exist")
      .should("have.text", "Password:")
      .should("have.descendants", "br")
      .should("have.descendants", "input")

    cy.get("input")
      .eq(2)
      .should("exist")
      .should("have.attr", "type", "password")
      .should("have.attr", "class", "input")
      .should("have.attr", "name", "confirmPassword")

    cy.get(".log-in-wrapper")
      .should("exist")
      .should("have.descendants", "button")

    cy.get(".enter-button").should("exist").should("have.text", "ENTER")

    cy.get(".signup-button").should("exist").should("have.text", "Show Login")
  })

  it("should sign up the user", () => {
    cy.viewport(1000, 1000)
    const URL_ROOT = Cypress.env("URL_ROOT")
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

    cy.location().should((loc) => {
      expect(loc.host).to.eq("localhost:3000")
      expect(loc.href).to.eq(`${URL_ROOT}/dashboard`)
    })
  })
})
