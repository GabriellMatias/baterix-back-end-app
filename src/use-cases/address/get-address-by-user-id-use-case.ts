import { AddressRepositoryProps } from '@/repositories/interfaces/address-repository'
import { Address } from '@prisma/client'

interface GetAddressesByUserIdUseCaseRequest {
  userId: string
}

interface GetAddressesByUserIdUseCaseResponse {
  addresses: Address[] | null
}

export class GetAddressesByUserIdUseCase {
  constructor(private addressesRepository: AddressRepositoryProps) {}

  async execute({
    userId,
  }: GetAddressesByUserIdUseCaseRequest): Promise<GetAddressesByUserIdUseCaseResponse> {
    const addresses = await this.addressesRepository.findByUserId(userId)
    return { addresses }
  }
}
