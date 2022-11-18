import { Row, Text, Pressable, Heading } from 'native-base'
import { Share } from 'react-native'

interface EmptyListGamesProps {
  code: string
}

export function EmptyListGames({ code }: EmptyListGamesProps) {

  function handleShareCode() {
    Share.share({
      message: code
    })
  }

  return (
    <Row 
      mt={4}
      flexWrap="wrap"
      justifyContent="center"
    >
        <Text color="gray.200" fontFamily="body" fontSize="sm" textAlign="center">
          Esse bolão ainda não tem participantes, que tal  
        </Text>

        <Pressable onPress={handleShareCode}>
          <Text color="yellow.500" underline>
            compartilhar o código
          </Text>
        </Pressable>

        <Text color="gray.200" fontFamily="body" fontSize="sm" textAlign="center">
          do bolão com alguém? Use o código 
        </Text>
        <Text color="gray.200" fontSize="sm" fontFamily="heading">
          {' '}{code}
        </Text>
    </Row>
  )
}