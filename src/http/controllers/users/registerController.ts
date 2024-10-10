import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { Role } from '@/use-cases/register-use-case'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const addressSchema = z.object({
    street: z.string(),
    city: z.string(),
    postalCode: z.string(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    complement: z.string().optional(),
  })

  const roleSchema = z.nativeEnum(Role)

  const registerBodySchema = z.object({
    name: z.string().nonempty(),
    email: z.string().email(),
    password: z.string().min(6),
    address: addressSchema,
    role: roleSchema.optional(),
  })

  const { email, name, password, address, role } = registerBodySchema.parse(
    request.body,
  )
  try {
    const registerUseCase = makeRegisterUseCase()
    await registerUseCase.execute({
      name,
      email,
      password,
      address,
      role,
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }
    throw error
  }
  return reply.status(201).send()
}
