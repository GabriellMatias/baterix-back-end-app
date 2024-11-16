// Documentação para obter locais de descarte por ID de usuário
export const getDisposalLocationsByUserIdDocs = {
  schema: {
    tags: ['disposalLocation'],
    description: 'Get all disposal locations associated with a specific user',
    response: {
      200: {
        description: 'List of disposal locations',
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            latitude: { type: 'number', format: 'float' },
            longitude: { type: 'number', format: 'float' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
      404: {
        description: 'No disposal locations found for this user',
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
    security: [{ ApiToken: [] }],
  },
}
