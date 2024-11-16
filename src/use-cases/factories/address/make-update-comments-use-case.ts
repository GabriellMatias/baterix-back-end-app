import { PrismaCommentsRepository } from '@/repositories/prisma/prisma-comments-repository'
import { UpdateCommentUseCase } from '@/use-cases/comments/update-comment-use-case'

export function makeUpdateCommentsUseCase() {
  const prismaCommentsRepository = new PrismaCommentsRepository()
  const useCase = new UpdateCommentUseCase(prismaCommentsRepository)
  return useCase
}
