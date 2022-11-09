import { Heading, HStack, Text, VStack } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { Pool } from "../typings/Pool";
import { ParticipantAvatar } from "./ParticipantsAvatar";

interface CardPoolProps extends TouchableOpacityProps {
  data: Pool
}

export function CardPool({ data, ...rest }: CardPoolProps) {
  return(
    <TouchableOpacity {...rest}>
      <HStack 
        h={20} 
        w="full" 
        rounded="sm" 
        bg="gray.800" 
        mb={3} 
        px={4}
        alignItems="center" 
        justifyContent="space-between"
        borderBottomColor="yellow.500" 
        borderBottomWidth={3}
      >
        <VStack>
          <Heading 
            fontFamily="heading" 
            color="white"
            fontSize="md"
          >
            {data.title}
          </Heading>
          <Text
            color="gray.200"
            fontSize="xs"
          >
            Criado por {data.owner.name}
          </Text>
        </VStack>

        <ParticipantAvatar count={data._count.participants} participants={data.participants} />

      </HStack>
    </TouchableOpacity>
  )
}