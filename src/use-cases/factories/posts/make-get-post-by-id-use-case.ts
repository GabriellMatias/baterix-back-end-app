import { PrismaPostsRepository } from '@/repositories/prisma/prisma-posts-repository'
import { GetPostByIdUseCase } from '@/use-cases/posts/get-posts-use-case'

export function makeGetPostByIdUseCase() {
  const prismaPostsRepository = new PrismaPostsRepository()
  const useCase = new GetPostByIdUseCase(prismaPostsRepository)
  return useCase
}
