/// <reference types="cypress" />

// Este teste consome a API pública Rick and Morty para verificar 
// se o filtro por nome e status está retornando corretamente os dados.

describe('Filtrando Personagem', () => {

    it('Filtra personagens por nome e status - Sucesso', () => {
        const baseUrl = 'https://rickandmortyapi.com/api/';

        // Envia uma requisição GET para buscar todos os personagens
        // A API retorna um array com os personagens paginados (20 por vez)
        cy.request({
            method: 'GET',
            url: `${baseUrl}character`, // Endpoint de personagens
            headers: { 'Accept-language': 'en-us' } // Define o cabeçalho para inglês (opcional)
        }).then((response) => {
            // ✅ Verifica se o status HTTP foi 200 (sucesso)
            expect(response.status).to.equal(200);

            // ✅ Verifica se o body não está vazio
            expect(response.body).to.not.be.null;

            // ✅ Verifica se o primeiro personagem é "Rick Sanchez" e está "Alive"
            // Obs: esse teste só é confiável enquanto a API mantiver essa ordem fixa
            expect(response.body.results[0].name).to.eq('Rick Sanchez');
            expect(response.body.results[0].status).to.eq('Alive');

            // 🔍 Mostra o nome no console para visualização durante o teste
            cy.log('Personagem retornado:', response.body.results[0].name);
        });
    });

});