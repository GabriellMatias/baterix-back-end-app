import { makeGetDisposalLocationByIdUseCase } from '@/use-cases/factories/disposalLocations/make-get-disposal-location-by-id-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function getDisposalLocationById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    disposalLocationId: z.string().uuid(),
  })

  const { disposalLocationId } = paramsSchema.parse(request.params)

  try {
    const getDisposalLocationByIdUseCase = makeGetDisposalLocationByIdUseCase()
    const disposalLocation = await getDisposalLocationByIdUseCase.execute({
      disposalLocationId,
    })

    return reply.status(200).send(disposalLocation)
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }
}
