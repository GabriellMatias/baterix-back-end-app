import { makeDeletePostUseCase } from '@/use-cases/factories/posts/make-delete-post-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PostNotFoundError } from '@/use-cases/errors/posts/post-not-found-erro'

export async function deletePost(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = paramsSchema.parse(request.params)

  try {
    const deletePostUseCase = makeDeletePostUseCase()
    await deletePostUseCase.execute({
      postId: id,
    })
  } catch (error) {
    if (error instanceof PostNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }

  return reply.status(204).send()
}
