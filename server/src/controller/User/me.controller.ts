import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function meController(request: FastifyRequest, reply: FastifyReply) {
  try {
    
    return request.user

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