import { FastifyRequest } from "fastify";
import { countUserService } from "../../service/User/countUser.service";

export async function countUserController(request: FastifyRequest) {
  const { count } = await countUserService()

  return {
    count
  }
}