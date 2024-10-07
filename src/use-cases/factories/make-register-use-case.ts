import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../register-use-case'
import { PrismaAddressRepository } from '@/repositories/prisma/prisma-address-repository'

export function makeRegisterUseCase() {
  const prismaUserRepository = new PrismaUsersRepository()
  const addressRepository = new PrismaAddressRepository()
  const useCase = new RegisterUseCase(prismaUserRepository, addressRepository)
  return useCase
}
