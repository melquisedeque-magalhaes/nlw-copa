import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { findGamesService } from "../../service/Games/findGames.service";

export async function findGamesController(request: FastifyRequest, reply: FastifyReply) {

  try {
    const getPoolParams = z.object({
      id: z.string()
    })
  
    const { id } = getPoolParams.parse(request.params)

    const { games } = await findGamesService({ poolId: id, userId: request.user.sub })

    return { 
      games: 
        games.map(game => {
          return {
            ...game,
            guess: game.guesses.length > 0 ? game.guesses[0] : null,
            guesses: undefined
          }
        }) 
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