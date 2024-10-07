import { FastifyInstance } from 'fastify'
import { VerifyJwt } from '../../middlewares/verifyy-jwt'

export async function postsRoutes(app: FastifyInstance) {
  app.post('/posts', { onRequest: [VerifyJwt] }, createPost)

  app.get('/posts', { onRequest: [VerifyJwt] }, getAllUserPosts)

  app.get('/posts/:id', { onRequest: [VerifyJwt] }, getPostById)

  app.patch('/posts/:id', { onRequest: [VerifyJwt] }, updatePost)

  app.delete('/posts/:id', { onRequest: [VerifyJwt] }, deletePost)
}
