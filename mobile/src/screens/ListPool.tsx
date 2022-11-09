import { Divider, FlatList, Row, Text, useToast, VStack } from "native-base";
import { MagnifyingGlass } from 'phosphor-react-native'
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { SafeAreaView, Pressable } from "react-native";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { api } from "../lib/api";
import { CardPool } from "../components/CardPool";
import { Loading } from "../components/Loading";
import { Pool } from "../typings/Pool";


export function ListPool(){

  const [pools, setPools] = useState<Pool[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const { navigate } = useNavigation()

  const toast = useToast()

  async function getListPools() {
    try {
      setIsLoading(true)
      const response = await api.get('/pools')

      setPools(response.data.myPools)
    }catch(err) {
      console.log(err)

      toast.show({
        title: 'Erro, não foi possível carregar os bolões',
        placement: 'top',
        bgColor: 'red.500'
      })
    }finally {
      setIsLoading(false)
    }
    
  }

  useFocusEffect(useCallback(() => {
    getListPools()
  }, []))

  function ComponentEmptyList(){
    return (
      <Row 
        mt={4}
        flexWrap="wrap"
        justifyContent="center"
      >
          <Text color="gray.200" fontFamily="body" fontSize="sm" textAlign="center">
            Você ainda não está participando de {'\n'}
            nenhum bolão, que tal
          </Text>

          <Pressable onPress={() => navigate('findPoolCode')}>
            <Text color="yellow.500" underline> 
              buscar um por código
            </Text>
          </Pressable>

          <Text mx={1} textAlign="center" color="gray.200" fontFamily="body" fontSize="sm">
            ou
          </Text>
        
          <Pressable onPress={() => navigate('createdPool')}>
            <Text  color="yellow.500" underline> 
              criar um novo
            </Text>
          </Pressable>

          <Text color="gray.200" fontFamily="body" fontSize="sm" textAlign="center">
            ?      
          </Text>
      </Row>
    )
  } 

  return(
    <SafeAreaView style={{ flex: 1 }}>
      <VStack flex={1} bgColor="gray.900">
        <Header title="Meus bolões" />

        <VStack pt={6} px={5} alignItems="center" flex={1} >
          
          <Button
            title='BUSCAR BOLÃO POR CÓDIGO'
            leftIcon={<MagnifyingGlass weight="bold" size={20} color="#000" />} 
            onPress={() => navigate('findPoolCode')}
          />

          <Divider mb={4} bg="gray.600" h="2px" mt={4} />

        </VStack>

        {
          isLoading ? <Loading /> 
          : (
            <FlatList
              data={pools}
              keyExtractor={({ id }) => id}
              renderItem={({ item }) => (
                <CardPool 
                  key={item.id} 
                  data={item} 
                  onPress={() => navigate('detailsPool', { id: item.id })}
                />
              )}
              px={5}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={<ComponentEmptyList />}
              _contentContainerStyle={{ pb: 10, pt: 20 }}
            />
          )
        }

      </VStack>
    </SafeAreaView>
  )
}