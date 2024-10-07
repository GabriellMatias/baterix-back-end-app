import { PostCreationError } from '@/use-cases/errors/post-creation-erro'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetPostsByUserIdUseCase } from '@/use-cases/factories/make-get-posts-by-user-id-use-case'

export async function getPostByUserId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getPostByUserIdUseCase = makeGetPostsByUserIdUseCase()
    const posts = await getPostByUserIdUseCase.execute(request.user.sub)

    return reply.status(200).send(posts)
  } catch (error) {
    if (error instanceof PostCreationError) {
      return reply.status(400).send({ message: error.message })
    }
    throw error
  }
}
