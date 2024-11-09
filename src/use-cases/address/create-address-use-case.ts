import { AddressRepositoryProps } from '@/repositories/interfaces/address-repository'
import { Address } from '@prisma/client'

interface CreateAddressUseCaseParams {
  street: string
  city: string
  state: string
  postalCode: string
  country: string
  userId: string
}

interface CreateAddressUseCaseResponse {
  address: Address
}

export class CreateAddressUseCase {
  constructor(private addressesRepository: AddressRepositoryProps) {}

  async execute({
    street,
    city,
    postalCode,
    country,
    userId,
  }: CreateAddressUseCaseParams): Promise<CreateAddressUseCaseResponse> {
    const address = await this.addressesRepository.create({
      street,
      city,
      postalCode,
      createdBy: {
        connect: {
          id: userId,
        },
      },
    })

    return { address }
  }
}
