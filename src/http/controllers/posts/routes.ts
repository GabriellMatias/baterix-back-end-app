import { FastifyInstance } from 'fastify'
import { VerifyJwt } from '../../middlewares/verifyy-jwt'
import { createPost } from './createPostController'
import { getPostById } from './getPostByIdController'
import { getPostByUserId } from './getPostByUserIdController'
import { updatePost } from './updatePostController'
import { deletePost } from './deletePostController'

export async function postsRoutes(app: FastifyInstance) {
  app.post('/posts', { onRequest: [VerifyJwt] }, createPost)

  app.get('/posts', { onRequest: [VerifyJwt] }, getPostByUserId)

  app.get('/posts/:id', { onRequest: [VerifyJwt] }, getPostById)

  app.patch('/posts/:id', { onRequest: [VerifyJwt] }, updatePost)

  app.delete('/posts/:id', { onRequest: [VerifyJwt] }, deletePost)
}
