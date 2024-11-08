import { PostCreationError } from '@/use-cases/errors/posts/post-creation-erro'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetPostsByUserIdUseCase } from '@/use-cases/factories/posts/make-get-posts-by-user-id-use-case'
import { makeGetUserProfileUseCase } from '@/use-cases/factories/user/make-get-user-profile-use-case'

export async function getPostByUserId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getPostByUserIdUseCase = makeGetPostsByUserIdUseCase()
    const getUserProfile = makeGetUserProfileUseCase()
    const { user } = await getUserProfile.execute({
      userId: request.user.sub,
    })
    const posts = await getPostByUserIdUseCase.execute({ userId: user.id })
    return reply.status(200).send(posts)
  } catch (error) {
    if (error instanceof PostCreationError) {
      return reply.status(400).send({ message: error.message })
    }
    throw error
  }
}
