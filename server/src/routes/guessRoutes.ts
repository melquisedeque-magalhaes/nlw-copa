import { FastifyInstance } from "fastify";
import { createGuessController } from "../controller/Guesses/createGuess.controller";
import { guessesCountController } from "../controller/Guesses/guessesCount.controller";
import { authorization } from "../plugins/authorization";

export async function guessRoutes(fastify: FastifyInstance) {
  fastify.get('/guesses/count', guessesCountController)

  fastify.post('/pools/:poolId/games/:gameId/guess', { onRequest: [ authorization  ] }, createGuessController)
}