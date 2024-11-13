import { makeCreateDisposalLocationUseCase } from '@/use-cases/factories/disposalLocations/make-create-disposal-location-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { DisposalLocationCreationError } from '@/use-cases/errors/disposalLocations/disposal-location-creation-error'

export async function createDisposalLocation(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createDisposalLocationSchema = z.object({
    name: z.string().nonempty(),
    wasteType: z.string().nonempty(),
    addressId: z.string().uuid(),
  })

  const { name, wasteType, addressId } = createDisposalLocationSchema.parse(
    request.body,
  )

  try {
    const createDisposalLocationUseCase = makeCreateDisposalLocationUseCase()
    await createDisposalLocationUseCase.execute({
      name,
      wasteType,
      addressId,
      authorId: request.user.sub,
    })
  } catch (error) {
    if (error instanceof DisposalLocationCreationError) {
      return reply.status(400).send({ message: error.message })
    }
    throw error
  }

  return reply.status(201).send()
}
