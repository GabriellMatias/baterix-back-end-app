import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      sub
      role: 'ADMIN' | 'MEMBER' | 'ENTERPRISE'
    }
  }
}
