import { makeCreateCommentsUseCase } from '@/use-cases/factories/comments/make-create-comments-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { CommentCreationError } from '@/use-cases/errors/comments/comments-creation-error'
import { makeGetUserProfileUseCase } from '@/use-cases/factories/user/make-get-user-profile-use-case'

export async function createComment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createCommentBodySchema = z.object({
    content: z.string().nonempty(),
    postId: z.string().uuid(),
  })

  const { content, postId } = createCommentBodySchema.parse(request.body)

  try {
    const createCommentUseCase = makeCreateCommentsUseCase()
    const getUserProfile = makeGetUserProfileUseCase()
    const { user } = await getUserProfile.execute({
      userId: request.user.sub,
    })

    await createCommentUseCase.execute({
      authorId: user.id,
      content,
      postId,
    })
  } catch (error) {
    if (error instanceof CommentCreationError) {
      return reply.status(400).send({ message: error.message })
    }
    throw error
  }

  return reply.status(201).send()
}
