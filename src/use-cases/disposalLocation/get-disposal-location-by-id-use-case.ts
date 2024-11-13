import { DisposalLocationRepositoryProps } from '@/repositories/interfaces/disposal-location-repository'
import { DisposalLocation } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface GetDisposalLocationByIdUseCaseRequest {
  disposalLocationId: string
}

interface GetDisposalLocationByIdUseCaseResponse {
  disposalLocation: DisposalLocation
}

export class GetDisposalLocationByIdUseCase {
  constructor(
    private disposalLocationRepository: DisposalLocationRepositoryProps,
  ) {}

  async execute({
    disposalLocationId,
  }: GetDisposalLocationByIdUseCaseRequest): Promise<GetDisposalLocationByIdUseCaseResponse> {
    const disposalLocation = await this.disposalLocationRepository.findById(
      disposalLocationId,
    )

    if (!disposalLocation) {
      throw new ResourceNotFoundError()
    }

    return { disposalLocation }
  }
}
