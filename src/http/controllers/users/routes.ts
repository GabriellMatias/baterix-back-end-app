import { authenticate } from './authenticateController';
import { profile } from './profileController';
import { register } from './registerController';
import { FastifyInstance } from 'fastify';
import { VerifyJwt } from '../../middlewares/verifyy-jwt';
import { refresh } from './refreshController';
import { registerDocs } from '@/docs/users/register';
import { authenticateDocs } from '@/docs/users/auth';
import { refreshDocs } from '@/docs/users/refreshToken';
import { profileDocs } from '@/docs/users/profile';
// Remove the import for getPostByIdDocs and getPostById if they are defined elsewhere

export async function usersRoutes(app: FastifyInstance) {
  app.post(
    '/register',
    {
      schema: registerDocs.schema,
    },
    register,
  );

  app.post(
    '/sessions',
    {
      schema: authenticateDocs.schema,
    },
    authenticate,
  );

  app.patch(
    '/token/refresh',
    {
      schema: refreshDocs.schema,
    },
    refresh,
  );

  app.get(
    '/me',
    {
      onRequest: [VerifyJwt],
      schema: profileDocs.schema,
    },
    profile,
  );

  // Remove the route definition for /posts/:id if it is defined elsewhere
}
