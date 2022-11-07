import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { getMyPoolsService } from "../../service/Pool/getMyPools.service";

export async function getMyPoolsController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { myPools } = await getMyPoolsService({ userId: request.user.sub })

    return {
      myPools
    }
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