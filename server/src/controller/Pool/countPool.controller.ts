import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { countPoolService } from "../../service/Pool/countPool.service";

export async function countPoolController(request: FastifyRequest,reply: FastifyReply) {
    try {
      const { count } = await countPoolService()

     return { count }
    }catch (err) {
      if (err instanceof z.ZodError) {
        return reply.status(400).send({
          statusCode: 400,
          error: err.issues[0].code,
          message: err.issues[0].message
        })
      }
  
      if(err instanceof Error){
        return reply.status(400).send({
          message: err?.message
        })
      }
    }
}