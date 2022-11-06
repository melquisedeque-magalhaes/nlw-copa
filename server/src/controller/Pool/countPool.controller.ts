import { FastifyReply, FastifyRequest } from "fastify";
import { countPoolService } from "../../service/Pool/countPool.service";

export async function countPoolController(request: FastifyRequest,reply: FastifyReply) {
    try {
      const { count } = await countPoolService()

     return { count }
    }catch(err) {
      return reply.status(400).send({
        message: err
      })
    }
}