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
  it('deletes account', function() {
    cy.visit(`http://localhost:3000/login`)
    cy.get(`[data-test="email"]`).type('test@test.com')
    cy.get(`[data-test="password"]`).type('test123')
    cy.get(`[data-test="login"]`).click()
    cy.get(`[data-test="myAccount"]`).click()
    cy.contains(username)
    cy.get(`[data-test="deleteAccount"]`).click()
    cy.url().should('not.include', username)
    cy.visit(`http://localhost:3000/login`)
    cy.get(`[data-test="email"]`).type('test@test.com')
    cy.get(`[data-test="password"]`).type('test123')
    cy.get(`[data-test="login"]`).click()
    cy.url().should('not.include', username)
  })
})

// logout
// login
// not authenticated then you get reduirected from path or create
// delete account

// create task
// edit task
// complete task
// create task with hashtag
// filter by hashtag
// delete task
// delete account

// path => path.com/josh (will need to check that not is not taken)
// edit date
// draganddrop
// reviews
