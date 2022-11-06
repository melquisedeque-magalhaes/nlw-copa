import fetch from "node-fetch"
import { z } from "zod"
import { prisma } from "../../lib/prisma"
import { fastify } from "../../plugins/fastify"

interface signInAndSignUpServiceProps {
  access_token: string
}

export async function signInAndSignUpService({ access_token }: signInAndSignUpServiceProps) {
  const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })

    const userData = await userResponse.json()

    const userDataSchema = z.object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
      picture: z.string()
    })

    const userInfo = userDataSchema.parse(userData)

    let user = await prisma.user.findUnique({
      where:{
        googleId: userInfo.id
      }
    })

    if(!user){
      user = await prisma.user.create({
        data: {
          email: userInfo.email,
          name: userInfo.name,
          avatarUrl: userInfo.picture,
          googleId: userInfo.id
        }
      })
    }

    const token = fastify.jwt.sign({
      name: user.name,
      avatarUrl: user.avatarUrl
    }, {
      sub: user.id,
      expiresIn: '7 days'
    })

    return {
      token
    }
}