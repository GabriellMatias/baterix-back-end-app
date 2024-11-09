import { Prisma, Post } from '@prisma/client'

export interface PostsRepositoryProps {
  create(data: Prisma.PostCreateInput): Promise<Post>
  delete(id: string): Promise<Post>
  update(data: Prisma.PostUpdateInput): Promise<Post>
  findById(postId: string): Promise<Post | null>
  findByUserId(userId: string): Promise<Post[] | null>
}
