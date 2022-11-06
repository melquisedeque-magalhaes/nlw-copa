import { Heading, Text, VStack } from "native-base";
import { SafeAreaView } from "react-native";

import Logo from '../assets/logo.svg'
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";

export function CreatedPool(){
  return(
    <SafeAreaView style={{ flex: 1 }}>
      <VStack flex={1}>
        <Header title="Criar novo bolão" />

        <VStack  pt={8} px={5} alignItems="center" flex={1} bgColor="gray.900">
          
          <Logo />

          <Heading mt={8} fontFamily="heading" fontSize="2xl" color="white" textAlign="center">
            Crie seu próprio bolão da copa{'\n'} e compartilhe entre amigos!
          </Heading>

          <Input placeholder="Qual nome do seu bolão?" mt={8} />

          <Button
            title='criar meu bolão' 
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