import { PostNotFoundError } from '@/use-cases/errors/post-not-found-erro'
import { makeGetPostByIdUseCase } from '@/use-cases/factories/make-get-post-by-id-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPostById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    postId: z.string().uuid(),
  })

  const { postId } = paramsSchema.parse(request.params)

  try {
    const getPostByIdUseCase = makeGetPostByIdUseCase()
    const post = await getPostByIdUseCase.execute({ postId })

    if (!post) {
      throw new PostNotFoundError()
    }

    return reply.status(200).send(post)
  } catch (error) {
    if (error instanceof PostNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
