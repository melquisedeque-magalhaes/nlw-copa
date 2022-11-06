import { FastifyInstance } from "fastify";

import { signInAndSignUpController } from "../controller/Auth/signInAndSignUp.controller";

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/user', signInAndSignUpController)
}