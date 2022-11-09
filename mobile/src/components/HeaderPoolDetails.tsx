import { Heading, HStack, Text, VStack } from "native-base";

import { Participants } from "../typings/Pool";
import { ParticipantAvatar } from "./ParticipantsAvatar";

interface HeaderPoolDetailsProps {
  title: string
  code: string
  count: number
  participants: Participants[]
}

export function HeaderPoolDetails({ code, count, participants, title }: HeaderPoolDetailsProps) {
  return (
    <HStack my={4} justifyContent="space-between">
      <VStack>            
        <Heading color="white" fontSize="md">{title}</Heading>
        <Text fontSize="xs" color="gray.200">Código: <Text fontWeight="bold">{code}</Text></Text>
      </VStack>

      <ParticipantAvatar 
        count={count}
        participants={participants}
      />
    </HStack>
  )
}