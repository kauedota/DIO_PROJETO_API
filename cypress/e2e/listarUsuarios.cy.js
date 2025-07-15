/// <reference types="cypress" />

const baseUrl = 'http://localhost:3000/usuarios';

describe('Listar usuários cadastrados', () => {

    // 🔰 1. Listar todos os usuários cadastrados
    // Espera-se status 200 e ao menos um usuário com campos preenchidos
    it('Listar usuários cadastrados - SUCESSO', () => {
        cy.api({
            method: 'GET',
            url: baseUrl,
            headers: { 'Accept-Language': 'en-us' }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.quantidade).to.be.greaterThan(0);
            expect(response.body.usuarios[0].nome).to.exist;
            expect(response.body.usuarios[0].email).to.exist;
            expect(response.body.usuarios[0].password).to.exist;
            expect(response.body.usuarios[0].administrador).to.exist;
            expect(response.body.usuarios[0]._id).to.exist;
        });
    });

    // 🔰 2. Listar usuário por ID válido
    // Espera retorno de um único usuário específico
    it('Listar usuário por ID - SUCESSO', () => {
        cy.api({
            method: 'GET',
            url: `${baseUrl}?_id=0uxuPY0cbmQhpEz1`,
            headers: { 'Accept-Language': 'en-us' }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.quantidade).to.eq(1);
            expect(response.body.usuarios[0].nome).to.eq('Fulano da Silva');
            expect(response.body.usuarios[0].email).to.eq('fulano@qa.com');
            expect(response.body.usuarios[0].password).to.eq('teste');
            expect(response.body.usuarios[0].administrador).to.eq('true');
        });
    });

    // 🔰 3. Buscar usuário por ID inexistente
    // Espera erro 400 com mensagem apropriada
    it('Buscar usuário por ID inexistente - FALHA', () => {
        cy.api({
            method: 'GET',
            url: `${baseUrl}/0uxuPY0cbmQhpEz5`,
            headers: { 'Accept-Language': 'en-us' },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.message).to.eq('Usuário não encontrado');
        });
    });

    // 🔰 4. Buscar usuário por nome completo (válido)
    it('Buscar usuário por nome - SUCESSO', () => {
        cy.api({
            method: 'GET',
            url: `${baseUrl}?nome=Fulano%20da%20Silva`,
            headers: { 'Accept-Language': 'en-us' }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.quantidade).to.eq(1);
            expect(response.body.usuarios[0].nome).to.eq('Fulano da Silva');
        });
    });

    // 🔰 5. Buscar usuário por nome inexistente
    // Espera retorno com quantidade 0, sem erro
    it('Buscar usuário por nome inexistente - FALHA', () => {
        cy.api({
            method: 'GET',
            url: `${baseUrl}?nome=Fulanoo%20da%20Silva`,
            headers: { 'Accept-Language': 'en-us' }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.quantidade).to.eq(0);
        });
    });

    // 🔰 6. Buscar usuário por e-mail válido
    it('Buscar usuário por e-mail - SUCESSO', () => {
        cy.api({
            method: 'GET',
            url: `${baseUrl}?email=fulano@qa.com`,
            headers: { 'Accept-Language': 'en-us' }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.quantidade).to.eq(1);
            expect(response.body.usuarios[0].email).to.eq('fulano@qa.com');
        });
    });

    // 🔰 7. Buscar usuário por e-mail inválido
    // Espera erro de validação (400)
    it('Buscar usuário por e-mail inválido - FALHA', () => {
        cy.api({
            method: 'GET',
            url: `${baseUrl}?email=heudis9d`, // E-mail malformado
            headers: { 'Accept-Language': 'en-us' },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.email).to.eq('email deve ser um email válido');
        });
    });

    // 🔰 8. Buscar usuários administradores
    // Espera retornar todos os usuários com campo administrador=true
    it('Buscar usuários administradores - SUCESSO', () => {
        cy.api({
            method: 'GET',
            url: `${baseUrl}?administrador=true`,
            headers: { 'Accept-Language': 'en-us' }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.quantidade).to.be.greaterThan(0);
            response.body.usuarios.forEach(usuario => {
                expect(usuario.administrador).to.eq('true');
            });
        });
    });

    // 🔰 9. Buscar usuários por senha
    // Apenas para testar o campo diretamente no filtro (não comum em APIs reais)
    it('Buscar usuários por senha - SUCESSO', () => {
        cy.api({
            method: 'GET',
            url: `${baseUrl}?password=teste`,
            headers: { 'Accept-Language': 'en-us' }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.quantidade).to.be.greaterThan(0);
            response.body.usuarios.forEach(usuario => {
                expect(usuario.password).to.eq('teste');
            });
        });
    });

});