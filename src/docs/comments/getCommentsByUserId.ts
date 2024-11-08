// Documentação para obter comentários por ID de usuário
export const getCommentsByUserIdDocs = {
  schema: {
    tags: ['comments'],
    description: 'Retrieve all comments made by a specific user',
    response: {
      200: {
        description: 'List of comments retrieved successfully',
        type: 'object',
        properties: {
          comments: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string', format: 'uuid' },
                content: { type: 'string' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' },
                postId: { type: 'string', format: 'uuid' },
                userId: { type: 'string', format: 'uuid' },
              },
            },
          },
        },
      },
      400: {
        description: 'Error retrieving comments',
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
    security: [{ ApiToken: [] }],
  },
}
