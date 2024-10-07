import { makeEditPostUseCase } from '@/use-cases/factories/make-edit-post-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PostNotFoundError } from '@/use-cases/errors/post-not-found-erro'

export async function updatePost(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string().uuid(),
  })

  const updatePostBodySchema = z.object({
    title: z.string().nonempty().optional(),
    content: z.string().nonempty().optional(),
  })

  const { id } = paramsSchema.parse(request.params)
  const { title, content } = updatePostBodySchema.parse(request.body)

  try {
    const updatePostUseCase = makeEditPostUseCase()
    await updatePostUseCase.execute({
      postId: id,
      title,
      content,
    })
  } catch (error) {
    if (error instanceof PostNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }

  return reply.status(204).send()
}
