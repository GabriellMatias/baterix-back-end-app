import { prisma } from '@/lib/prisma'
import { Prisma, Post } from '@prisma/client'
import type { PostsRepositoryProps } from '../interfaces/posts-repository'

export class PrismaPostsRepository implements PostsRepositoryProps {
  /**
   * Cria um novo post no banco de dados.
   * @param data - Dados necessários para criar um post.
   * @returns O post criado.
   */
  async create(data: Prisma.PostCreateInput): Promise<Post> {
    try {
      const post = await prisma.post.create({
        data,
      })
      return post
    } catch (error) {
      console.error('Error creating post:', error)
      throw new Error('Failed to create post.')
    }
  }

  /**
   * Encontra um post pelo seu ID.
   * @param postId - ID do post a ser encontrado.
   * @returns O post encontrado ou null se não existir.
   */
  async findById(postId: string): Promise<Post | null> {
    try {
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          comments: {
            include: {
              createdBy: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
      })
      return post
    } catch (error) {
      console.error('Error finding post by ID:', error)
      throw new Error('Failed to find post by ID.')
    }
  }

  /**
   * Encontra todos os posts criados por um usuário específico.
   * @param userId - ID do usuário.
   * @returns Uma lista de posts ou null se nenhum post for encontrado.
   */
  async findByUserId(userId: string): Promise<Post[] | null> {
    try {
      const posts = await prisma.post.findMany({
        where: {
          userId,
        },
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          comments: {
            include: {
              createdBy: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
      return posts.length > 0 ? posts : null
    } catch (error) {
      console.error('Error finding posts by user ID:', error)
      throw new Error('Failed to find posts by user ID.')
    }
  }

  /**
   * Atualiza um post existente.
   * @param data - Dados para atualizar o post, incluindo o ID do post.
   * @returns O post atualizado.
   */
  async update(data: Prisma.PostUpdateInput & { id: string }): Promise<Post> {
    try {
      const { id, ...updateData } = data
      const updatedPost = await prisma.post.update({
        where: {
          id,
        },
        data: updateData,
      })
      return updatedPost
    } catch (error) {
      console.error('Error updating post:', error)
      throw new Error('Failed to update post.')
    }
  }

  /**
   * Exclui um post pelo seu ID.
   * @param postId - ID do post a ser excluído.
   * @returns O post excluído.
   */
  async delete(postId: string): Promise<Post> {
    try {
      const deletedPost = await prisma.post.delete({
        where: {
          id: postId,
        },
      })
      return deletedPost
    } catch (error) {
      console.error('Error deleting post:', error)
      throw new Error('Failed to delete post.')
    }
  }
}
