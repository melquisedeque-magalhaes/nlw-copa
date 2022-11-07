import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { CreatePoolService } from '../../service/Pool/createPool.service'

export async function createPoolController(request: FastifyRequest, reply: FastifyReply){
  const createPoolBody = z.object({
    title: z.string({
      required_error: "type string is required",
    }).min(3, {
      message: 'min 3 character'
    })
  })

  const { title } = createPoolBody.parse(request.body)

  try {
    const { code } = await CreatePoolService({ title, userId: request.user.sub })

    return reply.status(201).send({ code })
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

