import { Button, Heading, HStack, Text, useTheme, VStack } from "native-base";
import { X } from "phosphor-react-native";
import { Team } from "./Team";

export function CardGame() {
  const { colors } = useTheme()

  return(
    <VStack 
      my={3}
      bgColor="gray.800" 
      h={32} 
      alignItems="center" 
      justifyContent="center" 
      borderBottomWidth={3} 
      borderBottomColor="yellow.500"
      p={4}
      rounded="sm"
    >
      <Heading 
        color="gray.100" 
        fontSize="sm"
      >
        Brasil vs. Argentina
      </Heading>

      <Text 
        color="gray.200" 
        fontSize="xs"
      >
        22 de Novembro de 2022 às 16:00h
      </Text>

      <HStack mt={4} justifyContent="space-between" alignItems="center" w="full">
        <Team isoCode="ar" isRightFlag />

        <X size={24} color={colors.gray[300]} />

        <Team isoCode="br" isLeftFlag />
      </HStack>

      <Button w="full" h="8" my={4}>
        CONFIRMAR PALPITE
      </Button>
    
    </VStack>
  )
}