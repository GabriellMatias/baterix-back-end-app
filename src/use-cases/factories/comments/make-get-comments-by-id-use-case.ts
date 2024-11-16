import { PrismaCommentsRepository } from '@/repositories/prisma/prisma-comments-repository'
import { GetCommentByIdUseCase } from '@/use-cases/comments/get-comment-by-id-use-case'

export function makeGetCommentByIdUseCase() {
  const prismaCommentsRepository = new PrismaCommentsRepository()
  const useCase = new GetCommentByIdUseCase(prismaCommentsRepository)
  return useCase
}
