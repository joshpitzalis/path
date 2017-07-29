const username = 'tester'

describe('authentication', function() {
  it('signs up from homepage', function() {
    cy.visit('http://localhost:3000/')
    cy.get(`[data-test="signin"]`).click()
    cy.get(`[data-test="needToCreateAccount"]`).click()
    cy.get(`[data-test="username"]`).type(username)
    cy.get(`[data-test="email"]`).type('test@test.com')
    cy.get(`[data-test="password"]`).type('test123')
    cy.get(`[data-test="login"]`).click()
    cy.url().should('include', username)
  })
  it('logs in and logs out', function() {
    cy.visit(`http://localhost:3000/login`)
    cy.get(`[data-test="email"]`).type('test@test.com')
    cy.get(`[data-test="password"]`).type('test123')
    cy.get(`[data-test="login"]`).click()
    cy.url().should('include', username)
    cy.get(`[data-test="logout"]`).click()
    cy.url().should('not.include', username)
  })
})

// not authenticated then you get reduirected from path or create
