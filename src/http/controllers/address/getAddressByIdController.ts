import { makeGetAddressByIdUseCase } from '@/use-cases/factories/address/make-get-address-by-id-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getAddressById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  // Validação do parâmetro de ID do endereço na requisição
  const getAddressByIdParamsSchema = z.object({
    addressId: z.string().uuid(),
  })

  const { addressId } = getAddressByIdParamsSchema.parse(request.params)

  try {
    // Criação do caso de uso para buscar o endereço pelo ID
    const getAddressByIdUseCase = makeGetAddressByIdUseCase()

    // Executa o caso de uso para obter o endereço
    const { address } = await getAddressByIdUseCase.execute({
      addressId,
    })

    // Se o endereço não for encontrado, retorna uma resposta 404
    if (!address) {
      return reply.status(404).send({ message: 'Address not found.' })
    }

    // Retorna o endereço encontrado com status 200
    return reply.status(200).send({ address })
  } catch (error) {
    // Caso haja erro na execução, retorna uma resposta 500
    return reply
      .status(500)
      .send({ message: '⚠️ Error fetching address by addressId.' })
  }
}
