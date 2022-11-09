import { NavigationContainer } from '@react-navigation/native'
import { Box } from 'native-base'
import { SignIn } from '../screens/SignIn'
import { useAuthStore } from '../stores/useAuthStore'
import { AppRoutes } from './AppRoutes'

export function Routes() {
  const user = useAuthStore(({ user }) => user)

  return(
    <Box flex={1} bg="gray.900">
      <NavigationContainer>
        { user.name ? <AppRoutes /> : <SignIn /> }
      </NavigationContainer>
    </Box>
  )
} 