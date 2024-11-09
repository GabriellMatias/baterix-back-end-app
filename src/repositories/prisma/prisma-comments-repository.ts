// src/repositories/prisma-comments-repository.ts

import { CommentsRepositoryProps } from './../interfaces/comments-repository'
import { prisma } from '@/lib/prisma'
import { Prisma, Comment } from '@prisma/client'

export class PrismaCommentsRepository implements CommentsRepositoryProps {
  /**
   * Cria um novo comentário no banco de dados.
   * @param data - Dados necessários para criar um comentário.
   * @returns O comentário criado.
   */
  async create(data: Prisma.CommentCreateInput): Promise<Comment> {
    try {
      const comment = await prisma.comment.create({
        data,
      })
      return comment
    } catch (error) {
      console.error('Erro ao criar comentário:', error)
      throw new Error('Erro ao criar comentário.')
    }
  }

  /**
   * Encontra um comentário pelo seu ID.
   * @param id - ID do comentário a ser encontrado.
   * @returns O comentário encontrado ou null se não existir.
   */
  async findById(id: string): Promise<Comment | null> {
    try {
      const comment = await prisma.comment.findUnique({
        where: { id },
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          post: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      })
      return comment
    } catch (error) {
      console.error(`Erro ao buscar comentário com ID ${id}:`, error)
      throw new Error('Erro ao buscar comentário.')
    }
  }

  /**
   * Exclui um comentário pelo seu ID.
   * @param id - ID do comentário a ser excluído.
   * @returns O comentário excluído.
   */
  async delete(id: string): Promise<Comment> {
    try {
      const deletedComment = await prisma.comment.delete({
        where: { id },
      })
      return deletedComment
    } catch (error) {
      console.error(`Erro ao deletar comentário com ID ${id}:`, error)
      throw new Error('Erro ao deletar comentário.')
    }
  }

  /**
   * Atualiza um comentário existente.
   * @param id - ID do comentário a ser atualizado.
   * @param data - Dados para atualizar o comentário.
   * @returns O comentário atualizado.
   */
  async update(
    data: Prisma.PostUpdateInput & { id: string },
  ): Promise<Comment> {
    try {
      const { id, ...commentData } = data
      const updatedComment = await prisma.comment.update({
        where: { id },
        data: commentData,
      })
      return updatedComment
    } catch (error) {
      console.error(`Erro ao atualizar comentário:`, error)
      throw new Error('Erro ao atualizar comentário.')
    }
  }

  /**
   * Encontra todos os comentários feitos por um usuário específico.
   * @param userId - ID do usuário.
   * @returns Uma lista de comentários ou uma lista vazia se nenhum comentário for encontrado.
   */
  async findByUserId(userId: string): Promise<Comment[]> {
    try {
      const comments = await prisma.comment.findMany({
        where: { userId },
        include: {
          post: {
            select: {
              id: true,
              title: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      })
      return comments
    } catch (error) {
      console.error(
        `Erro ao buscar comentários do usuário com ID ${userId}:`,
        error,
      )
      throw new Error('Erro ao buscar comentários do usuário.')
    }
  }

  /**
   * Encontra todos os comentários associados a um post específico.
   * @param postId - ID do post.
   * @returns Uma lista de comentários ou uma lista vazia se nenhum comentário for encontrado.
   */
  async findByPostId(postId: string): Promise<Comment[]> {
    try {
      const comments = await prisma.comment.findMany({
        where: { postId },
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: { createdAt: 'asc' },
      })
      return comments
    } catch (error) {
      console.error(
        `Erro ao buscar comentários do post com ID ${postId}:`,
        error,
      )
      throw new Error('Erro ao buscar comentários do post.')
    }
  }
}
