import { prisma } from "../../lib/prisma"

interface JoinPollServiceProps {
  userId: string
  code: string
}

export async function joinPollService({ code, userId }: JoinPollServiceProps) {
  const findPool = await prisma.pool.findUnique({
    where: {
      code
    },
    include: {
      participants: {
        where: {
          userId
        }
      }
    }
  })

  if(!findPool)
    throw new Error('Pool not found.')
  

  if(findPool.participants.length > 0)
    throw new Error('You are already a join pool.')


  await prisma.participant.create({
    data: {
      userId,
      poolId: findPool.id
    }
  })
}