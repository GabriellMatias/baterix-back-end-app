import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '@/use-cases/user/authenticate-use-case'

/* Factories para criar os casos de uso, facilitar */
export function makeAuthenticateUseCase() {
  const prismaUserRepository = new PrismaUsersRepository()
  const useCase = new AuthenticateUseCase(prismaUserRepository)
  return useCase
}
