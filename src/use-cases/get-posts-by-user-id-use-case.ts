import { PostsRepositoryProps } from '@/repositories/interfaces/posts-repository'
import { Post } from '@prisma/client'

interface GetPostsByUserIdUseCaseRequest {
  userId: string
}

interface GetPostsByUserIdUseCaseResponse {
  posts: Post[]
}

export class GetPostsByUserIdUseCase {
  constructor(private postsRepository: PostsRepositoryProps) {}

  async execute({
    userId,
  }: GetPostsByUserIdUseCaseRequest): Promise<GetPostsByUserIdUseCaseResponse> {
    const posts = await this.postsRepository.findByUserId(userId)
    return { posts }
  }
}
