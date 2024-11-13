import { DisposalLocationRepositoryProps } from '@/repositories/interfaces/disposal-location-repository'
import { DisposalLocation } from '@prisma/client'

interface CreateDisposalLocationUseCaseParams {
  name: string
  description?: string
  wasteType: string
  authorId: string
  addressId: string
}

interface CreateDisposalLocationUseCaseResponse {
  disposalLocation: DisposalLocation
}

export class CreateDisposalLocationUseCase {
  constructor(
    private disposalLocationRepository: DisposalLocationRepositoryProps,
  ) {}

  async execute({
    name,
    description,
    wasteType,
    authorId,
    addressId,
  }: CreateDisposalLocationUseCaseParams): Promise<CreateDisposalLocationUseCaseResponse> {
    const disposalLocation = await this.disposalLocationRepository.create({
      name,
      description,
      wasteType,
      createdBy: {
        connect: {
          id: authorId,
        },
      },
      address: {
        connect: {
          id: addressId,
        },
      },
    })

    return { disposalLocation }
  }
}
