import { FastifyInstance } from "fastify";

declare module 'fastify' {
  interface FastifyInstance extends FastifyInstance  {
    config: {  
      SECRET: string,
      PORT: number
    };
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      sub: string
      name: string
      avatarUrl: string
    }
  }
}