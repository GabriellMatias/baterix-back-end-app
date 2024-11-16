import { makeGetCommentByIdUseCase } from '@/use-cases/factories/comments/make-get-comments-by-id-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getCommentById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getCommentByIdParamsSchema = z.object({
    commentId: z.string().uuid(),
  })

  const { commentId } = getCommentByIdParamsSchema.parse(request.params)

  try {
    const getCommentByIdUseCase = makeGetCommentByIdUseCase()

    const { comment } = await getCommentByIdUseCase.execute({
      commentId,
    })

    if (!comment) {
      return reply.status(404).send({ message: 'Comment not found.' })
    }

    return reply.status(200).send(comment)
  } catch (error) {
    return reply
      .status(500)
      .send({ message: '⚠️ Error fetching comment by commentId.' })
  }
}
