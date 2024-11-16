import { UserAlreadyExistsError } from '@/use-cases/errors/user/user-already-exists'
import { makeRegisterUseCase } from '@/use-cases/factories/user/make-register-use-case'
import { Role } from '@/use-cases/user/register-use-case'

import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const addressSchema = z
    .object({
      street: z.string(),
      city: z.string(),
      postalCode: z.string(),
      latitude: z.number().optional(),
      longitude: z.number().optional(),
      complement: z.string().optional(),
    })
    .optional() // Make address optional

  const roleSchema = z.nativeEnum(Role)

  const registerBodySchema = z.object({
    name: z.string().nonempty(),
    email: z.string().email(),
    password: z.string().min(6),
    address: addressSchema, // Address is optional here as well
    role: roleSchema.optional(),
  })

  // Parse and validate the incoming request body
  const { email, name, password, address, role } = registerBodySchema.parse(request.body)

  try {
    // Create a new register use case instance
    const registerUseCase = makeRegisterUseCase()

    // If no address is provided, pass `undefined` instead of `null`
    await registerUseCase.execute({
      name,
      email,
      password,
      address, // If address is undefined, it will be omitted from the execution.
      role,
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }
    // Re-throw error for any other unforeseen issues
    throw error
  }

  // Send success response with a 201 status code
  return reply.status(201).send({ message: 'User registered successfully' })
}
