// Documentação para atualizar um comentário
export const updateCommentDocs = {
  schema: {
    tags: ['comments'],
    description: 'Update a comment by its ID',
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
    body: {
      type: 'object',
      properties: {
        content: {
          type: 'string',
          description: 'Updated content of the comment',
        },
      },
      required: ['content'],
    },
    response: {
      200: {
        description: 'Comment updated successfully',
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
