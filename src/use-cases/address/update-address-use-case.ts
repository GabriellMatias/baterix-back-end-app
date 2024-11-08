import { AddressRepositoryProps } from '@/repositories/interfaces/address-repository'
import { Address } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface UpdateAddressUseCaseParams {
  addressId: string
  street?: string
  city?: string
  state?: string
  postalCode?: string
}

interface UpdateAddressUseCaseResponse {
  address: Address
}

export class UpdateAddressUseCase {
  constructor(private addressesRepository: AddressRepositoryProps) {}

  async execute({
    addressId,
    street,
    city,
    postalCode,
  }: UpdateAddressUseCaseParams): Promise<UpdateAddressUseCaseResponse> {
    const existingAddress = await this.addressesRepository.findById(addressId)

    if (!existingAddress) {
      throw new ResourceNotFoundError()
    }

    const updatedAddress = await this.addressesRepository.update({
      id: addressId,
      street,
      city,
      postalCode,
    })

    return { address: updatedAddress }
  }
}
