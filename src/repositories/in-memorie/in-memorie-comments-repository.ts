import { CommentsRepositoryProps } from './../interfaces/comments-repository'
import { Comment, Prisma } from '@prisma/client'

export class InMemoryCommentsRepository implements CommentsRepositoryProps {
  public items: Comment[] = [] // Armazena os comentários em memória

  /**
   * Cria um novo comentário na memória.
   * @param data - Dados necessários para criar um comentário.
   * @returns O comentário criado.
   */
  async create(data: Prisma.CommentCreateInput): Promise<Comment> {
    try {
      const comment: Comment = {
        id: `comment${this.items.length + 1}`,
        createdAt: new Date(),
        ...data,
      }

      this.items.push(comment)
      return comment
    } catch (error) {
      console.error('Erro ao criar comentário na memória:', error)
      throw new Error('Erro ao criar comentário na memória.')
    }
  }

  /**
   * Encontra um comentário pelo seu ID.
   * @param id - ID do comentário a ser encontrado.
   * @returns O comentário encontrado ou null se não existir.
   */
  async findById(id: string): Promise<Comment | null> {
    try {
      const comment = this.items.find((item) => item.id === id)
      return comment || null
    } catch (error) {
      console.error(`Erro ao buscar comentário com ID ${id} na memória:`, error)
      throw new Error('Erro ao buscar comentário na memória.')
    }
  }

  /**
   * Exclui um comentário pelo seu ID.
   * @param id - ID do comentário a ser excluído.
   * @returns O comentário excluído.
   */
  async delete(id: string): Promise<Comment> {
    try {
      const index = this.items.findIndex((item) => item.id === id)

      if (index === -1) {
        throw new Error('Comentário não encontrado.')
      }

      const deletedComment = this.items[index]
      this.items.splice(index, 1)
      return deletedComment
    } catch (error) {
      console.error(
        `Erro ao deletar comentário com ID ${id} na memória:`,
        error,
      )
      throw new Error('Erro ao deletar comentário na memória.')
    }
  }

  /**
   * Atualiza um comentário existente.
   * @param id - ID do comentário a ser atualizado.
   * @param data - Dados para atualizar o comentário.
   * @returns O comentário atualizado.
   */
  async edit(id: string, data: Prisma.CommentUpdateInput): Promise<Comment> {
    try {
      const index = this.items.findIndex((item) => item.id === id)

      if (index === -1) {
        throw new Error('Comentário não encontrado.')
      }

      const updatedComment = { ...this.items[index], ...data }
      this.items[index] = updatedComment

      return updatedComment
    } catch (error) {
      console.error(
        `Erro ao atualizar comentário com ID ${id} na memória:`,
        error,
      )
      throw new Error('Erro ao atualizar comentário na memória.')
    }
  }

  /**
   * Encontra todos os comentários feitos por um usuário específico.
   * @param userId - ID do usuário.
   * @returns Uma lista de comentários ou uma lista vazia se nenhum comentário for encontrado.
   */
  async findByUserId(userId: string): Promise<Comment[]> {
    try {
      const comments = this.items.filter((item) => item.userId === userId)
      return comments
    } catch (error) {
      console.error(
        `Erro ao buscar comentários do usuário com ID ${userId} na memória:`,
        error,
      )
      throw new Error('Erro ao buscar comentários do usuário na memória.')
    }
  }

  /**
   * Encontra todos os comentários associados a um post específico.
   * @param postId - ID do post.
   * @returns Uma lista de comentários ou uma lista vazia se nenhum comentário for encontrado.
   */
  async findByPostId(postId: string): Promise<Comment[]> {
    try {
      const comments = this.items.filter((item) => item.postId === postId)
      return comments
    } catch (error) {
      console.error(
        `Erro ao buscar comentários do post com ID ${postId} na memória:`,
        error,
      )
      throw new Error('Erro ao buscar comentários do post na memória.')
    }
  }
}
