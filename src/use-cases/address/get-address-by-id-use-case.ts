import { AddressRepositoryProps } from '@/repositories/interfaces/address-repository'
import { Address } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface GetAddressByIdUseCaseRequest {
  addressId: string
}

interface GetAddressByIdUseCaseResponse {
  address: Address
}

export class GetAddressByIdUseCase {
  constructor(private addressesRepository: AddressRepositoryProps) {}

  async execute({
    addressId,
  }: GetAddressByIdUseCaseRequest): Promise<GetAddressByIdUseCaseResponse> {
    const address = await this.addressesRepository.findById(addressId)

    if (!address) {
      throw new ResourceNotFoundError()
    }

    return { address }
  }
}
