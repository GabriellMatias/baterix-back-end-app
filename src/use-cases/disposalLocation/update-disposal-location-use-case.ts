import { DisposalLocationRepositoryProps } from '@/repositories/interfaces/disposal-location-repository'
import { DisposalLocation } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface UpdateDisposalLocationUseCaseParams {
  disposalLocationId: string
  address?: string
  capacity?: number
}

interface UpdateDisposalLocationUseCaseResponse {
  disposalLocation: DisposalLocation
}

export class UpdateDisposalLocationUseCase {
  constructor(
    private disposalLocationRepository: DisposalLocationRepositoryProps,
  ) {}

  async execute({
    disposalLocationId,
    address,
    capacity,
  }: UpdateDisposalLocationUseCaseParams): Promise<UpdateDisposalLocationUseCaseResponse> {
    const existingDisposalLocation =
      await this.disposalLocationRepository.findById(disposalLocationId)

    if (!existingDisposalLocation) {
      throw new ResourceNotFoundError()
    }

    const updatedDisposalLocation =
      await this.disposalLocationRepository.update({
        id: disposalLocationId,
        address,
        capacity,
      })

    return { disposalLocation: updatedDisposalLocation }
  }
}
