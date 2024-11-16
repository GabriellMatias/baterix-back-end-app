// Documentação para deleção de um local de descarte
export const deleteDisposalLocationDocs = {
  schema: {
    tags: ['disposalLocation'],
    description: 'Delete a disposal location by ID',
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
        description: 'Disposal location deleted successfully',
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: 'Confirmation message for successful deletion',
          },
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
