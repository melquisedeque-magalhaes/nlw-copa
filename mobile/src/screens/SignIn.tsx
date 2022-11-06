import { Center, Icon, Text } from 'native-base'
import { Fontisto } from '@expo/vector-icons'

import Logo from '../assets/logo.svg'
import { Button } from '../components/Button'
import { useAuth } from '../hook/useAuth'

export function SignIn() {
  const { signIn } = useAuth()

  return (
    <Center px={5} flex={1} bgColor="gray.900">
     <Logo height={40} width={212} />

     <Button
      onPress={signIn} 
      leftIcon={
        <Icon name="google" as={Fontisto} size="md" color="white" />
      }
      title='entrar com google' 
      variant='google' 
      mt={12}
    />

     <Text 
      mt={4}
      fontSize="sm"
      fontFamily="body" 
      color="gray.200" 
      textAlign="center" 
    >
        Não utilizamos nenhuma informação além {'\n'} do seu e-mail para criação de sua conta.
     </Text>
    </Center>
  )
}