export const deletePostDocs = {
  schema: {
    tags: ['posts'],
    description: 'Delete a post by its ID',
    params: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid', description: 'Post ID' },
      },
      required: ['id'],
    },
    response: {
      204: {
        description: 'Post deleted successfully',
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
