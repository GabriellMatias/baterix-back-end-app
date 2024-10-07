import { PrismaPostsRepository } from '@/repositories/prisma/prisma-posts-repository'
import { GetPostsByUserIdUseCase } from '../get-posts-by-user-id-use-case'

export function makeGetPostsByUserIdUseCase() {
  const prismaPostsRepository = new PrismaPostsRepository()
  const useCase = new GetPostsByUserIdUseCase(prismaPostsRepository)
  return useCase
}
