import ShortUniqueId from "short-unique-id"
import { prisma } from "../../lib/prisma"

interface CreatePoolServiceProps {
  title: string,
  userId: string
}

export async function CreatePoolService({ title, userId }: CreatePoolServiceProps) {
  const generate = new ShortUniqueId({ length: 6 })
  const code = String(generate()).toUpperCase()

  await prisma.pool.create({
    data: {
      title,
      code,
      ownerId: userId,

      participants: {
        create: {
          userId: userId
        }
      }
    }
  })

  return {
    code
  }
}