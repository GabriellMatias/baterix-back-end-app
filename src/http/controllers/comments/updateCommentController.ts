import { makeUpdateCommentsUseCase } from '@/use-cases/factories/comments/make-update-comments-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function updateComment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateCommentParamsSchema = z.object({
    commentId: z.string().uuid(),
  })

  const updateCommentBodySchema = z.object({
    content: z.string().optional(),
  })

  const { commentId } = updateCommentParamsSchema.parse(request.params)
  const { content } = updateCommentBodySchema.parse(request.body)

  try {
    const updateCommentUseCase = makeUpdateCommentsUseCase()

    const { comment } = await updateCommentUseCase.execute({
      commentId,
      content,
    })

    return reply.status(200).send(comment)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
