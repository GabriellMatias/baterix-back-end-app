import { PostsRepositoryProps } from '@/repositories/interfaces/posts-repository'
import { Post } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetPostByIdUseCaseRequest {
  postId: string
}

interface GetPostByIdUseCaseResponse {
  post: Post
}

export class GetPostByIdUseCase {
  constructor(private postsRepository: PostsRepositoryProps) {}

  async execute({
    postId,
  }: GetPostByIdUseCaseRequest): Promise<GetPostByIdUseCaseResponse> {
    const post = await this.postsRepository.findById(postId)

    if (!post) {
      throw new ResourceNotFoundError()
    }

    return { post }
  }
}
