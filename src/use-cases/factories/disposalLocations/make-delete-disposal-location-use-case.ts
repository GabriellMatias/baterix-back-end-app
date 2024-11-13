import { PrismaDisposalLocationRepository } from '@/repositories/prisma/prisma-disposal-repository'
import { DeleteDisposalLocationUseCase } from '@/use-cases/disposalLocation/delete-disposal-location-use-case'

export function makeDeleteDisposalLocationUseCase() {
  const prismaDisposalLocationRepository =
    new PrismaDisposalLocationRepository()
  const useCase = new DeleteDisposalLocationUseCase(
    prismaDisposalLocationRepository,
  )
  return useCase
}
