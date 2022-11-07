import { prisma } from "../../lib/prisma"

export async function guessesCountService() {
  const count = await prisma.guess.count()

  return {
    count
  }
}