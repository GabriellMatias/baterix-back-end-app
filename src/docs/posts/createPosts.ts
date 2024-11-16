export const createPostDocs = {
  schema: {
    tags: ['posts'],
    description: 'Create a new post',
    body: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'Post title' },
        content: { type: 'string', description: 'Post content' },
      },
      required: ['title', 'content'],
    },
    response: {
      201: {
        description: 'Post created successfully',
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
      400: {
        description: 'Invalid data or creation error',
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
    security: [{ ApiToken: [] }],
  },
}
