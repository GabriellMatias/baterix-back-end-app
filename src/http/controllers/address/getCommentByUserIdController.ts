import { makeGetAddressesByUserIdUseCase } from '@/use-cases/factories/address/make-get-addresses-by-user-id-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function getAddressesByUserId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  // O userId será extraído do JWT (request.user.sub)
  const userId = request.user.sub

  try {
    // Criação do caso de uso para buscar os endereços pelo ID do usuário
    const getAddressesByUserIdUseCase = makeGetAddressesByUserIdUseCase()

    // Executa o caso de uso para obter os endereços
    const { addresses } = await getAddressesByUserIdUseCase.execute({
      userId,
    })

    // Se não encontrar nenhum endereço para o usuário, retorna 404
    if (!addresses || addresses.length === 0) {
      return reply
        .status(404)
        .send({ message: 'No addresses found for this user.' })
    }

    // Se encontrar, retorna os endereços com status 200
    return reply.status(200).send({ addresses })
  } catch (error) {
    // Caso ocorra algum erro, retorna um erro genérico 500
    return reply
      .status(500)
      .send({ message: '⚠️ Error fetching addresses by userId.' })
  }
}
