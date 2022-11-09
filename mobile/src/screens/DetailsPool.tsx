import { useRoute } from "@react-navigation/native";
import { Center, Divider, Heading, HStack, Text, VStack } from "native-base";
import { useEffect, useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { CardGame } from "../components/CardGame";
import { Header } from "../components/Header";
import { HeaderPoolDetails } from "../components/HeaderPoolDetails";
import { Loading } from "../components/Loading";
import { Option } from "../components/Option";
import { ParticipantAvatar } from "../components/ParticipantsAvatar";
import { api } from "../lib/api";
import { Pool } from "../typings/Pool";

interface DetailsPoolParams {
  id: string
}

export function DetailsPool() {

  const [ isLoading, setIsLoading ] = useState(true)

  const [ optionSelected, setOptionSelected ] = useState<'guess' | 'ranking'>('guess')

  const [ pool, setPool ] = useState<Pool>()

  const router = useRoute()

  const { id } = router.params as DetailsPoolParams

  async function getDataPoll() {
    try {
      setIsLoading(true)

      const response = await api.get(`pool/${id}`)

      console.log(response.data.myPool)

      setPool(response.data.myPool)
    }catch(err) {
      console.log(err)
    }finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getDataPoll()
  }, [id])

  if(isLoading){
    return (
      <Loading />
    )
  }

  return  (
    <SafeAreaView style={{ flex: 1 }}>
      <VStack flex={1} bgColor="gray.900">
        <Header showBackButton showShareButton title={pool?.title} />

        <VStack mx={5}>

          <HeaderPoolDetails 
            title={pool.title} 
            code={pool.code} 
            count={pool._count.participants} 
            participants={pool.participants} 
          />

          <Divider mb={4} bg="gray.600" h="2px" />

          <HStack bgColor="gray.800" rounded="sm" p={1} justifyContent="space-between" w="full" mb={4}>

            <Option 
              title="Seus palpites"
              isSelected={optionSelected === 'guess'} 
              onPress={() => setOptionSelected('guess')}
            />

            <Option 
              title="Seus palpites"
              isSelected={optionSelected === 'ranking'} 
              onPress={() => setOptionSelected('ranking')} 
            />

          </HStack>

          <CardGame />
          <CardGame />
          <CardGame />
          <CardGame />

        </VStack>

      </VStack>
    </SafeAreaView>
  )
}