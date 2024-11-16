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
import fastifyCors from '@fastify/cors'  // Import the CORS plugin

export const app = fastify()

// Register CORS plugin with configuration
app.register(fastifyCors, {
  origin: 'http://localhost:4200',  // Allow your frontend (Angular) to make requests
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],  // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allow these headers
  preflight: true,  // Enable handling of OPTIONS (preflight) requests
})

// docs
setupSwagger()

app.register(fastifyCookie)

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,  // Do not sign the refresh token cookie
  },
  sign: {
    expiresIn: '10m',  // JWT expiration time
  },
})

// Register routes
app.register(usersRoutes)
app.register(postsRoutes)
app.register(commentsRoutes)
app.register(disposalLocationRoutes)

/* Treat errors */
app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'validation Error', issues: error.format })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO -> Log to external tool like DataDog
  }

  return reply.status(500).send({ message: 'Internal server error' })
})
