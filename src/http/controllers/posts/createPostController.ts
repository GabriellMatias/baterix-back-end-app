import { makeCreatePostUseCase } from '@/use-cases/factories/make-create-post-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PostCreationError } from '@/use-cases/errors/post-creation-erro'
import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'

export async function createPost(request: FastifyRequest, reply: FastifyReply) {
  const createPostBodySchema = z.object({
    title: z.string().nonempty(),
    content: z.string().nonempty(),
  })

  const { title, content } = createPostBodySchema.parse(request.body)

  try {
    const createPostUseCase = makeCreatePostUseCase()
    const getUserProfile = makeGetUserProfileUseCase()
    const { user } = await getUserProfile.execute({
      userId: request.user.sub,
    })
    await createPostUseCase.execute({
      authorId: user.id,
      title,
      content,
    })
  } catch (error) {
    if (error instanceof PostCreationError) {
      return reply.status(400).send({ message: error.message })
    }
    throw error
  }

  return reply.status(201).send()
}
