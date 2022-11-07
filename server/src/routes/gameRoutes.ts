import { FastifyInstance } from "fastify";
import { findGamesController } from "../controller/Game/findGames.controller";
import { authorization } from "../plugins/authorization";

export async function gameRoutes(fastify: FastifyInstance) {
  fastify.get('/pool/:id/games', { onRequest: [  authorization ] },  findGamesController)
}