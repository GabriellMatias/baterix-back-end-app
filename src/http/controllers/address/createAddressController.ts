import { makeCreateAddressUseCase } from '@/use-cases/factories/address/make-create-address-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { AddressCreationError } from '@/use-cases/errors/address/address-creation-error'
import { makeGetUserProfileUseCase } from '@/use-cases/factories/user/make-get-user-profile-use-case'

export async function createAddress(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  // Validação do corpo da requisição com zod
  const createAddressBodySchema = z.object({
    street: z.string().nonempty(),
    city: z.string().nonempty(),
    postalCode: z.string().nonempty(),
    latitude: z.string().optional(),
    longitude: z.string().optional(),
    complement: z.string().optional(),
  })

  // Extração e validação dos dados enviados no corpo da requisição
  const { street, city, postalCode, latitude, longitude, complement } =
    createAddressBodySchema.parse(request.body)

  try {
    // Chama o caso de uso para criar o endereço
    const createAddressUseCase = makeCreateAddressUseCase()
    const getUserProfile = makeGetUserProfileUseCase()

    // Obtém as informações do usuário a partir do JWT
    const { user } = await getUserProfile.execute({
      userId: request.user.sub,
    })

    // Executa a criação do endereço
    await createAddressUseCase.execute({
      userId: user.id, // Associa o endereço ao usuário
      street,
      city,
      postalCode,
      latitude,
      longitude,
      complement,
    })
  } catch (error) {
    if (error instanceof AddressCreationError) {
      return reply.status(400).send({ message: error.message })
    }
    // Caso o erro não seja específico da criação do endereço, lança o erro
    throw error
  }

  // Retorna sucesso ao criar o endereço
  return reply.status(201).send()
}
