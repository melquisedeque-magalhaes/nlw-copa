import jwt from '@fastify/jwt'
import env from '@fastify/env'
import cors  from '@fastify/cors'

import { fastify } from './plugins/fastify'

import { userRoutes } from "./routes/userRoutes";
import { poolRoutes } from "./routes/poolRoutes";
import { guessRoutes } from "./routes/guessRoutes";
import { authRoutes } from "./routes/authRoutes";

import { envSchema } from './envSchema'
import { gameRoutes } from './routes/gameRoutes';

async function bootstrap() {
  
  await fastify.register(cors, {
    origin: true
  })

  await fastify.register(env, {
    schema: envSchema,
  })

  await fastify.after()

  await fastify.register(jwt, {
    secret: fastify.config.SECRET
  })

  await fastify.register(userRoutes)
  await fastify.register(poolRoutes)
  await fastify.register(guessRoutes)
  await fastify.register(authRoutes)
  await fastify.register(gameRoutes)

  await fastify.listen({
    port: 3333,
    host: '0.0.0.0'
  })
}

bootstrap()