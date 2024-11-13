import { DisposalLocationRepositoryProps } from '@/repositories/interfaces/disposal-location-repository'
import { DisposalLocation } from '@prisma/client'

interface GetDisposalLocationsByUserIdUseCaseRequest {
  userId: string
}

interface GetDisposalLocationsByUserIdUseCaseResponse {
  disposalLocations: DisposalLocation[] | null
}

export class GetDisposalLocationsByUserIdUseCase {
  constructor(
    private disposalLocationRepository: DisposalLocationRepositoryProps,
  ) {}

  async execute({
    userId,
  }: GetDisposalLocationsByUserIdUseCaseRequest): Promise<GetDisposalLocationsByUserIdUseCaseResponse> {
    const disposalLocations =
      await this.disposalLocationRepository.findByUserId(userId)
    return { disposalLocations }
  }
}
