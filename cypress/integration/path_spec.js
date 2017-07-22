// import { GC_USER_ID, GC_AUTH_TOKEN } from '../../src/constants.js'

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

describe('tutorials', function() {
  beforeEach('logs in', function() {
    cy.visit(`http://localhost:3000/login`)
    cy.get(`[data-test="email"]`).type('test@test.com')
    cy.get(`[data-test="password"]`).type('test123')
    cy.get(`[data-test="login"]`).click()
    cy.url().should('include', username)
  })

  afterEach('logs out', function() {
    cy.get(`[data-test="logout"]`).click()
    cy.url().should('not.include', username)
  })

  after('deletes test account', function() {
    cy.visit(`http://localhost:3000/login`)
    cy.get(`[data-test="email"]`).type('test@test.com')
    cy.get(`[data-test="password"]`).type('test123')
    cy.get(`[data-test="login"]`).click()
    cy.get(`[data-test="myAccount"]`).click()
    cy.get(`[data-test="deleteAccount"]`).click()
    cy.url().should('not.include', username)
    cy.visit(`http://localhost:3000/login`)
    cy.get(`[data-test="email"]`).type('test@test.com')
    cy.get(`[data-test="password"]`).type('test123')
    cy.get(`[data-test="login"]`).click()
    cy.url().should('not.include', username)
  })

  it('creates a task', function() {
    cy.get(`[data-test="add"]`).click()
    cy.get(`[data-test="title"]`).type('test tutorial')
    cy.get(`[data-test="author"]`).type('test author')
    cy.get(`[data-test="link"]`).type('https://www.cypress.io/')
    cy.get(`[data-test="submitTutorial"]`).click()
    // why doesn't click redirect? tk
    // test read realtime
    cy.visit(`http://localhost:3000/${username}`)
    cy.contains('test tutorial')
  })
})

// make sure task doesn't show up on someone eles profile

// filter
// edit task
// complete task
// create task with hashtag
// filter by hashtag
// delete task

// delete test account

// not authenticated then you get reduirected from path or create

// path => path.com/josh (will need to check that not is not taken)
// edit date
// draganddrop
// reviews
