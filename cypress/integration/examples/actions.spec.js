/* eslint-disable no-undef */
/// <reference types="cypress" />

context("Actions", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/")
  })

  it("should display the login screen", () => {
    cy.get(".splash").should("exist").should("have.descendants", "section")

    cy.get(".login-modal").should("exist").should("have.descendants", "h1")

    cy.get(".title").should("exist").should("have.text", "ChessPedition")

    cy.get(".form-wrapper")
      .should("exist")
      .should("have.text", "Username:Password:Enter")
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
    
    cy.get(".log-in")
      .should("exist")
      .should("have.text", "Enter")

    cy.get(".signup-button")
      .should("exist")
      .should("have.text", "Sign Up")
  })

  it("should display the sign up screen", () => {
    cy.get(".signup-button")
      .click()

    cy.get(".splash").should("exist").should("have.descendants", "section")

    cy.get(".login-modal").should("exist").should("have.descendants", "h1")

    cy.get(".title").should("exist").should("have.text", "ChessPedition")

    cy.get(".form-wrapper")
      .should("exist")
      .should("have.text", "Username:Password:Confirm Password:Enter")
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

    cy.get(".log-in").should("exist").should("have.text", "Enter")

    cy.get(".signup-button").should("exist").should("have.text", "Log In")
  })
})
