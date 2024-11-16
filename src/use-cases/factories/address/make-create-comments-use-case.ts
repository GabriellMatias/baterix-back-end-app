import { PrismaCommentsRepository } from '@/repositories/prisma/prisma-comments-repository'
import { CreateCommentUseCase } from '@/use-cases/comments/create-comment-use-case'

export function makeCreateCommentsUseCase() {
  const prismaCommentsRepository = new PrismaCommentsRepository()
  const useCase = new CreateCommentUseCase(prismaCommentsRepository)
  return useCase
}
