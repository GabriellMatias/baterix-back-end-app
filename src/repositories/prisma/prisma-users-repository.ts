import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { UsersRepositoryProps } from '../interfaces/users-repository'

export class PrismaUsersRepository implements UsersRepositoryProps {
  /**
   * Cria um novo usuário no banco de dados.
   * @param data - Dados necessários para criar um usuário.
   * @returns O usuário criado.
   */
  async create(data: Prisma.UserCreateInput): Promise<User> {
    try {
      const user = await prisma.user.create({
        data,
      })
      return user
    } catch (error) {
      console.error('Error creating user:', error)
      throw new Error('Failed to create user.')
    }
  }

  /**
   * Encontra um usuário pelo seu e-mail.
   * @param email - E-mail do usuário a ser encontrado.
   * @returns O usuário encontrado ou null se não existir.
   */
  async findByEmail(email: string): Promise<User | null> {
    try {
      const userWithSamEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      })
      return userWithSamEmail
    } catch (error) {
      console.error('Error finding user by email:', error)
      throw new Error('Failed to find user by email.')
    }
  }

  /**
   * Encontra um usuário pelo seu ID.
   * @param id - ID do usuário a ser encontrado.
   * @returns O usuário encontrado ou null se não existir.
   */
  async findById(id: string): Promise<User | null> {
    try {
      const userWithSamEmail = await prisma.user.findUnique({
        where: {
          id,
        },
      })
      return userWithSamEmail
    } catch (error) {
      console.error('Error finding user by ID:', error)
      throw new Error('Failed to find user by ID.')
    }
  }
}
