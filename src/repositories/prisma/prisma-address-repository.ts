import { prisma } from '@/lib/prisma'
import { Prisma, Address } from '@prisma/client'
import type { AddressRepositoryProps } from '../interfaces/address-repository'

export class PrismaAddressRepository implements AddressRepositoryProps {
  /**
   * Cria um novo endereço no banco de dados.
   * @param data - Dados necessários para criar o endereço.
   * @returns O endereço criado.
   */
  async create(data: Prisma.AddressCreateInput): Promise<Address> {
    try {
      const address = await prisma.address.create({
        data,
      })
      return address
    } catch (error) {
      console.error('Error creating address:', error)
      throw new Error('Failed to create address.')
    }
  }

  /**
   * Encontra um endereço pelo seu ID.
   * @param addressId - ID do endereço a ser encontrado.
   * @returns O endereço encontrado ou null se não existir.
   */
  async findById(addressId: string): Promise<Address | null> {
    try {
      const address = await prisma.address.findUnique({
        where: {
          id: addressId,
        },
      })
      return address
    } catch (error) {
      console.error('Error finding address by ID:', error)
      throw new Error('Failed to find address by ID.')
    }
  }

  /**
   * Encontra todos os endereços associados a um usuário específico.
   * @param userId - ID do usuário.
   * @returns Uma lista de endereços ou null se nenhum for encontrado.
   */
  async findByUserId(userId: string): Promise<Address | null> {
    try {
      const address = await prisma.address.findFirst({
        where: {
          User: {
            some: {
              id: userId,
            },
          },
        },
      })
      return address
    } catch (error) {
      console.error('Error finding addresses by user ID:', error)
      throw new Error('Failed to find addresses by user ID.')
    }
  }

  /**
   * Atualiza um endereço existente.
   * @param data - Dados para atualizar o endereço, incluindo o ID.
   * @returns O endereço atualizado.
   */
  async update(
    data: Prisma.AddressUpdateInput & { id: string },
  ): Promise<Address> {
    try {
      const { id, ...updateData } = data
      const updatedAddress = await prisma.address.update({
        where: {
          id,
        },
        data: updateData,
      })
      return updatedAddress
    } catch (error) {
      console.error('Error updating address:', error)
      throw new Error('Failed to update address.')
    }
  }

  /**
   * Exclui um endereço pelo seu ID.
   * @param addressId - ID do endereço a ser excluído.
   * @returns O endereço excluído.
   */
  async delete(addressId: string): Promise<Address> {
    try {
      const deletedAddress = await prisma.address.delete({
        where: {
          id: addressId,
        },
      })
      return deletedAddress
    } catch (error) {
      console.error('Error deleting address:', error)
      throw new Error('Failed to delete address.')
    }
  }
}
