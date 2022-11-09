export type Pool = {
  id: string
  title: string,
  code: string,
  participants: Participants[],
  owner: {
    id: string
    name: string
  },
  _count: {
    participants: number
  }
}

export type Participants = {
  id: string,
  user: {
    name: string
    avatarUrl: string
  }
}