import { CommentsRepositoryProps } from '@/repositories/interfaces/comments-repository'
import { Comment } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface UpdateCommentUseCaseParams {
  commentId: string
  content?: string
}

interface UpdateCommentUseCaseResponse {
  comment: Comment
}

export class UpdateCommentUseCase {
  constructor(private commentsRepository: CommentsRepositoryProps) {}

  async execute({
    commentId,
    content,
  }: UpdateCommentUseCaseParams): Promise<UpdateCommentUseCaseResponse> {
    const existingComment = await this.commentsRepository.findById(commentId)

    if (!existingComment) {
      throw new ResourceNotFoundError()
    }

    const updatedComment = await this.commentsRepository.update({
      id: commentId,
      content,
    })

    return { comment: updatedComment }
  }
}
