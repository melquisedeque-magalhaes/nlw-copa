import { FastifyReply } from "fastify"
import { z } from "zod"
import { guessesCountService } from "../../service/Guesses/guessesCount.service"

export async function guessesCountController(reply: FastifyReply) {
  try {
    const { count } = await guessesCountService()

    return {
      count
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