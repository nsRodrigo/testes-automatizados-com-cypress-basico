describe('cy.handsOn("maxlength")', () => {
    const text = Cypress._.repeat('1234567890', 101)
    const firstThousandChars = text.substring(0, 1000)
  
    beforeEach(() => {
      cy.visit('src/textarea/index.html')
      cy.log(`Text has lenghth of: ${text.length}`)
      cy.log(`Textarea has max lenghth of: ${firstThousandChars.length}`)
    })
  
    it('slowly fills a textarea field', () => {
      cy.get('textarea')
        .type(text)
        .should('have.value', firstThousandChars)
    })
  
    it('quickly fills a textarea field', () => {
      cy.get('textarea')
        .type(text, { delay: 0 })
        .should('have.value', firstThousandChars)
    })
  
    it('simply asserts on the textarea\'s maxlength attribute value', () => {
      cy.get('textarea').should('have.attr', 'maxLength', '1000')
    })
  })