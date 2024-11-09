// Documentação para criação de comentário
export const createCommentDocs = {
  schema: {
    tags: ['comments'],
    description: 'Create a new comment on a post',
    body: {
      type: 'object',
      properties: {
        postId: {
          type: 'string',
          format: 'uuid',
          description: 'ID of the post',
        },
        content: { type: 'string', description: 'Content of the comment' },
      },
      required: ['postId', 'content'],
    },
    response: {
      201: {
        description: 'Comment created successfully',
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
      400: {
        description: 'Error creating comment',
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
    security: [{ ApiToken: [] }],
  },
}
