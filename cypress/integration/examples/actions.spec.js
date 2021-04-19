/* eslint-disable no-undef */
/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/")
  })

  it('should display the login screen', () => {
    cy.get('.splash')
      .should('exist')

      
  })

  
})
