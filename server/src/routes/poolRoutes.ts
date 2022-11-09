import { FastifyInstance } from "fastify";

import { authorization } from "../plugins/authorization";

import { createPoolController } from "../controller/Pool/createPool.controller";
import { joinPollController } from "../controller/Pool/joinPoll.controller";
import { countPoolController } from "../controller/Pool/countPool.controller";
import { getMyPoolsController } from "../controller/Pool/getMyPools.controller";
import { getMyPoolController } from "../controller/Pool/getMyPool.controller";

export async function poolRoutes(fastify: FastifyInstance) {
  fastify.get('/pools/count', countPoolController)

  fastify.post('/pool/join', {  onRequest: [authorization]  }, joinPollController)

  fastify.post('/pool', { onRequest: [authorization]  },  createPoolController)

  fastify.get('/pools', { onRequest: [authorization]  }, getMyPoolsController)

  fastify.get('/pool/:id', { onRequest: [authorization]  }, getMyPoolController)
}