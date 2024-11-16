export const getCommentsByPostIdDocs = {
  schema: {
    tags: ['comments'],
    description: 'Retrieve all comments for a specific post',
    params: {
      type: 'object',
      properties: {
        postId: { type: 'string', format: 'uuid', description: 'Post ID' },
      },
      required: ['postId'],
    },
    response: {
      200: {
        description: 'List of comments for the post retrieved successfully',
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
                createdBy: {
                  type: 'object',
                  properties: {
                    id: { type: 'string', format: 'uuid' },
                    name: { type: 'string' },
                    email: { type: 'string', format: 'email' },
                  },
                },
              },
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
