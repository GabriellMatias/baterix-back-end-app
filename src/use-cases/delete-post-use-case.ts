import { PostsRepositoryProps } from '@/repositories/interfaces/posts-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface DeletePostUseCaseParams {
  postId: string
}

export class DeletePostUseCase {
  constructor(private postsRepository: PostsRepositoryProps) {}

  async execute({ postId }: DeletePostUseCaseParams): Promise<void> {
    const existingPost = await this.postsRepository.findById(postId)

    if (!existingPost) {
      throw new ResourceNotFoundError()
    }

    await this.postsRepository.delete(postId)
  }
}
