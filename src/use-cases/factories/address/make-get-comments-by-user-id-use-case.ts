import { GetCommentsByUserIdUseCase } from './../../comments/get-comment-by-user-id-use-case'
import { PrismaCommentsRepository } from '@/repositories/prisma/prisma-comments-repository'

export function makeGetCommentsByUserIdUseCase() {
  const prismaCommentsRepository = new PrismaCommentsRepository()
  const useCase = new GetCommentsByUserIdUseCase(prismaCommentsRepository)
  return useCase
}
