import { CommentsRepositoryProps } from '@/repositories/interfaces/comments-repository'
import { Comment } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface GetCommentByIdUseCaseRequest {
  commentId: string
}

interface GetCommentByIdUseCaseResponse {
  comment: Comment
}

export class GetCommentByIdUseCase {
  constructor(private commentsRepository: CommentsRepositoryProps) {}

  async execute({
    commentId,
  }: GetCommentByIdUseCaseRequest): Promise<GetCommentByIdUseCaseResponse> {
    const comment = await this.commentsRepository.findById(commentId)

    if (!comment) {
      throw new ResourceNotFoundError()
    }

    return { comment }
  }
}
