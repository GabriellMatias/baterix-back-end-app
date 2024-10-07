import { Prisma, Address } from '@prisma/client'

export interface AddressRepositoryProps {
  create(data: Prisma.AddressCreateInput): Promise<Address>
  delete(id: string): Promise<Address>
  edit(data: Prisma.AddressUpdateInput): Promise<Address>
  findById(addressId: string): Promise<Address | null>
  findByUserId(userId: string): Promise<Address | null>
}
