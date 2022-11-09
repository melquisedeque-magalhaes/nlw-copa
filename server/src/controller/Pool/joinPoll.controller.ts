import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"

import { joinPollService } from "../../service/Pool/joinPoll.service"

export async function joinPollController(request: FastifyRequest, reply: FastifyReply) {
  const poolJoinParams = z.object({
    code: z.string() 
  })

  const { code } = poolJoinParams.parse(request.body)

  try {
    await joinPollService({ code, userId: request.user.sub })
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
    
  return reply.status(201).send()
}