import { PrismaPostsRepository } from '@/repositories/prisma/prisma-posts-repository'
import { UpdatePostUseCase } from '@/use-cases/posts/update-post-use-case'

export function makeEditPostUseCase() {
  const prismaPostsRepository = new PrismaPostsRepository()
  const useCase = new UpdatePostUseCase(prismaPostsRepository)
  return useCase
}
