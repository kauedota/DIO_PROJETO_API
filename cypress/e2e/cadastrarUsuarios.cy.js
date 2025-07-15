/// <reference types="cypress" />

// URL base para todas as requisições
const baseUrl = 'http://localhost:3000/usuarios';

// Variáveis para armazenar os IDs dos usuários criados
let idd;   // ID do primeiro usuário: Kaue
let idd2;  // ID do segundo usuário: Antonio

describe('Teste completo de CRUD - Usuários', () => {

    // 🔰 TESTE 1 - CADASTRO DE USUÁRIO (SUCESSO)
    // Este teste cria um novo usuário com nome e e-mail únicos.
    // Espera-se que a API responda com status 201 e mensagem de sucesso.
    it('Cadastrar usuário - SUCESSO', () => {
        cy.api({
            method: 'POST',
            url: baseUrl,
            headers: { 'Accept-Language': 'en-us' },
            body: {
                nome: 'Kaue Dota',
                email: 'kaue@qa.com.br',
                password: 'dota',
                administrador: 'true'
            }
        }).then((response) => {
            expect(response.status).to.eq(201); // Verifica se criou corretamente
            expect(response.body.message).to.eq('Cadastro realizado com sucesso');
            expect(response.body._id).to.exist; // Garante que foi retornado um ID

            idd = response.body._id; // Salva o ID para os próximos testes
            cy.log('ID do usuário Kaue:', idd);
        });
    });

    // 🔰 TESTE 2 - CADASTRO REPETIDO (FALHA)
    // Tenta cadastrar novamente o mesmo usuário (mesmo e-mail)
    // Espera-se erro 400 e mensagem indicando que o e-mail já está em uso
    it('Cadastrar usuário existente - FALHA', () => {
        cy.api({
            method: 'POST',
            url: baseUrl,
            headers: { 'Accept-Language': 'en-us' },
            failOnStatusCode: false, // Necessário para não falhar automaticamente com erro 400
            body: {
                nome: 'Kaue Dota',
                email: 'kaue@qa.com.br',
                password: 'dota',
                administrador: 'true'
            }
        }).then((response) => {
            expect(response.status).to.eq(400); // Espera erro de duplicidade
            expect(response.body.message).to.eq('Este email já está sendo usado');
        });
    });

    describe('Alterar dados do usuário', () => {

        // 🔰 TESTE 3 - ALTERAÇÃO VÁLIDA
        // Altera o e-mail e senha do usuário Kaue (usando seu próprio ID)
        // Espera-se sucesso com status 200 e mensagem de alteração
        it('Alterar dados do usuário válido - SUCESSO', () => {
            cy.api({
                method: 'PUT',
                url: `${baseUrl}/${idd}`,
                headers: { 'Accept-Language': 'en-us' },
                body: {
                    nome: 'Kaue Dota',
                    email: 'kaueAlterado@qa.com.br',
                    password: 'novaSenha',
                    administrador: 'true'
                }
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.message).to.eq('Registro alterado com sucesso');
            });
        });

        // 🔰 TESTE 4 - CADASTRAR SEGUNDO USUÁRIO
        // Cadastra outro usuário com um e-mail diferente (Antonio)
        // Esse usuário será usado no próximo teste de conflito de e-mail
        it('Cadastrar novo usuário para testar conflito de e-mail - SUCESSO', () => {
            cy.api({
                method: 'POST',
                url: baseUrl,
                headers: { 'Accept-Language': 'en-us' },
                body: {
                    nome: 'Antonio Freitas',
                    email: 'antonio@qa.com.br',
                    password: 'senha123',
                    administrador: 'true'
                }
            }).then((response) => {
                expect(response.status).to.eq(201);
                expect(response.body.message).to.eq('Cadastro realizado com sucesso');
                expect(response.body._id).to.exist;

                idd2 = response.body._id;
                cy.log('ID do usuário Antonio:', idd2);
            });
        });

        // 🔰 TESTE 5 - TENTAR USAR E-MAIL JÁ EXISTENTE (FALHA)
        // Aqui tentamos alterar o e-mail de Antonio para o e-mail de Kaue
        // Esperamos que a API recuse com erro 400, por já estar em uso
        it('Alterar usuário com e-mail já existente - FALHA', () => {
            cy.api({
                method: 'PUT',
                url: `${baseUrl}/${idd2}`,
                headers: { 'Accept-Language': 'en-us' },
                failOnStatusCode: false,
                body: {
                    nome: 'Antonio Freitas',
                    email: 'kaueAlterado@qa.com.br', // e-mail já usado
                    password: 'novaSenha',
                    administrador: 'true'
                }
            }).then((response) => {
                expect(response.status).to.eq(400); // Espera falha
                expect(response.body.message).to.eq('Este email já está sendo usado');
            });
        });

    });

    describe('Remover usuários criados', () => {

        // 🔰 TESTE 6 - REMOVER USUÁRIO KAUÊ
        // Apaga o primeiro usuário criado (Kaue)
        // Verifica status 200 e mensagem de exclusão
        it('Remover usuário Kaue (idd)', () => {
            cy.api({
                method: 'DELETE',
                url: `${baseUrl}/${idd}`,
                headers: { 'Accept-Language': 'en-us' }
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.message).to.eq('Registro excluído com sucesso');
            });
        });

        // 🔰 TESTE 7 - REMOVER USUÁRIO ANTONIO
        // Apaga o segundo usuário (Antonio)
        // Finaliza o ciclo de CRUD completo
        it('Remover usuário Antonio (idd2)', () => {
            cy.api({
                method: 'DELETE',
                url: `${baseUrl}/${idd2}`,
                headers: { 'Accept-Language': 'en-us' }
            }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.message).to.eq('Registro excluído com sucesso');
            });
        });

    });

});