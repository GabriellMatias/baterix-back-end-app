import { Prisma, User } from '@prisma/client'
import { UsersRepositoryProps } from '../interfaces/users-repository'

export class InMemoryUserRepository implements UsersRepositoryProps {
  public items: User[] = []

  /**
   * Cria um novo usuário na memória.
   * @param data - Dados necessários para criar um usuário.
   * @returns O usuário criado.
   */
  async create(data: Prisma.UserCreateInput): Promise<User> {
    try {
      const user = {
        id: `user${this.items.length + 1}`,
        name: data.name,
        email: data.email,
        password_hash: data.passwordHash,
        role: data.role!,
        created_at: new Date(),
      }

      this.items.push(user)
      return user
    } catch (error) {
      console.error('Error creating user in memory:', error)
      throw new Error('Failed to create user in memory.')
    }
  }

  /**
   * Encontra um usuário pelo seu e-mail.
   * @param email - E-mail do usuário a ser encontrado.
   * @returns O usuário encontrado ou null se não existir.
   */
  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = this.items.find((item) => item.email === email)

      if (!user) {
        return null
      }
      return user
    } catch (error) {
      console.error('Error finding user by email in memory:', error)
      throw new Error('Failed to find user by email in memory.')
    }
  }

  /**
   * Encontra um usuário pelo seu ID.
   * @param id - ID do usuário a ser encontrado.
   * @returns O usuário encontrado ou null se não existir.
   */
  async findById(id: string): Promise<User | null> {
    try {
      const user = this.items.find((item) => item.id === id)

      if (!user) {
        return null
      }
      return user
    } catch (error) {
      console.error('Error finding user by ID in memory:', error)
      throw new Error('Failed to find user by ID in memory.')
    }
  }
}
