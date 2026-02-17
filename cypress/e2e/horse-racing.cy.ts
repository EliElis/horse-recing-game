const generateBtn = '[data-testid="generate-schedule"]'
const startBtn = '[data-testid="start-race"]'
const pauseBtn = '[data-testid="pause-race"]'
const resetBtn = '[data-testid="reset-race"]'
const notice = '[data-testid="race-notice"]'

describe('Horse Racing Game', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('Initial State', () => {
    it('shows the horse list with 20 horses', () => {
      cy.get('.horse-list').should('be.visible')
      cy.get('.horse-list tbody tr').should('have.length', 20)
    })

    it('shows empty state with placeholders', () => {
      cy.get('.race-tracking-placeholder').should('be.visible')
      cy.get(notice).should('contain', 'Generate a schedule')
      cy.get(generateBtn).should('be.visible')
    })
  })

  describe('Schedule Generation', () => {
    it('generates schedule with rounds and race lanes', () => {
      cy.get(generateBtn).click()
      cy.get('.accordion-item').should('have.length.at.least', 6)
      cy.get('.race-tracking-placeholder').should('not.exist')
      cy.get('.race-tracking-lane').should('have.length', 10)
    })

    it('shows correct buttons and notice after generation', () => {
      cy.get(generateBtn).click()
      cy.get(startBtn).should('be.visible')
      cy.get(resetBtn).should('be.visible')
      cy.get(generateBtn).should('not.exist')
      cy.get(notice).should('contain', 'START')
    })
  })

  describe('Race Execution', () => {
    beforeEach(() => {
      cy.get(generateBtn).click()
    })

    it('starts the race with running horses and shows Pause button', () => {
      cy.get(startBtn).click()
      cy.get(pauseBtn).should('be.visible')
      cy.get('.running-horse').should('have.length', 10)
    })

    it('pauses and resumes the race', () => {
      cy.get(startBtn).click()
      cy.get(pauseBtn).click()
      cy.get(notice).should('contain', 'paused')
      cy.get(startBtn).should('be.visible')
      cy.get(startBtn).click()
      cy.get(pauseBtn).should('be.visible')
    })

    it('completes a round and shows results', () => {
      cy.get(startBtn).click()
      cy.get(notice, { timeout: 30000 }).should('contain', 'finished')
      cy.get('.race-results .accordion-item').should('have.length', 1)
    })

    it('runs through all 6 rounds and disables Start', () => {
      for (let i = 0; i < 6; i++) {
        cy.get(startBtn).click()
        if (i < 5) {
          cy.get(notice, { timeout: 30000 }).should('contain', 'finished')
        } else {
          cy.get(notice, { timeout: 30000 }).should('contain', 'All races')
        }
      }
      cy.get('.race-results .accordion-item').should('have.length', 6)
      cy.get(startBtn).should('be.disabled')
      cy.get(resetBtn).should('be.visible')
    })
  })

  describe('Reset', () => {
    it('resets everything back to initial state', () => {
      cy.get(generateBtn).click()
      cy.get(startBtn).click()
      cy.get('.running-horse').should('have.length', 10)
      cy.get(pauseBtn).click()
      cy.get(resetBtn).click()

      cy.get(generateBtn).should('be.visible')
      cy.get('.race-tracking-placeholder').should('be.visible')
      cy.get(notice).should('contain', 'Generate a schedule')
    })
  })
})
