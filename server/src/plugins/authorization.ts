import { FastifyRequest } from "fastify";

export async function authorization(request: FastifyRequest) {
  await request.jwtVerify()
}