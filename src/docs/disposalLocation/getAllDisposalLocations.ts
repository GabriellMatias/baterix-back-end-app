// Documentação para obtenção de todos os locais de descarte
export const getAllDisposalLocationsDocs = {
  schema: {
    tags: ['disposalLocation'],
    description: 'Retrieve all disposal locations',
    response: {
      200: {
        description: 'List of disposal locations',
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            address: {
              type: 'object',
              properties: {
                street: { type: 'string' },
                city: { type: 'string' },
                postalCode: { type: 'string' },
                latitude: { type: 'number' },
                longitude: { type: 'number' },
                complement: { type: 'string' },
              },
            },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
    security: [{ ApiToken: [] }],
  },
}
