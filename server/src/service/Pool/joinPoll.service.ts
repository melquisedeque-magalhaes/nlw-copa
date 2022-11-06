import { prisma } from "../../lib/prisma"

interface JoinPollServiceProps {
  userId: string
  poolId: string
}

export async function joinPollService({ poolId, userId }: JoinPollServiceProps) {
  const findPool = await prisma.pool.findUnique({
    where: {
      id: poolId
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