import { makeGetCommentsByUserIdUseCase } from '@/use-cases/factories/comments/make-get-comments-by-user-id-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getCommentsByUserId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = request.user.sub

  try {
    const getCommentsByUserIdUseCase = makeGetCommentsByUserIdUseCase()

    const { comments } = await getCommentsByUserIdUseCase.execute({
      userId,
    })

    if (!comments || comments.length === 0) {
      return reply
        .status(404)
        .send({ message: 'No comments found for this user.' })
    }

    return reply.status(200).send({ comments })
  } catch (error) {
    return reply
      .status(500)
      .send({ message: '⚠️ Error fetching comments by userId.' })
  }
}
