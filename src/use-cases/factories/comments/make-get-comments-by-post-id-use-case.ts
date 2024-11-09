import { PrismaCommentsRepository } from '@/repositories/prisma/prisma-comments-repository'
import { GetCommentsByPostIdUseCase } from '@/use-cases/comments/get-comments-by-post-id-use-case'

export function makeGetCommentByPostIdUseCase() {
  const prismaCommentsRepository = new PrismaCommentsRepository()
  const useCase = new GetCommentsByPostIdUseCase(prismaCommentsRepository)
  return useCase
}
