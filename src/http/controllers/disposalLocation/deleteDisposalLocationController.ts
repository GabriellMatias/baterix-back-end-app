import { makeDeleteDisposalLocationUseCase } from '@/use-cases/factories/disposalLocations/make-delete-disposal-location-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function deleteDisposalLocation(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    disposalLocationId: z.string().uuid(),
  })

  const { disposalLocationId } = paramsSchema.parse(request.params)

  try {
    const deleteDisposalLocationUseCase = makeDeleteDisposalLocationUseCase()
    await deleteDisposalLocationUseCase.execute({
      disposalLocationId,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }

  return reply.status(204).send()
}
