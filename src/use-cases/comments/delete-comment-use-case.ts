import { CommentsRepositoryProps } from '@/repositories/interfaces/comments-repository'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface DeleteCommentUseCaseParams {
  commentId: string
}

export class DeleteCommentUseCase {
  constructor(private commentsRepository: CommentsRepositoryProps) {}

  async execute({ commentId }: DeleteCommentUseCaseParams): Promise<void> {
    const existingComment = await this.commentsRepository.findById(commentId)

    if (!existingComment) {
      throw new ResourceNotFoundError()
    }

    await this.commentsRepository.delete(commentId)
  }
}
