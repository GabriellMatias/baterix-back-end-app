import { Prisma, Comment } from '@prisma/client'

export interface CommentsRepositoryProps {
  create(data: Prisma.CommentCreateInput): Promise<Comment>
  findById(id: string): Promise<Comment | null>
  delete(id: string): Promise<Comment>
  update(data: Prisma.CommentUpdateInput): Promise<Comment>
  findByUserId(userId: string): Promise<Comment[]>
  findByPostId(postId: string): Promise<Comment[]>
}
