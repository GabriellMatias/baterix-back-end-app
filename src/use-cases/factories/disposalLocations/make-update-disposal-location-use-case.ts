import { PrismaDisposalLocationRepository } from '@/repositories/prisma/prisma-disposal-repository'
import { UpdateDisposalLocationUseCase } from '@/use-cases/disposalLocation/update-disposal-location-use-case'

export function makeUpdateDisposalLocationUseCase() {
  const prismaDisposalLocationRepository =
    new PrismaDisposalLocationRepository()
  const useCase = new UpdateDisposalLocationUseCase(
    prismaDisposalLocationRepository,
  )
  return useCase
}
