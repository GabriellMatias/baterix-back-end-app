import { PrismaPostsRepository } from '@/repositories/prisma/prisma-posts-repository'
import { DeletePostUseCase } from '@/use-cases/posts/delete-post-use-case'

export function makeDeletePostUseCase() {
  const prismaPostsRepository = new PrismaPostsRepository()
  const useCase = new DeletePostUseCase(prismaPostsRepository)
  return useCase
}
