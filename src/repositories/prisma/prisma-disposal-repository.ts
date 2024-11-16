import { DisposalLocationRepositoryProps } from './../interfaces/disposal-location-repository'
import { prisma } from '@/lib/prisma'
import { Prisma, DisposalLocation } from '@prisma/client'

export class PrismaDisposalLocationRepository
  implements DisposalLocationRepositoryProps
{
  /**
   * Cria um novo local de descarte no banco de dados.
   * @param data - Dados necessários para criar um local de descarte.
   * @returns O local de descarte criado.
   */
  async create(
    data: Prisma.DisposalLocationCreateInput,
  ): Promise<DisposalLocation> {
    try {
      const disposalLocation = await prisma.disposalLocation.create({
        data,
      })
      return disposalLocation
    } catch (error) {
      console.error('Erro ao criar local de descarte:', error)
      throw new Error('Erro ao criar local de descarte.')
    }
  }

  /**
   * Encontra um local de descarte pelo seu ID.
   * @param id - ID do local de descarte a ser encontrado.
   * @returns O local de descarte encontrado ou null se não existir.
   */
  async findById(id: string): Promise<DisposalLocation | null> {
    try {
      const disposalLocation = await prisma.disposalLocation.findUnique({
        where: { id },
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          address: {
            select: {
              id: true,
              street: true,
              city: true,
              state: true,
              postalCode: true,
            },
          },
        },
      })
      return disposalLocation
    } catch (error) {
      console.error(`Erro ao buscar local de descarte com ID ${id}:`, error)
      throw new Error('Erro ao buscar local de descarte.')
    }
  }

  /**
   * Exclui um local de descarte pelo seu ID.
   * @param id - ID do local de descarte a ser excluído.
   * @returns O local de descarte excluído.
   */
  async delete(id: string): Promise<DisposalLocation> {
    try {
      const deletedDisposalLocation = await prisma.disposalLocation.delete({
        where: { id },
      })
      return deletedDisposalLocation
    } catch (error) {
      console.error(`Erro ao deletar local de descarte com ID ${id}:`, error)
      throw new Error('Erro ao deletar local de descarte.')
    }
  }

  /**
   * Atualiza um local de descarte existente.
   * @param id - ID do local de descarte a ser atualizado.
   * @param data - Dados para atualizar o local de descarte.
   * @returns O local de descarte atualizado.
   */
  async update(
    data: Prisma.DisposalLocationUpdateInput & { id: string },
  ): Promise<DisposalLocation> {
    try {
      const { id, ...disposalLocationData } = data
      const updatedDisposalLocation = await prisma.disposalLocation.update({
        where: { id },
        data: disposalLocationData,
      })
      return updatedDisposalLocation
    } catch (error) {
      console.error(`Erro ao atualizar local de descarte:`, error)
      throw new Error('Erro ao atualizar local de descarte.')
    }
  }

  /**
   * Encontra todos os locais de descarte feitos por um usuário específico.
   * @param userId - ID do usuário.
   * @returns Uma lista de locais de descarte ou uma lista vazia se nenhum local for encontrado.
   */
  async findByUserId(userId: string): Promise<DisposalLocation[]> {
    try {
      const disposalLocations = await prisma.disposalLocation.findMany({
        where: { userId },
        include: {
          address: {
            select: {
              id: true,
              street: true,
              city: true,
              state: true,
              postalCode: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      })
      return disposalLocations
    } catch (error) {
      console.error(
        `Erro ao buscar locais de descarte do usuário com ID ${userId}:`,
        error,
      )
      throw new Error('Erro ao buscar locais de descarte do usuário.')
    }
  }

  /**
   * Encontra todos os locais de descarte associados a um tipo de resíduo específico.
   * @param wasteType - Tipo de resíduo.
   * @returns Uma lista de locais de descarte ou uma lista vazia se nenhum local for encontrado.
   */
  async findByWasteType(wasteType: string): Promise<DisposalLocation[]> {
    try {
      const disposalLocations = await prisma.disposalLocation.findMany({
        where: { wasteType },
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          address: {
            select: {
              id: true,
              street: true,
              city: true,
              state: true,
              postalCode: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      })
      return disposalLocations
    } catch (error) {
      console.error(
        `Erro ao buscar locais de descarte para tipo de resíduo ${wasteType}:`,
        error,
      )
      throw new Error('Erro ao buscar locais de descarte para tipo de resíduo.')
    }
  }
}
