import { PrismaDisposalLocationRepository } from '@/repositories/prisma/prisma-disposal-repository'
import { GetDisposalLocationByIdUseCase } from '@/use-cases/disposalLocation/get-disposal-location-by-id-use-case'

export function makeGetDisposalLocationByIdUseCase() {
  const prismaDisposalLocationRepository =
    new PrismaDisposalLocationRepository()
  const useCase = new GetDisposalLocationByIdUseCase(
    prismaDisposalLocationRepository,
  )
  return useCase
}
