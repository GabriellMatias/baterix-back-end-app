// Documentação para obter um comentário por ID
export const getCommentByIdDocs = {
  schema: {
    tags: ['comments'],
    description: 'Retrieve a comment by its ID',
    params: {
      type: 'object',
      properties: {
        commentId: {
          type: 'string',
          format: 'uuid',
          description: 'Comment ID',
        },
      },
      required: ['commentId'],
    },
    response: {
      200: {
        description: 'Comment retrieved successfully',
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
      404: {
        description: 'Comment not found',
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
    security: [{ ApiToken: [] }],
  },
}
