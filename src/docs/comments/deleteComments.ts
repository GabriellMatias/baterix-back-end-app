// Documentação para deletar um comentário
export const deleteCommentDocs = {
  schema: {
    tags: ['comments'],
    description: 'Delete a comment by its ID',
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
      204: {
        description: 'Comment deleted successfully',
        type: 'null',
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
