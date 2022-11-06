import { Divider, Text, VStack } from "native-base";
import { SafeAreaView } from "react-native";
import { MagnifyingGlass } from 'phosphor-react-native'

import Logo from '../assets/logo.svg'
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";

export function SearchPool(){
  return(
    <SafeAreaView style={{ flex: 1 }}>
      <VStack flex={1}>
        <Header title="Meus bolões" />

        <VStack pt={6} px={5} alignItems="center" flex={1} bgColor="gray.900">
          
          <Button
            title='BUSCAR BOLÃO POR CÓDIGO'
            leftIcon={<MagnifyingGlass weight="bold" size={20} color="#000" />} 
          />

          <Divider bg="gray.600" h="2px" mt={4} />

          <Text 
            mt={4}
            fontSize="sm"
            fontFamily="body" 
            color="gray.200" 
            textAlign="center" 
          >
              Você ainda não está participando de {'\n'}
              nenhum bolão, que tal{' '}
              <Text  color="yellow.500" underline> 
                buscar um por código{'\n'}
              </Text>
              ou {' '}
              <Text  color="yellow.500" underline> 
                criar um novo
              </Text>
              ?
          </Text>
        </VStack>

      </VStack>
    </SafeAreaView>
  )
}