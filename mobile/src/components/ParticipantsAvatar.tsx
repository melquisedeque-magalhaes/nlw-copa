import { Avatar, Center, HStack, Text } from "native-base"

import { Participants } from "../typings/Pool"

interface ParticipantAvatarProps {
  participants: Participants[]
  count: number
}

export function ParticipantAvatar({ participants, count }: ParticipantAvatarProps) {
  return (
    <HStack>
      {
        participants.length && participants.slice(0, 3).map(participant => (
          <Avatar
            key={participant.id}
            w={8}
            h={8}  
            marginRight={-3}  
            source={{ uri: participant?.user?.avatarUrl }}
            rounded="full"
            borderColor="gray.800"
          >
            {participant?.user?.name}
          </Avatar>
        ))
      }

      <Center w={8} h={8} rounded="full" borderWidth={2} borderColor="gray.800" background="gray.700">
        <Text color="gray.100" fontSize="2xs" fontWeight="medium">
          {count > 0 ? `+${count}` : 0}
        </Text>
      </Center>
      
    </HStack>
  )
}