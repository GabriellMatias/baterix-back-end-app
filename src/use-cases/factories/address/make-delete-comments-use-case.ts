import { PrismaCommentsRepository } from '@/repositories/prisma/prisma-comments-repository'
import { DeleteCommentUseCase } from '@/use-cases/comments/delete-comment-use-case'

export function makeDeleteCommentsUseCase() {
  const prismaCommentsRepository = new PrismaCommentsRepository()
  const useCase = new DeleteCommentUseCase(prismaCommentsRepository)
  return useCase
}
