import { prisma } from "../../lib/prisma"

export async function countUserService() {
  const count = await prisma.user.count()

  return {
    count
  }
}