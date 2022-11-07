import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { createGuessService } from "../../service/Guesses/createGuess.service";

export async function createGuessController(request: FastifyRequest, reply: FastifyReply) {

  try {
    const createGuessParam = z.object({
      poolId: z.string(),
      gameId: z.string()
    })
  
    const { gameId, poolId } = createGuessParam.parse(request.params)
  
    const createGuessBody = z.object({
      firstTeamPoints: z.number(),
      secondTeamPoints: z.number()
    })
  
    const { firstTeamPoints, secondTeamPoints } = createGuessBody.parse(request.body)

    await createGuessService({ firstTeamPoints, gameId, poolId, secondTeamPoints, userId: request.user.sub })

    return reply.status(201).send()

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