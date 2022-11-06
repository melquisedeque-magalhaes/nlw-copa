import { FastifyReply, FastifyRequest } from "fastify";
import { getMyPoolsService } from "../../service/Pool/getMyPools.service";

export async function getMyPoolsController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { myPools } = await getMyPoolsService({ userId: request.user.sub })

    return {
      myPools
    }
  }catch (err) {
    return reply.status(400).send({
      message: err
    })
  }
}