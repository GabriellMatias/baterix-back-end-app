import { GetDisposalLocationsByUserIdUseCase } from '@/use-cases/disposalLocation/get-disposal-location-by-user-id-use-case'
import { PrismaDisposalLocationRepository } from '@/repositories/prisma/prisma-disposal-repository'

export function makeGetDisposalLocationsByUserIdUseCase() {
  const prismaDisposalLocationRepository =
    new PrismaDisposalLocationRepository()
  const useCase = new GetDisposalLocationsByUserIdUseCase(
    prismaDisposalLocationRepository,
  )
  return useCase
}
