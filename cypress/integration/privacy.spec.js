Cypress._.times(3, () => {
    it.only('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.visit('./src/cactat/privacy.html');
        cy.contains('CAC TAT - Política de privacidade').should('be.visible');
    });
});