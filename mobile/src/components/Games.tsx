import { useToast } from "native-base"
import { useEffect, useState } from "react"
import { FlatList } from "react-native"

import { Loading } from  '../components/Loading'
import { api } from "../lib/api"
import { Game } from "../typings/Game"
import { CardGame } from "./CardGame"
import { EmptyListGames } from "./EmptyListGames"

interface CardGameProps {
  poolId: string
  codePool: string
}

export function Games({ poolId, codePool }: CardGameProps) {

  const [isLoading, setIsLoading] = useState(true)

  const [games, setGames] = useState<Game[]>([])

  const toast = useToast()

  async function getGames() {
    try {
      setIsLoading(true)

      const response = await api.get(`/pool/${poolId}/games`)

      setGames(response.data.games)
    }catch (err) {
      console.log(err)

      toast.show({
        title: 'Não foi possivel carregar as informações do bolão!',
        placement: 'top',
        bgColor: 'red.500'
      })
    }finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getGames()
  }, [])

  if(isLoading){
    return (
      <Loading />
    )
  }

  return (
    <FlatList 
      data={games}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => <CardGame poolId={poolId} data={item} key={item.id} />}
      ListEmptyComponent={<EmptyListGames code={codePool} />}
    />
  )
}