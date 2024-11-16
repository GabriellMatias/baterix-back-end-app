// refreshDocs.js
export const refreshDocs = {
  schema: {
    description:
      'Rota para atualizar o token de acesso utilizando o refresh token.',
    tags: ['users'],
    body: {
      type: 'object',
      properties: {
        refreshToken: { type: 'string', description: 'Token de atualização' },
      },
      required: ['refreshToken'],
    },
    response: {
      200: {
        description: 'Token de acesso atualizado com sucesso.',
        type: 'object',
        properties: {
          accessToken: { type: 'string', description: 'Novo token de acesso' },
        },
      },
      400: {
        description: 'Token de refresh inválido.',
      },
      500: {
        description: 'Erro no servidor.',
      },
    },
  },
}
