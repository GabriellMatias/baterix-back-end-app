export const getPostByIdDocs = {
  schema: {
    tags: ['posts'],
    description: 'Retrieve a post by its ID',
    params: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid', description: 'Post ID' },
      },
      required: ['id'],
    },
    response: {
      200: {
        description: 'Post retrieved successfully',
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          title: { type: 'string' },
          content: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
          userId: { type: 'string', format: 'uuid' },
          createdBy: {
            type: 'object',
            properties: {
              id: { type: 'string', format: 'uuid' },
              name: { type: 'string' },
              email: { type: 'string', format: 'email' },
            },
            required: ['id', 'name', 'email'],
          },
          Comment: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string', format: 'uuid' },
                content: { type: 'string' },
                createdAt: { type: 'string', format: 'date-time' },
                userId: { type: 'string', format: 'uuid' },
              },
              required: ['id', 'content', 'createdAt', 'userId'],
            },
          },
        },
      },
      404: {
        description: 'Post not found',
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
    security: [{ ApiToken: [] }],
  },
}
