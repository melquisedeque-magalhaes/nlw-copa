import Fastify from "fastify";
import { PrismaClient } from '@prisma/client'
import cors  from '@fastify/cors'
import { z } from 'zod'
import ShortUniqueId from 'short-unique-id'

const prisma = new PrismaClient({
  log: ['query']
})

async function bootstrap() {
  const fastify = Fastify({
    logger: true
  })

  await fastify.register(cors, {
    origin: true
  })
  
  fastify.get('/pools/count', async () => {
    const count = await prisma.pool.count()

     return {
      count
    }
  })

  fastify.get('/users/count', async () => {
    const count = await prisma.user.count()

     return {
      count
    }
  })

  fastify.get('/guesses/count', async () => {
    const count = await prisma.guess.count()

     return {
      count
    }
  })

  fastify.post('/pool', async (request, reply) => {
    const createPoolBody = z.object({
      title: z.string({
        required_error: "type string is required",
      }).min(3, {
        message: 'min 3 character'
      })
    })

    try {
      const { title } = createPoolBody.parse(request.body)

      const generate = new ShortUniqueId({ length: 6 })
      const code = String(generate()).toUpperCase()

      await prisma.pool.create({
        data: {
          title,
          code,
        }
      })

      return reply.status(201).send({ code })
    } catch(error) {
        if (error instanceof z.ZodError) {
          return reply.status(400).send({
            statusCode: 400,
            error: error.issues[0].code,
            message: error.issues[0].message
          })
        }
    }
    
  })

  await fastify.listen({
    port: 3333,
    host: '0.0.0.0'
  })
}

bootstrap()