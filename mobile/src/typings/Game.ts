import { Guess } from "./Guess"

export interface Game {
  id: string
  date: string
  firstTeamCountryCode: string
  secondTeamCountryCode: string
  guess: Guess
}