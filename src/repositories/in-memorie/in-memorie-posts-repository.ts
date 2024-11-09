import { Post } from '@prisma/client'
import { PostsRepositoryProps } from '../interfaces/posts-repository'

interface InMemoryPost {
  id: string
  userId: string
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
}

export class InMemoryPostsRepository implements PostsRepositoryProps {
  private posts: InMemoryPost[] = []
  private idCounter = 1

  /**
   * Cria um novo post na memória.
   * @param data - Dados necessários para criar um post.
   * @returns O post criado.
   */
  async create(
    data: Omit<InMemoryPost, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Post> {
    const newPost = {
      ...data,
      id: String(this.idCounter++),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.posts.push(newPost)
    return newPost as Post
  }

  /**
   * Encontra um post pelo seu ID.
   * @param postId - ID do post a ser encontrado.
   * @returns O post encontrado ou null se não existir.
   */
  async findById(postId: string): Promise<Post | null> {
    const post = this.posts.find((p) => p.id === postId)
    return post || null
  }

  /**
   * Encontra todos os posts criados por um usuário específico.
   * @param userId - ID do usuário.
   * @returns Uma lista de posts ou null se nenhum post for encontrado.
   */
  async findByUserId(userId: string): Promise<Post[] | null> {
    const userPosts = this.posts.filter((p) => p.userId === userId)
    return userPosts.length > 0 ? userPosts : null
  }

  /**
   * Atualiza um post existente.
   * @param data - Dados para atualizar o post, incluindo o ID do post.
   * @returns O post atualizado.
   */
  async edit(
    data: Omit<InMemoryPost, 'createdAt' | 'updatedAt'> & { id: string },
  ): Promise<Post> {
    const postIndex = this.posts.findIndex((p) => p.id === data.id)
    if (postIndex === -1) throw new Error('Post not found.')

    const updatedPost = {
      ...this.posts[postIndex],
      ...data,
      updatedAt: new Date(),
    }
    this.posts[postIndex] = updatedPost
    return updatedPost as Post
  }

  /**
   * Exclui um post pelo seu ID.
   * @param postId - ID do post a ser excluído.
   * @returns O post excluído.
   */
  async delete(postId: string): Promise<Post> {
    const postIndex = this.posts.findIndex((p) => p.id === postId)
    if (postIndex === -1) throw new Error('Post not found.')

    const deletedPost = this.posts[postIndex]
    this.posts.splice(postIndex, 1)
    return deletedPost as Post
  }
}
