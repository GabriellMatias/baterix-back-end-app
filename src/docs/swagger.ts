import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { app } from '@/app'

export async function setupSwagger() {
  app.register(fastifySwagger, {
    swagger: {
      info: {
        title: 'API Documentation',
        description: 'API Documentation for Posts, Comments, and Users',
        version: '1.0.0',
      },
      schemes: ['http', 'https'],
      tags: [
        { name: 'users', description: 'User management' },
        { name: 'posts', description: 'Post management' },
        { name: 'comments', description: 'Comment management' },
        { name: 'address', description: 'Address management' },
        {
          name: 'disposalLocation',
          description: 'Disposal Location management',
        },
      ],
      securityDefinitions: {
        ApiToken: {
          description: 'Authorization header token, sample: "Bearer #TOKEN#"',
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
        },
      },
    },
  })

  app.register(fastifySwaggerUi, {
    routePrefix: '/documentation', // URL onde o Swagger UI será acessado
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => {
      return swaggerObject
    },
    transformSpecificationClone: true,
  })
}
