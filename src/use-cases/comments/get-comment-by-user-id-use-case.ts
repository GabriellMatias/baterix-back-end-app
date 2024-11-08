import { CommentsRepositoryProps } from '@/repositories/interfaces/comments-repository'
import { Comment } from '@prisma/client'

interface GetCommentsByUserIdUseCaseRequest {
  userId: string
}

interface GetCommentsByUserIdUseCaseResponse {
  comments: Comment[] | null
}

export class GetCommentsByUserIdUseCase {
  constructor(private commentsRepository: CommentsRepositoryProps) {}

  async execute({
    userId,
  }: GetCommentsByUserIdUseCaseRequest): Promise<GetCommentsByUserIdUseCaseResponse> {
    const comments = await this.commentsRepository.findByUserId(userId)
    return { comments }
  }
}
