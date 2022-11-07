import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { getMyPoolService } from "../../service/Pool/getMyPool.service";

export async function getMyPoolController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getMyPoolParams = z.object({
      id: z.string()
    })

    const { id } = getMyPoolParams.parse(request.params)

    const { myPool } = await getMyPoolService({ id })

    return {
      myPool
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