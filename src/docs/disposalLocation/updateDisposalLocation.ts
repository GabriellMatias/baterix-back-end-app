export const updateDisposalLocationDocs = {
  schema: {
    tags: ['disposalLocation'],
    description: 'Update a disposal location by ID',
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
    body: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Updated name of the disposal location',
        },
        wasteType: { type: 'string', description: 'Type of waste accepted' },
        capacity: {
          type: 'number',
          description: 'Capacity of the disposal location',
        },
        addressId: {
          type: 'string',
          format: 'uuid',
          description: 'ID of the address',
        },
      },
    },
    response: {
      200: {
        description: 'Disposal location updated successfully',
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          name: { type: 'string' },
          addressId: { type: 'string', format: 'uuid' },
          updatedAt: { type: 'string', format: 'date-time' },
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
