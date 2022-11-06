import { prisma } from "../../lib/prisma";

export async function countPoolService() {
  const count = await prisma.pool.count()

  return { 
    count
  }
}