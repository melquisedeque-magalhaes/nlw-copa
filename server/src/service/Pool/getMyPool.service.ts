import { prisma } from "../../lib/prisma"

interface getMyPoolServiceProps {
  id: string
}

export async function getMyPoolService({ id }: getMyPoolServiceProps) {
  const myPool = await prisma.pool.findMany({
    where: {
      id
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
    myPool
  }
}