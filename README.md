![Cypress Tests](https://img.shields.io/badge/Cypress-Tests-green?logo=cypress&logoColor=white)

# 🧪 DIO - Projeto de Testes de API com Cypress

Este repositório contém uma suíte completa de testes automatizados desenvolvidos em **Cypress** para validar endpoints de duas APIs:

- 🔐 [ServeRest API](https://github.com/PauloGoncalvesBH/ServeRest)
- 🧬 [Rick and Morty API](https://rickandmortyapi.com/)

---

## 🚀 Tecnologias utilizadas

- [Cypress](https://www.cypress.io/)
- [Cypress Plugin API](https://www.npmjs.com/package/cypress-plugin-api)
- JavaScript (ES6+)
- Node.js

---

## 📦 Instalação

# Clone o repositório
git clone https://github.com/kauedota/DIO_PROJETO_API.git

# Acesse o diretório
cd DIO_PROJETO_API

# Instale as dependências
npm install

✅ Como executar os testes

# Para abrir a interface do Cypress:
npx cypress open

# Para executar em modo headless (terminal):
npx cypress run

🧪 Estrutura de testes implementados
📂 ServeRest API
🔐 testesLogin.cy.js

Login com sucesso

Login com e-mail inválido

Login com senha inválida

👤 cadastrarUsuarios.cy.js

Cadastro, alteração e exclusão de usuários

Validações de e-mail duplicado

📄 listarUsuarios.cy.js

Listagem de todos os usuários

Filtro por ID, nome, e-mail e status de administrador

🔎 buscarUsuario.cy.js

Busca por ID válido, inválido, curto e longo

🧬 Rick and Morty API
🔍 filtrandoPersonagens.cy.js

Filtro por nome e status (Alive, Dead, Unknown)

Validação de mensagens de erro com nome inexistente

🧠 Autor

Desenvolvido com 💻 por Kauê Dota