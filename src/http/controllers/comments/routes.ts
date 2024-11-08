import { FastifyInstance } from 'fastify'
import { VerifyJwt } from '../../middlewares/verifyy-jwt'
import { createComment } from './createCommentController'
import { getCommentsByUserId } from './getCommentByUserIdController'
import { getCommentById } from './getCommentByIdController'
import { getCommentsByPostId } from './getCommentsByPostIdController'
import { deleteComment } from './deleteCommentController'
import { updateComment } from './updateCommentController'

// Importando documentações
import { createCommentDocs } from '@/docs/comments/createComments'
import { getCommentsByUserIdDocs } from '@/docs/comments/getCommentsByUserId'
import { getCommentByIdDocs } from '@/docs/comments/getCommentsById'
import { getCommentsByPostIdDocs } from '@/docs/comments/getCommentsByPostId'
import { deleteCommentDocs } from '@/docs/comments/deleteComments'
import { updateCommentDocs } from '@/docs/comments/updateComments'

export async function commentsRoutes(app: FastifyInstance) {
  // Criar um comentário
  app.post(
    '/comments',
    {
      onRequest: [VerifyJwt],
      schema: createCommentDocs.schema,
    },
    createComment,
  )

  // Obter comentários por ID de usuário
  app.get(
    '/comments/user',
    {
      onRequest: [VerifyJwt],
      schema: getCommentsByUserIdDocs.schema,
    },
    getCommentsByUserId,
  )

  // Obter um comentário por ID
  app.get(
    '/comments/:commentId',
    {
      onRequest: [VerifyJwt],
      schema: getCommentByIdDocs.schema,
    },
    getCommentById,
  )

  // Obter comentários por ID do post
  app.get(
    '/posts/:postId/comments',
    {
      onRequest: [VerifyJwt],
      schema: getCommentsByPostIdDocs.schema,
    },
    getCommentsByPostId,
  )

  // Deletar um comentário
  app.delete(
    '/comments/:commentId',
    {
      onRequest: [VerifyJwt],
      schema: deleteCommentDocs.schema,
    },
    deleteComment,
  )

  // Atualizar um comentário
  app.patch(
    '/comments/:commentId',
    {
      onRequest: [VerifyJwt],
      schema: updateCommentDocs.schema,
    },
    updateComment,
  )
}
