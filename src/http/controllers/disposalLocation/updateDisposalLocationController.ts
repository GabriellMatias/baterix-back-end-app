import { makeUpdateDisposalLocationUseCase } from '@/use-cases/factories/disposalLocations/make-update-disposal-location-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function updateDisposalLocation(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    disposalLocationId: z.string().uuid(),
  })

  const bodySchema = z.object({
    name: z.string().optional(),
    wasteType: z.string().optional(),
    capacity: z.number().optional(),
    addressId: z.string().uuid().optional(),
  })

  const { disposalLocationId } = paramsSchema.parse(request.params)
  const data = bodySchema.parse(request.body)

  try {
    const updateDisposalLocationUseCase = makeUpdateDisposalLocationUseCase()
    await updateDisposalLocationUseCase.execute({
      disposalLocationId,
      ...data,
    })
  } catch (error) {
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    throw error
  }

  return reply.status(200).send()
}
