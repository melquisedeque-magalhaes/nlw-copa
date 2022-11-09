import { prisma } from "../../lib/prisma"

interface getMyPoolsServiceProps {
  userId: string
}

export async function getMyPoolsService({ userId }: getMyPoolsServiceProps) {
  const myPools = await prisma.pool.findMany({
    where: {
      participants: {
        some: {
          userId
        }
      }
    },
    include: {
      _count: {
        select: {
          participants: true
        }
      },
      participants: {
        select: {
          id: true,
          user: {
            select: {
              name: true,
              avatarUrl: true
            }
          },
        },
        take: 4
      },
      owner: {
        select: {
          id: true,
          name: true
        }
      }
    }
  })

  return {
    myPools
  }
}