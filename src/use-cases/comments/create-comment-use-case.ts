import { CommentsRepositoryProps } from '@/repositories/interfaces/comments-repository'
import { Comment } from '@prisma/client'

interface CreateCommentUseCaseParams {
  content: string
  authorId: string
  postId: string
}

interface CreateCommentUseCaseResponse {
  comment: Comment
}

export class CreateCommentUseCase {
  constructor(private commentsRepository: CommentsRepositoryProps) {}

  async execute({
    content,
    authorId,
    postId,
  }: CreateCommentUseCaseParams): Promise<CreateCommentUseCaseResponse> {
    const comment = await this.commentsRepository.create({
      content,
      createdBy: {
        connect: {
          id: authorId,
        },
      },
      post: {
        connect: {
          id: postId,
        },
      },
    })

    return { comment }
  }
}
