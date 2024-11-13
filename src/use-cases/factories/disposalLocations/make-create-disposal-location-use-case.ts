import { PrismaDisposalLocationRepository } from '@/repositories/prisma/prisma-disposal-repository'
import { CreateDisposalLocationUseCase } from '@/use-cases/disposalLocation/create-disposal-location-use-case'

export function makeCreateDisposalLocationUseCase() {
  const prismaDisposalLocationRepository =
    new PrismaDisposalLocationRepository()
  const useCase = new CreateDisposalLocationUseCase(
    prismaDisposalLocationRepository,
  )
  return useCase
}
