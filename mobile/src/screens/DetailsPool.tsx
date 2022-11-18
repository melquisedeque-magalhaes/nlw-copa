import { useRoute } from "@react-navigation/native";
import { Divider, HStack, useToast, VStack } from "native-base";
import { useEffect, useState } from "react";
import { SafeAreaView, Share } from "react-native";

import { Games } from "../components/Games";
import { Header } from "../components/Header";
import { HeaderPoolDetails } from "../components/HeaderPoolDetails";
import { Loading } from "../components/Loading";
import { Option } from "../components/Option";

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

  const toast = useToast()

  const { id } = router.params as DetailsPoolParams

  async function getDataPoll() {
    try {
      setIsLoading(true)

      const response = await api.get(`pool/${id}`)

      setPool(response.data.myPool)
    }catch(err) {
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

  function handleShareCode() {
    Share.share({
      message: pool.code
    })
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
        <Header showBackButton showShareButton onShared={handleShareCode} title={pool?.title} />

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
              title="Ranking do grupo"
              isSelected={optionSelected === 'ranking'} 
              onPress={() => setOptionSelected('ranking')} 
            />

          </HStack>

          <Games poolId={pool.id} codePool={pool.code} />

        </VStack>

      </VStack>
    </SafeAreaView>
  )
}