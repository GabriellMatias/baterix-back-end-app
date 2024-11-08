import { CommentsRepositoryProps } from '@/repositories/interfaces/comments-repository'
import { Comment } from '@prisma/client'

interface GetCommentsByPostIdUseCaseRequest {
  postId: string
}

interface GetCommentsByPostIdUseCaseResponse {
  comments: Comment[] | null
}

export class GetCommentsByPostIdUseCase {
  constructor(private commentsRepository: CommentsRepositoryProps) {}

  async execute({
    postId,
  }: GetCommentsByPostIdUseCaseRequest): Promise<GetCommentsByPostIdUseCaseResponse> {
    const comments = await this.commentsRepository.findByPostId(postId)
    return { comments }
  }
}
