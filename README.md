# API de Cadastro de Produtos com NestJS

Este projeto é uma API para cadastro de produtos desenvolvida utilizando o framework NestJS. A API permite operações CRUD (Criar, Ler, Atualizar e Deletar) em produtos, oferecendo uma estrutura escalável e eficiente para gerenciar informações de produtos.

## Tecnologias Utilizadas

- **NestJS**: Framework progressivo para construção de aplicações server-side eficientes e escaláveis.
- **TypeScript**: Linguagem de programação que adiciona tipagem estática ao JavaScript, proporcionando maior segurança e produtividade no desenvolvimento.
- **Prisma**: ORM (Object-Relational Mapping) moderno que facilita o acesso ao banco de dados com segurança e eficiência.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional utilizado para armazenar os dados dos produtos.
- **PNPM**: Gerenciador de pacotes rápido e eficiente, alternativo ao NPM e Yarn.

## Padrões de Projeto Empregados

O projeto adota diversos padrões de projeto e práticas recomendadas para garantir uma arquitetura limpa e sustentável:

- **Arquitetura Modular**: O NestJS promove uma estrutura modular, onde cada funcionalidade é encapsulada em módulos independentes. Isso facilita a manutenção e escalabilidade da aplicação.

- **Injeção de Dependências**: Utilizada para criar módulos independentes e promover a reutilização de código. Cada módulo pode depender de outros módulos sem acoplamento direto, facilitando testes e manutenção

- **Data Transfer Object (DTO)**: Padrão utilizado para transferir dados entre diferentes camadas da aplicação, garantindo a integridade e validação dos dados.

- **Decorators**: O NestJS utiliza extensivamente decorators para adicionar metadados às classes e métodos, melhorando a legibilidade e organização do código.

## Estrutura do Projeto

A estrutura de pastas e arquivos do projeto é organizada da seguinte forma:

- **prisma/**: Contém os arquivos relacionados ao Prisma, incluindo o esquema do banco de dados (`schema.prisma`).
- **src/**: Diretório principal do código-fonte da aplicação.
  - **modules/**: Contém os módulos da aplicação, como o módulo de produtos.
  - **main.ts**: Arquivo de entrada da aplicação.
- **test/**: Contém os arquivos de teste da aplicação.
- **.eslintrc.js**: Configuração do ESLint para padronização de código.
- **.prettierrc**: Configuração do Prettier para formatação de código.
- **package.json**: Contém as dependências e scripts do projeto.
- **pnpm-lock.yaml**: Arquivo de lock do PNPM para garantir a consistência das dependências.
- **tsconfig.json**: Configuração do TypeScript.

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:

- **Node.js** (versão 14 ou superior)
- **PNPM** (para instalar, execute `npm install -g pnpm`)
- **PostgreSQL** (com uma base de dados configurada)

## Instalação e Execução

Siga os passos abaixo para baixar e executar o projeto:

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/luizclaudiolc/api-cadastro-produtos-nestjs.git

2. **Acesse o diretório do projeto**:

   ```bash
   cd api-cadastro-produtos-nestjs


3. **Instale as dependências**:

   ```bash
   pnpm install

4. **Configure as variáveis de ambiente**:
- Crie um arquivo .env na raiz do projeto e defina as seguintes variáveis:

   ```bash
   DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"

- Substitua usuario, senha, localhost e nome_do_banco conforme sua configuração do PostgreSQL.

5. **Execute as migrações do banco de dados**:

   ```bash
   pnpm prisma migrate dev

6. **Inicie o servidor**:

   ```bash
   pnpm start:dev
   
- A aplicação estará disponível em http://localhost:3000.

## Endpoints Principais

A API disponibiliza os seguintes endpoints para gerenciamento de produtos:

   - POST /produtos: Cria um novo produto.
   - GET /produtos: Retorna uma lista de produtos.
   - GET /produtos/:id: Retorna os detalhes de um produto específico.
   - PATCH /produtos/:id: Atualiza as informações de um produto.
   - DELETE /produtos/:id: Remove um produto.

## Testes

Para executar os testes, utilize o comando:

```bash
   pnpm test
