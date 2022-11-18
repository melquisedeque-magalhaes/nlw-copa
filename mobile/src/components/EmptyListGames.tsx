import { Row, Text, Pressable } from 'native-base'

interface EmptyListGamesProps {
  code: string
}

export function EmptyListGames({ code }: EmptyListGamesProps) {
  return (
    <Row 
      mt={4}
      flexWrap="wrap"
      justifyContent="center"
    >
        <Text color="gray.200" fontFamily="body" fontSize="sm" textAlign="center">
          Esse bolão ainda não tem participantes, que tal  
        </Text>

        <Pressable onPress={() => {}}>
          <Text color="yellow.500" underline>
            compartilhar o código
          </Text>
        </Pressable>

        <Text>
          do bolão com alguém? Use o código {code}
        </Text>
    </Row>
  )
}