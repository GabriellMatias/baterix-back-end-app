import { FastifyInstance } from 'fastify'
import { VerifyJwt } from '@/http/middlewares/verifyy-jwt'

import { createPost } from './createPostController'
import { deletePost } from './deletePostController'
import { getPostById } from './getPostByIdController'
import { getPostByUserId } from './getPostByUserIdController'
import { updatePost } from './updatePostController'

import { createPostDocs } from '@/docs/posts/createPosts'
import { deletePostDocs } from '@/docs/posts/deletePosts'
import { getPostByIdDocs } from '@/docs/posts/getPostsById'
import { getPostByUserIdDocs } from '@/docs/posts/getPostsByUserId'
import { updatePostDocs } from '@/docs/posts/updatePosts'

export async function postsRoutes(app: FastifyInstance) {
  app.post(
    '/posts',
    {
      onRequest: [VerifyJwt],
      schema: createPostDocs.schema,
    },
    createPost,
  )

  app.delete(
    '/posts/:id',
    {
      onRequest: [VerifyJwt],
      schema: deletePostDocs.schema,
    },
    deletePost,
  )

  app.get(
    '/posts/user',
    {
      onRequest: [VerifyJwt],
      schema: getPostByUserIdDocs.schema,
    },
    getPostByUserId,
  )

  app.put(
    '/posts/:id',
    {
      onRequest: [VerifyJwt],
      schema: updatePostDocs.schema,
    },
    updatePost,
  )

  app.get(
    '/posts/:id',
    {
      onRequest: [VerifyJwt],
      schema: getPostByIdDocs.schema,
    },
    getPostById,
  )
}
