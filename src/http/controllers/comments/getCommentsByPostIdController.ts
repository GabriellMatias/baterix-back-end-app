import { makeGetCommentByPostIdUseCase } from '@/use-cases/factories/comments/make-get-comments-by-post-id-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function getCommentsByPostId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getCommentsParamsSchema = z.object({
    postId: z.string().uuid(),
  })

  const { postId } = getCommentsParamsSchema.parse(request.params)

  try {
    const getCommentsByPostIdUseCase = makeGetCommentByPostIdUseCase()

    const comments = await getCommentsByPostIdUseCase.execute({ postId })
    if (!comments) {
      throw new ResourceNotFoundError()
    }

    return reply.status(200).send(comments)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
