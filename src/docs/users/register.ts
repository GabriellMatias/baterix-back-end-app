export const registerDocs = {
  schema: {
    tags: ['users'],
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 6 },
        address: {
          type: 'object',
          properties: {
            street: { type: 'string' },
            city: { type: 'string' },
            postalCode: { type: 'string' },
            latitude: { type: 'number' },
            longitude: { type: 'number' },
            complement: { type: 'string' },
          },
        },
        role: { type: 'string', enum: ['ADMIN', 'MEMBER', 'ENTERPRISE'] },
      },
      // 'address' is now optional
      required: ['name', 'email', 'password'],
    },
    response: {
      201: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
      409: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
}
