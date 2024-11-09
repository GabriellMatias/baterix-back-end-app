import { makeDeleteCommentsUseCase } from '@/use-cases/factories/comments/make-delete-comments-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function deleteComment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteCommentParamsSchema = z.object({
    commentId: z.string().uuid(),
  })

  const { commentId } = deleteCommentParamsSchema.parse(request.params)

  try {
    const deleteCommentUseCase = makeDeleteCommentsUseCase()

    await deleteCommentUseCase.execute({
      commentId,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }

  return reply.status(204).send()
}
