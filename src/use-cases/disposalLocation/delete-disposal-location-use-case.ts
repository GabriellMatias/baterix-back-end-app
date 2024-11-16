import { DisposalLocationRepositoryProps } from '@/repositories/interfaces/disposal-location-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface DeleteDisposalLocationUseCaseParams {
  disposalLocationId: string
}

export class DeleteDisposalLocationUseCase {
  constructor(
    private disposalLocationRepository: DisposalLocationRepositoryProps,
  ) {}

  async execute({
    disposalLocationId,
  }: DeleteDisposalLocationUseCaseParams): Promise<void> {
    const existingDisposalLocation =
      await this.disposalLocationRepository.findById(disposalLocationId)

    if (!existingDisposalLocation) {
      throw new ResourceNotFoundError()
    }

    await this.disposalLocationRepository.delete(disposalLocationId)
  }
}
