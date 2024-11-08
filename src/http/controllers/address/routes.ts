import { FastifyInstance } from 'fastify'
import { VerifyJwt } from '../../middlewares/verifyy-jwt'
import { createAddress } from './createAddressController'
import { getAddressByUserId } from './getAddressByUserIdController'
import { getAddressById } from './getAddressByIdController'
import { updateAddress } from './updateAddressController'
import { deleteAddress } from './deleteAddressController'

export async function addressRoutes(app: FastifyInstance) {
  // Criar um endereço
  app.post('/addresses', { onRequest: [VerifyJwt] }, createAddress)

  // Obter endereço por ID de usuário
  app.get('/addresses/user', { onRequest: [VerifyJwt] }, getAddressByUserId)

  // Obter um endereço por ID
  app.get('/addresses/:addressId', { onRequest: [VerifyJwt] }, getAddressById)

  // Atualizar um endereço
  app.patch('/addresses/:addressId', { onRequest: [VerifyJwt] }, updateAddress)

  // Deletar um endereço
  app.delete('/addresses/:addressId', { onRequest: [VerifyJwt] }, deleteAddress)
}
