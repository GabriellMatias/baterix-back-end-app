import { AddressRepositoryProps } from '@/repositories/interfaces/address-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface DeleteAddressUseCaseParams {
  addressId: string
}

export class DeleteAddressUseCase {
  constructor(private addressesRepository: AddressRepositoryProps) {}

  async execute({ addressId }: DeleteAddressUseCaseParams): Promise<void> {
    const existingAddress = await this.addressesRepository.findById(addressId)

    if (!existingAddress) {
      throw new ResourceNotFoundError()
    }

    await this.addressesRepository.delete(addressId)
  }
}
