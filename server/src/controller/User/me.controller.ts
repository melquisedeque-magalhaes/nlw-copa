import { FastifyRequest } from "fastify";

export async function meController(request: FastifyRequest) {
  return request.user
}