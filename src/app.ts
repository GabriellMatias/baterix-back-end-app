import fastify from 'fastify'

import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { usersRoutes } from './http/controllers/users/routes'
import fastifyCookie from '@fastify/cookie'
import { postsRoutes } from './http/controllers/posts/routes'
import { commentsRoutes } from './http/controllers/comments/routes'
import { setupSwagger } from './docs/swagger'
import { disposalLocationRoutes } from './http/controllers/disposalLocation/routes'

export const app = fastify()

// docs
setupSwagger()

app.register(fastifyCookie)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    /* Cookie do refreshToken nao e assinado */
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(usersRoutes)
app.register(postsRoutes)
app.register(commentsRoutes)
app.register(disposalLocationRoutes)

/* Treat errors */
app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'validation Erro', issues: error.format })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO -> Log to external tool like DataDog
  }

  return reply.status(500).send({ message: 'Internal server error' })
})
