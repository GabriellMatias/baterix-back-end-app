import { authenticate } from './authenticateController'
import { profile } from './profileController'
import { register } from './registerController'
import { FastifyInstance } from 'fastify'
import { VerifyJwt } from '../../middlewares/verifyy-jwt'
import { refresh } from './refreshController'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/register', register)

  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)
  /* Rotas serao chamadas apenas quando o usuario estiver autenticado */
  app.get('/me', { onRequest: [VerifyJwt] }, profile)
}
