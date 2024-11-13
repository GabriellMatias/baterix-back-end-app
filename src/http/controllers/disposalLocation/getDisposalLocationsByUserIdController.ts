import { makeGetDisposalLocationsByUserIdUseCase } from '@/use-cases/factories/disposalLocations/make-get-disposal-location-by-user-id-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getDisposalLocationsByUserId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getDisposalLocationsByUserIdUseCase =
    makeGetDisposalLocationsByUserIdUseCase()
  const disposalLocations = await getDisposalLocationsByUserIdUseCase.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send(disposalLocations)
}
