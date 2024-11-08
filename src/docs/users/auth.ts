// authenticateDocs.js
export const authenticateDocs = {
  schema: {
    description:
      'Rota para autenticação do usuário, gerando um token de sessão.',
    tags: ['users'],
    body: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          format: 'email',
          description: 'Email do usuário',
        },
        password: { type: 'string', description: 'Senha do usuário' },
      },
      required: ['email', 'password'],
    },
    response: {
      200: {
        description: 'Usuário autenticado com sucesso',
        type: 'object',
        properties: {
          accessToken: { type: 'string', description: 'Token de acesso' },
          refreshToken: { type: 'string', description: 'Token de atualização' },
        },
      },
      401: {
        description: 'Credenciais inválidas',
      },
      500: {
        description: 'Erro no servidor.',
      },
    },
  },
}
