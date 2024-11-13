import { FastifyInstance } from 'fastify'
import { VerifyJwt } from '../../middlewares/verifyy-jwt'
import { createDisposalLocation } from './createDisposalLocationController'
import { getDisposalLocationById } from './getDisposalLocationByIdController'
import { getDisposalLocationsByUserId } from './getDisposalLocationsByUserIdController'
import { deleteDisposalLocation } from './deleteDisposalLocationController'
import { updateDisposalLocation } from './updateDisposalLocationController'

// Importando documentações
import { createDisposalLocationDocs } from '@/docs/disposalLocation/createDisposalLocation'
import { getDisposalLocationByIdDocs } from '@/docs/disposalLocation/getDisposalLocationById'
import { getDisposalLocationsByUserIdDocs } from '@/docs/disposalLocation/getDisposalLocationsByUserId'
import { deleteDisposalLocationDocs } from '@/docs/disposalLocation/deleteDisposalLocation'
import { updateDisposalLocationDocs } from '@/docs/disposalLocation/updateDisposalLocation'

export async function disposalLocationRoutes(app: FastifyInstance) {
  // Criar um local de descarte
  app.post(
    '/disposal-locations',
    {
      onRequest: [VerifyJwt],
      schema: createDisposalLocationDocs.schema,
    },
    createDisposalLocation,
  )

  // Obter locais de descarte por ID de usuário
  app.get(
    '/disposal-locations/user',
    {
      onRequest: [VerifyJwt],
      schema: getDisposalLocationsByUserIdDocs.schema,
    },
    getDisposalLocationsByUserId,
  )

  // Obter um local de descarte por ID
  app.get(
    '/disposal-locations/:disposalLocationId',
    {
      onRequest: [VerifyJwt],
      schema: getDisposalLocationByIdDocs.schema,
    },
    getDisposalLocationById,
  )

  // Deletar um local de descarte
  app.delete(
    '/disposal-locations/:disposalLocationId',
    {
      onRequest: [VerifyJwt],
      schema: deleteDisposalLocationDocs.schema,
    },
    deleteDisposalLocation,
  )

  // Atualizar um local de descarte
  app.patch(
    '/disposal-locations/:disposalLocationId',
    {
      onRequest: [VerifyJwt],
      schema: updateDisposalLocationDocs.schema,
    },
    updateDisposalLocation,
  )
}
