import { DisposalLocationRepositoryProps } from './../interfaces/disposal-location-repository'
import { DisposalLocation, Prisma } from '@prisma/client'

export class InMemoryDisposalLocationRepository
  implements DisposalLocationRepositoryProps
{
  public items: DisposalLocation[] = [] // Armazena os disposal locations em memória

  /**
   * Cria um novo disposal location na memória.
   * @param data - Dados necessários para criar um disposal location.
   * @returns O disposal location criado.
   */
  async create(
    data: Prisma.DisposalLocationCreateInput,
  ): Promise<DisposalLocation> {
    try {
      const disposalLocation: DisposalLocation = {
        id: `disposalLocation${this.items.length + 1}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: data.name,
        description: data.description || null,
        wasteType: data.wasteType,
        userId: data.createdBy.connect?.id as string, // Usa userId diretamente como string
        addressId: data.address.connect?.id as string, // Usa addressId diretamente como string
      }

      this.items.push(disposalLocation)
      return disposalLocation
    } catch (error) {
      console.error('Erro ao criar disposal location na memória:', error)
      throw new Error('Erro ao criar disposal location na memória.')
    }
  }

  /**
   * Encontra um disposal location pelo seu ID.
   * @param id - ID do disposal location a ser encontrado.
   * @returns O disposal location encontrado ou null se não existir.
   */
  async findById(id: string): Promise<DisposalLocation | null> {
    try {
      const disposalLocation = this.items.find((item) => item.id === id)
      return disposalLocation || null
    } catch (error) {
      console.error(
        `Erro ao buscar disposal location com ID ${id} na memória:`,
        error,
      )
      throw new Error('Erro ao buscar disposal location na memória.')
    }
  }

  /**
   * Exclui um disposal location pelo seu ID.
   * @param id - ID do disposal location a ser excluído.
   * @returns O disposal location excluído.
   */
  async delete(id: string): Promise<DisposalLocation> {
    try {
      const index = this.items.findIndex((item) => item.id === id)

      if (index === -1) {
        throw new Error('Disposal location não encontrado.')
      }

      const deletedDisposalLocation = this.items[index]
      this.items.splice(index, 1)
      return deletedDisposalLocation
    } catch (error) {
      console.error(
        `Erro ao deletar disposal location com ID ${id} na memória:`,
        error,
      )
      throw new Error('Erro ao deletar disposal location na memória.')
    }
  }

  /**
   * Atualiza um disposal location existente.
   * @param id - ID do disposal location a ser atualizado.
   * @param data - Dados para atualizar o disposal location.
   * @returns O disposal location atualizado.
   */
  async update(
    data: Prisma.DisposalLocationUpdateInput & { id: string },
  ): Promise<DisposalLocation> {
    const { id } = data
    try {
      const index = this.items.findIndex((item) => item.id === id)

      if (index === -1) {
        throw new Error('Disposal location não encontrado.')
      }

      const updatedDisposalLocation: DisposalLocation = {
        ...this.items[index],
        ...data,
        name: data.name as string,
        description: data.description || null,
        wasteType: data.wasteType as string,
        updatedAt: new Date(),
      }

      this.items[index] = updatedDisposalLocation

      return updatedDisposalLocation
    } catch (error) {
      console.error(
        `Erro ao atualizar disposal location com ID ${id} na memória:`,
        error,
      )
      throw new Error('Erro ao atualizar disposal location na memória.')
    }
  }

  /**
   * Encontra todos os disposal locations feitos por um usuário específico.
   * @param userId - ID do usuário.
   * @returns Uma lista de disposal locations ou uma lista vazia se nenhum disposal location for encontrado.
   */
  async findByUserId(userId: string): Promise<DisposalLocation[]> {
    try {
      const disposalLocations = this.items.filter(
        (item) => item.userId === userId,
      )
      return disposalLocations
    } catch (error) {
      console.error(
        `Erro ao buscar disposal locations do usuário com ID ${userId} na memória:`,
        error,
      )
      throw new Error(
        'Erro ao buscar disposal locations do usuário na memória.',
      )
    }
  }

  /**
   * Encontra todos os disposal locations associados a um endereço específico.
   * @param addressId - ID do endereço.
   * @returns Uma lista de disposal locations ou uma lista vazia se nenhum disposal location for encontrado.
   */
  async findByAddressId(addressId: string): Promise<DisposalLocation[]> {
    try {
      const disposalLocations = this.items.filter(
        (item) => item.addressId === addressId,
      )
      return disposalLocations
    } catch (error) {
      console.error(
        `Erro ao buscar disposal locations do endereço com ID ${addressId} na memória:`,
        error,
      )
      throw new Error(
        'Erro ao buscar disposal locations do endereço na memória.',
      )
    }
  }
}
