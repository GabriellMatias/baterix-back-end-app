

# Baterix Backend App

## Instalação e Configuração

### Passos para executar o projeto

1. **Instale as dependências**:
   ```bash
   npm install
   ```

2. **Gere o schema do Prisma**:
   ```bash
   npx prisma generate
   ```

3. **Execute a migração do banco de dados**:
   ```bash
   npx prisma migrate dev
   ```

### Configuração do ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes configurações:

```env
NODE_ENV='dev'

# Database
DATABASE_URL="postgresql://postgres:123@localhost:5432/baterix"

# Auth
JWT_SECRET='aaa'
```

### Iniciar o servidor

Execute o comando abaixo para iniciar o servidor em modo de desenvolvimento:

```bash
npm run start:dev
```

### Executar testes

Para executar os testes, use o comando:

```bash
npm run test
```
