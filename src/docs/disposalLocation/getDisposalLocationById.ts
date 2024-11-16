// Documentação para obtenção de um local de descarte por ID
export const getDisposalLocationByIdDocs = {
  schema: {
    tags: ['disposalLocation'],
    description: 'Get a disposal location by ID',
    params: {
      type: 'object',
      properties: {
        disposalLocationId: {
          type: 'string',
          format: 'uuid',
          description: 'ID of the disposal location',
        },
      },
      required: ['disposalLocationId'],
    },
    response: {
      200: {
        description: 'Disposal location retrieved successfully',
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
      404: {
        description: 'Disposal location not found',
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
    security: [{ ApiToken: [] }],
  },
}
