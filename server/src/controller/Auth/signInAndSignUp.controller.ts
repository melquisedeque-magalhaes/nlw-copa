import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { signInAndSignUpService } from "../../service/Auth/signInAndSignUp.service";

export async function signInAndSignUpController(request: FastifyRequest, reply: FastifyReply) {
  try {
    const createUserBody = z.object({
      access_token: z.string({
        required_error: "type string is required",
      })
    })

    const { access_token } = createUserBody.parse(request.body)

    const { token } = await signInAndSignUpService({ access_token })

    return {
      token
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