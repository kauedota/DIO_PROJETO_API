/// <reference types="cypress" />

// Endpoint de login da API ServeRest
const baseUrl = 'http://localhost:3000/login';

// Credenciais válidas para login
const email = 'fulano@qa.com';
const password = 'teste';

describe('Login de usuário - Validações de sucesso e falha', () => {

    // 🔰 1. Login com credenciais válidas
    // Espera-se status 200, mensagem de sucesso e retorno do token (authorization)
    it('Realiza login com sucesso', () => {
        cy.api({
            method: 'POST',
            url: baseUrl,
            headers: { 'Accept-Language': 'en-us' },
            body: {
                email: email,
                password: password
            }
        }).then((response) => {
            expect(response.status).to.equal(200); // Confirma sucesso no login
            expect(response.body.message).to.eq('Login realizado com sucesso');
            expect(response.body.authorization).to.exist; // Verifica se retornou token
            cy.log('Token retornado:', response.body.authorization); // Loga o token no Cypress
        });
    });

    // 🔰 2. Tentativa de login com e-mail inválido
    // Espera-se erro 401 e mensagem de e-mail/senha inválidos
    it('Tenta login com usuário inválido - FALHA', () => {
        cy.api({
            method: 'POST',
            url: baseUrl,
            headers: { 'Accept-Language': 'en-us' },
            failOnStatusCode: false, // Impede falha automática com erro esperado
            body: {
                email: 'fulano1@qa.com', // E-mail incorreto
                password: password
            }
        }).then((response) => {
            expect(response.status).to.equal(401); // Erro de autenticação
            expect(response.body.message).to.eq('Email e/ou senha inválidos');
        });
    });

    // 🔰 3. Tentativa de login com senha incorreta
    // Também espera erro 401 e a mesma mensagem genérica
    it('Tenta login com senha inválida - FALHA', () => {
        cy.api({
            method: 'POST',
            url: baseUrl,
            headers: { 'Accept-Language': 'en-us' },
            failOnStatusCode: false,
            body: {
                email: email,
                password: 'teste1' // Senha incorreta
            }
        }).then((response) => {
            expect(response.status).to.equal(401);
            expect(response.body.message).to.eq('Email e/ou senha inválidos');
        });
    });

});