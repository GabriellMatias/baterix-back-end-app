export const getPostByUserIdDocs = {
  schema: {
    tags: ['posts'],
    description: 'Retrieve all posts created by a specific user',
    response: {
      200: {
        description: 'List of posts retrieved successfully',
        type: 'object',
        properties: {
          posts: {
            type: 'array',
            items: {
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
              required: [
                'id',
                'title',
                'content',
                'createdAt',
                'updatedAt',
                'userId',
                'createdBy',
                'Comment',
              ],
            },
          },
        },
      },
      400: {
        description: 'Error retrieving posts',
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
    security: [{ ApiToken: [] }],
  },
}
