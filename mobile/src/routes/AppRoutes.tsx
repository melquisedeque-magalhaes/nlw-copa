import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'native-base';
import { PlusCircle, SoccerBall } from 'phosphor-react-native';

import { CreatedPool } from '../screens/CreatedPool';
import { DetailsPool } from '../screens/DetailsPool';
import { FindPoolCode } from '../screens/FindPoolCode';
import { ListPool } from '../screens/ListPool';

export function AppRoutes() {
  const { Navigator, Screen } = createBottomTabNavigator()

  const { colors } = useTheme()

  return(
    <Navigator screenOptions={{
      headerShown: false,
      tabBarLabelPosition: 'beside-icon',
      tabBarInactiveTintColor: colors.gray[300],
      tabBarActiveTintColor: colors.yellow[500],
      tabBarStyle: {
        backgroundColor: colors.gray[800],
        borderTopWidth: 0,
        height: 74
      },
      tabBarLabelStyle: {
        fontSize: 16
      }
    }}>
      <Screen 
        name="createdPool" 
        component={CreatedPool}
        options={{
          tabBarIcon: ({ color }) => <PlusCircle color={color} />,
          tabBarLabel: "Novo bolão"
        }} 
      />
      <Screen 
        name="listPool" 
        component={ListPool} 
        options={{
          tabBarIcon: ({ color }) => <SoccerBall color={color} />,
          tabBarLabel: "Meus bolões"
        }} 
      />

      <Screen 
        name="findPoolCode" 
        component={FindPoolCode} 
        options={{
          tabBarButton: () => null
        }} 
      />

      <Screen 
        name="detailsPool" 
        component={DetailsPool} 
        options={{
          tabBarButton: () => null
        }} 
      />
    </Navigator>
  )
}