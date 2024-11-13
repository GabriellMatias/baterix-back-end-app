import { Prisma, DisposalLocation } from '@prisma/client'

export interface DisposalLocationRepositoryProps {
  create(data: Prisma.DisposalLocationCreateInput): Promise<DisposalLocation>
  findById(id: string): Promise<DisposalLocation | null>
  delete(id: string): Promise<DisposalLocation>
  update(data: Prisma.DisposalLocationUpdateInput): Promise<DisposalLocation>
  findByUserId(userId: string): Promise<DisposalLocation[]>
}
