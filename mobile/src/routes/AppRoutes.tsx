import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { CreatedPool } from '../screens/CreatedPool';
import { SearchPool } from '../screens/SearchPool';

export function AppRoutes() {
  const { Navigator, Screen } = createBottomTabNavigator()

  return(
    <Navigator screenOptions={{
      headerShown: false
    }}>
      <Screen name="createdPool" component={CreatedPool} />
      <Screen name="searchPool" component={SearchPool} />
    </Navigator>
  )
}