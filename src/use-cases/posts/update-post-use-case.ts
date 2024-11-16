import { PostsRepositoryProps } from '@/repositories/interfaces/posts-repository'
import { Post } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface UpdatePostUseCaseParams {
  postId: string
  title?: string
  content?: string
}

interface UpdatePostUseCaseResponse {
  post: Post
}

export class UpdatePostUseCase {
  constructor(private postsRepository: PostsRepositoryProps) {}

  async execute({
    postId,
    title,
    content,
  }: UpdatePostUseCaseParams): Promise<UpdatePostUseCaseResponse> {
    const existingPost = await this.postsRepository.findById(postId)

    if (!existingPost) {
      throw new ResourceNotFoundError()
    }

    const updatedPost = await this.postsRepository.update({
      id: postId,
      title,
      content,
    })

    return { post: updatedPost }
  }
}
