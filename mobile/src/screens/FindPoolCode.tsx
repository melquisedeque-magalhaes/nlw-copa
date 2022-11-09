import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { Heading, useToast, VStack } from "native-base";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { SafeAreaView } from "react-native";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { api } from "../lib/api";
import { schemaValidationFindPoolCode } from "../yupSchemas";

interface HandleFindPoolCodeData {
  findCode: string
}

export function FindPoolCode(){

  const [ isLoading, setIsLoading ] = useState(false)

  const { control, handleSubmit, formState: { errors } } = useForm<HandleFindPoolCodeData>({
    resolver: yupResolver(schemaValidationFindPoolCode)
  })

  const toast = useToast()

  const { navigate } = useNavigation()

  async function handleFindPoolCode({ findCode }: HandleFindPoolCodeData) {
    try {
      setIsLoading(true)

      await api.post('pool/join', {
        code: findCode.toUpperCase()
      })

      toast.show({
        title: 'Bolão encontrado com sucesso!',
        placement: 'top',
        bgColor: 'green.500'
      })

      navigate('listPool')

      setIsLoading(false)
    }catch(err) {
      setIsLoading(false)

      if(err?.response?.data?.message === 'Pool not found.'){
        toast.show({
          title: 'Bolão não encontrado!',
          placement: 'top',
          bgColor: 'red.500'
        })

        return
      }

      if(err?.response?.data?.message === 'You are already a join pool.'){
        toast.show({
          title: 'Você ja esta participando desse bolão!',
          placement: 'top',
          bgColor: 'red.500'
        })

        return
      }

      toast.show({
        title: 'Ops, ocorreu um erro, tente novamente!',
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  return(
    <SafeAreaView style={{ flex: 1 }}>
      <VStack flex={1}>
        <Header onGoBack={() => navigate('listPool')} showBackButton title="Criar novo bolão" />

        <VStack  pt={8} px={5} alignItems="center" flex={1} bgColor="gray.900">
        
          <Heading mt={8} fontFamily="heading" fontSize="2xl" color="white" textAlign="center">
            Encontre um bolão através de seu código único
          </Heading>

          <Controller 
            name="findCode"
            control={control}
            render={
              ({ field: { onBlur, onChange, value } }) => (
                <Input 
                  value={value} 
                  onChangeText={onChange} 
                  onBlur={onBlur} 
                  placeholder="Qual o código do bolão?" 
                  mt={8} 
                  autoCapitalize="characters"
                  errorMessage={errors?.findCode?.message}
                />
              )}
          />
          

          <Button
            title='BUSCAR BOLÃO'
            isLoading={isLoading}
            onPress={handleSubmit(handleFindPoolCode)} 
          />
        </VStack>

      </VStack>
    </SafeAreaView>
  )
}