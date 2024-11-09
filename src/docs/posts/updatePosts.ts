export const updatePostDocs = {
  schema: {
    tags: ['posts'],
    description: 'Update an existing post',
    params: {
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid', description: 'Post ID' },
      },
      required: ['id'],
    },
    body: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'Updated post title' },
        content: { type: 'string', description: 'Updated post content' },
      },
      required: [],
    },
    response: {
      204: {
        description: 'Post updated successfully',
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
