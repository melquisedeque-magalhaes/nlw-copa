import { prisma } from "../../lib/prisma"

interface createGuessServiceProps {
  poolId: string
  gameId: string
  userId: string
  firstTeamPoints: number
  secondTeamPoints: number
}

export async function createGuessService({ firstTeamPoints, gameId, poolId, secondTeamPoints, userId }: createGuessServiceProps) {
  const participant = await prisma.participant.findUnique({
    where: {
      userId_poolId: {
        poolId,
        userId
      }
    }
  })

  if(!participant)
    throw new Error('You not allowed to create guess in this pool')
  

  const guess = await prisma.guess.findUnique({
    where: {
      gameId_participantId: {
        gameId,
        participantId: participant.id
      }
    }
  })

  if(guess)
    throw new Error('You already send guess to this game on this pool')
  

  const game = await prisma.game.findUnique({
    where: {
      id: gameId
    }
  })

  if(!game)
    throw new Error('Game not found.')

  if(game.date < new Date())
    throw new Error('You not send guess after the game date')

  await prisma.guess.create({
    data: {
      firstTeamPoints, 
      secondTeamPoints,
      gameId,
      participantId: participant.id
    }
  })
}