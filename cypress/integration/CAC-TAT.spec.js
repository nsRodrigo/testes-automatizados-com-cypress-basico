/// <reference types="cypress" />
describe('Central de Atendimento ao Cliente TAT', function () {

    const mls = 3000;

    beforeEach(() => {
        cy.visit('./src/cactat/index.html');
    });

    it('verifica o título da aplicação', () => {
        cy.title().should('eql', 'Central de Atendimento ao Cliente TAT');
    })

    it('preenche os campos obrigatórios e envia o formulário', () => {
        cy.clock();
        cy.get('#firstName').should('be.visible').type('Rodrigo').should('have.value', 'Rodrigo');
        cy.get('#lastName').should('be.visible').type('Silva').should('have.value', 'Silva');
        cy.get('#email').should('be.visible').type('rodrigo@automacao.com').should('have.value', 'rodrigo@automacao.com');
        cy.get('#open-text-area').should('be.visible').type('Exercicio - Aula 02').should('have.value', 'Exercicio - Aula 02');
        cy.contains('button', 'Enviar').should('be.visible').click();
        cy.get('.success > strong').should('be.visible').and('have.text', 'Mensagem enviada com sucesso.');
        cy.tick(mls).get('.success > strong').should('not.be.visible');
    });

    it('preenche campo area de texto com um texto longo usando delay 0', () => {
        const longText = Cypress._.repeat('Exercicio Extra 1 - Aula 02', 10)
        cy.get('#open-text-area').should('be.visible').type(longText, { delay: 0 })
            .should('have.value', longText);
    });

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.clock();
        cy.get('#firstName').should('be.visible').type('Rodrigo').should('have.value', 'Rodrigo');
        cy.get('#lastName').should('be.visible').type('Silva').should('have.value', 'Silva');
        cy.get('#email').should('be.visible').type('automacao.com').should('have.value', 'automacao.com');
        cy.get('#open-text-area').should('be.visible').type('Exercicio Extra 2 - Aula 02').should('have.value', 'Exercicio Extra 2 - Aula 02');
        cy.contains('button', 'Enviar').should('be.visible').click();
        cy.get('.error > strong').should('be.visible').and('have.text', 'Valide os campos obrigatórios!');
        cy.tick(mls).get('.error > strong').should('not.be.visible');
    });

    it('caracter inválido no campo telefone', () => {
        cy.get('#phone').should('be.visible').type('caracterInválido').should('have.value', '');
        cy.get('#phone').should('be.visible').type('11944445555').should('have.value', '11944445555');
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.clock();
        cy.get('#firstName').should('be.visible').type('Rodrigo').should('have.value', 'Rodrigo');
        cy.get('#lastName').should('be.visible').type('Silva').should('have.value', 'Silva');
        cy.get('#email').should('be.visible').type('automacao.com').should('have.value', 'automacao.com');
        cy.get('#phone-checkbox').check();
        cy.get('#open-text-area').should('be.visible').type('Exercicio Extra 4 - Aula 02').should('have.value', 'Exercicio Extra 4 - Aula 02');
        cy.contains('button', 'Enviar').should('be.visible').click();
        cy.get('.error > strong').should('be.visible').and('have.text', 'Valide os campos obrigatórios!');
        cy.tick(mls).get('.error > strong').should('not.be.visible');
    });


    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName').should('be.visible').type('Rodrigo').should('have.value', 'Rodrigo').clear().should('have.value', '');
        cy.get('#lastName').should('be.visible').type('Silva').should('have.value', 'Silva').clear().should('have.value', '');
        cy.get('#email').should('be.visible').type('automacao.com').should('have.value', 'automacao.com').clear().should('have.value', '');
        cy.get('#phone').should('be.visible').type('11944445555').should('have.value', '11944445555').clear().should('have.value', '');
    });

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.clock();
        cy.contains('button', 'Enviar').should('be.visible').click();
        cy.get('.error > strong').should('be.visible').and('have.text', 'Valide os campos obrigatórios!');
        cy.tick(mls).get('.error > strong').should('not.be.visible');
    });

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.clock();
        cy.fillMandatoryFieldsAndSubmit();
        cy.get('.success > strong').should('be.visible').and('have.text', 'Mensagem enviada com sucesso.');
        cy.tick(mls).get('.success > strong').should('not.be.visible');
    });

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('select').should('be.visible').select('YouTube').should('have.value', 'youtube');
    });

    it('seleciona um produto (mentoria) por seu value', () => {
        cy.get('select').should('be.visible').select('mentoria').should('have.value', 'mentoria');
    });

    it('seleciona um produto (Blog) por seu indice', () => {
        cy.get('select').should('be.visible').select(1).should('have.value', 'blog');
    });

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]').check().should('be.checked');
    });

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]').should('have.length', 3).each(($radio) => {
            cy.wrap($radio).check();
            cy.wrap($radio).should('be.checked');
        });
    });

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
            .check().should('be.checked')
            .last().uncheck().should('not.be.checked');
    });

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]').should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should((input) => {
                expect(input[0].files[0].name).to.equal('example.json');
            });
    });

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]').should('not.have.value')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
            .should((input) => {
                expect(input[0].files[0].name).to.equal('example.json');
            });
    });

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile');
        cy.get('input[type="file"]').should('not.have.value')
            .selectFile('@sampleFile')
            .should((input) => {
                expect(input[0].files[0].name).to.equal('example.json');
            });
    });


    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.contains('a', 'Política de Privacidade').should('have.attr', 'target', '_blank').click();
    });

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.contains('a', 'Política de Privacidade').invoke('removeAttr', 'target').click()
        cy.contains('CAC TAT - Política de privacidade').should('be.visible');
    });

    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', () => {
        cy.get('.success').should('not.be.visible').invoke('show').should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.').invoke('hide').should('not.be.visible');
        cy.get('.error').should('not.be.visible').invoke('show').should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!').invoke('hide').should('not.be.visible');
    });

    it('preenche a area de texto usando o comando invoke', () => {
        const longText = Cypress._.repeat('Exercicio Extra 1 - Aula 02', 10)
        cy.get('#open-text-area').invoke('val', longText)
            .should('have.value', longText);
    });

    Cypress._.times(1, () => {

        it.only('faz uma requisição HTTP', () => {
            cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
                .should((response) => {
                    const { status, statusText, body } = response
                    expect(status).to.eql(200);
                    expect(statusText).to.eql('OK');
                    expect(body).to.include('CAC TAT');
                });
        });
    });
});