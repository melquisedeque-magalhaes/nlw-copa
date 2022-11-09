import { useState } from "react";
import { Heading, Text, useToast, VStack } from "native-base";
import { SafeAreaView } from "react-native";
import { useForm, Controller } from "react-hook-form";

import { yupResolver } from '@hookform/resolvers/yup'

import Logo from '../assets/logo.svg'
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { api } from "../lib/api";

import { schemaValidationCreatedPool } from "../yupSchemas";

interface handleCreatePoolData{
  namePool: string
}

export function CreatedPool(){

  const { control, handleSubmit, formState: { errors } } = useForm<handleCreatePoolData>({
    resolver: yupResolver(schemaValidationCreatedPool)
  })
  const [ isLoading, setIsLoading ] = useState(false)

  const toast = useToast()

  async function handleCreatePool({ namePool }: handleCreatePoolData) {
    try {
      setIsLoading(true)

      await api.post('pool', {
        title: namePool.toUpperCase()
      })

      toast.show({
        title: 'Bolão criado com sucesso!',
        placement: 'top',
        bgColor: 'green.500'
      })

    }catch(err) {

      toast.show({
        title: 'Erro ao criar o bolão',
        placement: 'top',
        bgColor: 'red.500'
      })

    } finally {
      setIsLoading(false)
    }
  }

  return(
    <SafeAreaView style={{ flex: 1 }}>
      <VStack flex={1}>
        <Header title="Criar novo bolão" />

        <VStack  pt={8} px={5} alignItems="center" flex={1} bgColor="gray.900">
          
          <Logo />

          <Heading mt={8} fontFamily="heading" fontSize="2xl" color="white" textAlign="center">
            Crie seu próprio bolão da copa{'\n'} e compartilhe entre amigos!
          </Heading>

          <Controller
            name="namePool"
            control={control}
            render={  
              ({ field: { onBlur, onChange, value } }) => 
                <Input 
                  value={value} 
                  onChangeText={onChange} 
                  onBlur={onBlur} 
                  placeholder="Qual nome do seu bolão?" 
                  mt={8}
                  errorMessage={errors.namePool?.message}
                  autoCapitalize="characters"
                />  
            }
          />

          <Button
            title='criar meu bolão'
            onPress={handleSubmit(handleCreatePool)}
            isLoading={isLoading}
          />

          <Text 
            mt={4}
            fontSize="sm"
            fontFamily="body" 
            color="gray.200" 
            textAlign="center" 
          >
              Após criar seu bolão, você receberá um{'\n'}
              código único que poderá usar para convidar{'\n'}
              outras pessoas.
          </Text>
        </VStack>

      </VStack>
    </SafeAreaView>
  )
}