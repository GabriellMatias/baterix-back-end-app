import { FastifyReply, FastifyRequest } from 'fastify';
import { makeGetPostByIdUseCase } from '@/use-cases/factories/posts/make-get-post-by-id-use-case';

export async function getPostById(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };

  try {
    const getPostByIdUseCase = makeGetPostByIdUseCase();
    const post = await getPostByIdUseCase.execute({ id });

    if (!post) {
      return reply.status(404).send({ message: 'Post not found' });
    }

    return reply.status(200).send(post);
  } catch (error) {
    return reply.status(500).send({ message: 'Internal server error' });
  }
}
