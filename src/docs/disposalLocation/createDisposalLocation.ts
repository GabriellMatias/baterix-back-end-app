// Documentação para criação de um local de descarte
export const createDisposalLocationDocs = {
  schema: {
    tags: ['disposalLocation'],
    description: 'Create a new disposal location',
    body: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Name of the disposal location' },
        address: {
          type: 'object',
          properties: {
            street: {
              type: 'string',
              description: 'Street of the disposal location',
            },
            city: {
              type: 'string',
              description: 'City of the disposal location',
            },
            postalCode: { type: 'string', description: 'Postal code' },
            latitude: { type: 'number', description: 'Latitude' },
            longitude: { type: 'number', description: 'Longitude' },
            complement: {
              type: 'string',
              description: 'Additional address information',
            },
          },
          required: ['street', 'city', 'postalCode', 'latitude', 'longitude'],
        },
      },
      required: ['name', 'address'],
    },
    response: {
      201: {
        description: 'Disposal location created successfully',
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
      400: {
        description: 'Error creating disposal location',
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
    security: [{ ApiToken: [] }],
  },
}
