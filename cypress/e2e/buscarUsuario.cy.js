/// <reference types="cypress" />

// URL base da API que estamos testando
const baseUrl = 'http://localhost:3000';

// ID de um usuário válido, previamente cadastrado no banco da ServeRest
const idUsuario = '0uxuPY0cbmQhpEz1';

describe('Buscar Usuário por ID', () => {

    // Teste 1: Buscar um usuário válido (espera sucesso)
    it('Buscar usuário por ID correto - SUCESSO', () => {
        cy.request({
            method: 'GET', // Método HTTP correto
            url: `${baseUrl}/usuarios/${idUsuario}`, // Monta a URL com o ID válido
            headers: { 'Accept-Language': 'en-us' } // Cabeçalho para linguagem (opcional)
        }).then((response) => {
            expect(response.status).to.eq(200); // Verifica se retornou status 200
            expect(response.body._id).to.eq(idUsuario); // Verifica se o ID retornado bate com o enviado
        });
    });

    // Teste 2: Buscar um usuário com ID incorreto (espera falha 400)
    it('Buscar usuário por ID incorreto - FALHA', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/usuarios/0uxuPY0cbmQhpEz0`, // ID inexistente
            headers: { 'Accept-Language': 'en-us' },
            failOnStatusCode: false // Impede que o Cypress interrompa o teste por causa do erro esperado
        }).then((response) => {
            expect(response.status).to.eq(400); // Espera erro 400 (usuário não encontrado)
            expect(response.body.message).to.eq('Usuário não encontrado'); // Verifica mensagem de erro
        });
    });

    // Teste 3: Buscar com ID menor que 16 caracteres (espera erro de validação)
    it('Buscar usuário com ID com menos de 16 caracteres - FALHA', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/usuarios/0uxuPY0cbmQhpEz`, // Apenas 15 caracteres
            headers: { 'Accept-Language': 'en-us' },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.id).to.eq('id deve ter exatamente 16 caracteres alfanuméricos');
        });
    });

    // Teste 4: Buscar com ID maior que 16 caracteres (espera erro de validação)
    it('Buscar usuário com ID com mais de 16 caracteres - FALHA', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/usuarios/0uxuPY0cbmQhpEz01`, // 17 caracteres
            headers: { 'Accept-Language': 'en-us' },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.id).to.eq('id deve ter exatamente 16 caracteres alfanuméricos');
        });
    });

});
