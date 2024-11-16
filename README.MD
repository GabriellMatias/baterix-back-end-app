
# Baterix - Back-End

Este repositório contém o back-end do Baterix, um projeto que visa facilitar o descarte correto de resíduos eletrônicos. A plataforma conecta usuários a empresas e locais de coleta e também oferece um blog onde as pessoas podem se informar e interagir sobre práticas sustentáveis.

O back-end foi desenvolvido com Node.js e Prisma ORM, utilizando uma arquitetura limpa para garantir um código bem organizado e escalável.

## Sumário

- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Uso](#uso)
- [Contribuição](#contribuição)
- [Licença](#licença)

## Funcionalidades

- **Autenticação de Usuários:** Gerenciamento de autenticação e autorização de usuários.
- **Localização de Pontos de Descarte:** API para localizar pontos de descarte próximos ao usuário.
- **Blog e Comentários:** Gerenciamento de posts e comentários.
- **Administração de Empresas Parceiras:** Empresas que colaboram com a coleta e descarte de eletrônicos podem gerenciar seus locais de coleta.

## Tecnologias

- **Node.js**: Ambiente de execução do JavaScript para o back-end.
- **Prisma ORM**: ORM utilizado para manipulação de banco de dados.
- **PostgreSQL**: Banco de dados relacional.
- **Express.js**: Framework para criação da API.
- **Arquitetura Limpa**: Estrutura de organização do projeto para separação de responsabilidades e maior escalabilidade.

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seuusuario/baterix-backend.git
   ```

2. Instale as dependências:
   ```bash
  npm install
  ```

## Configuração do Banco de Dados
Configure as variáveis de ambiente em .env para conectar ao seu banco de dados PostgreSQL:
```bash
  DATABASE_URL="postgresql://usuario:senha@localhost:5432/baterix"
  ```    
       
## Executando Migrações
Para criar as tabelas no banco de dados:

```bash
  npx prisma migrate dev
  ``` 

## Uso
Para iniciar o servidor de desenvolvimento:

1. Clone o repositório:
   ```bash
   npm run start:dev
  ```
O servidor estará rodando em http://localhost:333.

## Rotas Principais
- POST /auth/register - Registrar um novo usuário.
- POST /auth/login - Login do usuário.
- GET /locations - Retorna locais de descarte próximos.
- GET /posts - Lista de posts do blog.
- POST /comments - Adiciona um comentário a um post.
## Contribuição
Contribuições são bem-vindas! Siga os passos para abrir um pull request:

Faça um fork do projeto.
Crie uma nova branch (git checkout -b feature/sua-feature).
Commit suas mudanças (git commit -am 'Adiciona nova feature').
Envie para a branch (git push origin feature/sua-feature).
Abra um pull request.
## Licença
Distribuído sob a licença MIT. Veja LICENSE para mais informações.