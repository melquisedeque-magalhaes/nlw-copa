import { prisma } from "../../lib/prisma";

interface findGamesServiceProps {
  poolId: string
  userId: string
}

export async function findGamesService({ poolId, userId }: findGamesServiceProps) {
  const games = await prisma.game.findMany({
    orderBy: {
      date: 'desc',
    },
    include: {
      guesses: {
        where: {
          participant: {
            poolId,
            userId 
          }
        }
      }
    }
  })

  return { games }
}