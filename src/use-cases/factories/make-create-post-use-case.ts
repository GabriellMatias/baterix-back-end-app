import { PrismaPostsRepository } from '@/repositories/prisma/prisma-posts-repository'
import { CreatePostUseCase } from '../create-post-use-case'

export function makeCreatePostUseCase() {
  const prismaPostsRepository = new PrismaPostsRepository()
  const useCase = new CreatePostUseCase(prismaPostsRepository)
  return useCase
}
