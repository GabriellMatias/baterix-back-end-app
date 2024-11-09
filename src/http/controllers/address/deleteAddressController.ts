import { makeDeleteAddressUseCase } from '@/use-cases/factories/address/make-delete-address-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function deleteAddress(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  // Validação do parâmetro de ID do endereço na requisição
  const deleteAddressParamsSchema = z.object({
    addressId: z.string().uuid(),
  })

  const { addressId } = deleteAddressParamsSchema.parse(request.params)

  try {
    // Criação do caso de uso para deletar o endereço
    const deleteAddressUseCase = makeDeleteAddressUseCase()

    // Executa a exclusão do endereço
    await deleteAddressUseCase.execute({
      addressId,
    })
  } catch (error) {
    // Caso o endereço não seja encontrado
    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
    // Lança outros erros que não são específicos da exclusão de endereço
    throw error
  }

  // Retorna status de sucesso indicando que o endereço foi excluído com sucesso
  return reply.status(204).send()
}
