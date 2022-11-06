import { FastifyInstance } from "fastify";

import { countUserController } from "../controller/User/countUsers.controller";
import { meController } from "../controller/User/me.controller";

import { authorization } from "../plugins/authorization";

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get('/users/count', countUserController)

  fastify.get('/me',{
    onRequest: [authorization]
  }, meController)
} 