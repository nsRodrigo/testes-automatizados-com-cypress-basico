// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => { 
    cy.get('#firstName').should('be.visible').type('Rodrigo').should('have.value', 'Rodrigo');
    cy.get('#lastName').should('be.visible').type('Silva').should('have.value', 'Silva');
    cy.get('#email').should('be.visible').type('rodrigo@automacao.com').should('have.value', 'rodrigo@automacao.com');
    cy.get('#open-text-area').should('be.visible').type('Exercicio - Aula 02').should('have.value', 'Exercicio - Aula 02');
    cy.contains('button', 'Enviar').should('be.visible').click();
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
