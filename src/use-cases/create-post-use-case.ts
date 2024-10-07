import { PostsRepositoryProps } from '@/repositories/interfaces/posts-repository'
import { Post } from '@prisma/client'

interface CreatePostUseCaseParams {
  title: string
  content: string
  authorId: string
}

interface CreatePostUseCaseResponse {
  post: Post
}

export class CreatePostUseCase {
  constructor(private postsRepository: PostsRepositoryProps) {}

  async execute({
    title,
    content,
    authorId,
  }: CreatePostUseCaseParams): Promise<CreatePostUseCaseResponse> {
    const post = await this.postsRepository.create({
      title,
      content,
      authorId,
    })

    return { post }
  }
}
