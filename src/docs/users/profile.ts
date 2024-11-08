// profileDocs.js
export const profileDocs = {
  schema: {
    description: 'Rota para retornar o perfil do usuário autenticado.',
    tags: ['users'],
    security: [{ ApiToken: [] }],
    response: {
      200: {
        description: 'Perfil do usuário autenticado',
        type: 'object',
        properties: {
          id: { type: 'string', description: 'ID do usuário' },
          name: { type: 'string', description: 'Nome do usuário' },
          email: {
            type: 'string',
            format: 'email',
            description: 'Email do usuário',
          },
          role: { type: 'string', description: 'Função do usuário' },
          address: {
            type: 'object',
            properties: {
              street: { type: 'string', description: 'Rua do endereço' },
              city: { type: 'string', description: 'Cidade do endereço' },
              postalCode: {
                type: 'string',
                description: 'Código postal do endereço',
              },
              latitude: { type: 'number', description: 'Latitude do endereço' },
              longitude: {
                type: 'number',
                description: 'Longitude do endereço',
              },
              complement: {
                type: 'string',
                description: 'Complemento do endereço',
              },
            },
          },
        },
      },
      401: {
        description: 'Não autorizado. Token JWT inválido ou ausente.',
      },
      500: {
        description: 'Erro no servidor.',
      },
    },
  },
}
