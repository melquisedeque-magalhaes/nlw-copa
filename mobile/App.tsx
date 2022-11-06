import { NativeBaseProvider, StatusBar } from "native-base";
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto'

import { SignIn } from './src/screens/SignIn';
import { THEME } from "./src/styles/theme";
import { Loading } from "./src/components/Loading";
import { CreatedPool } from "./src/screens/CreatedPool";
import { SearchPool } from "./src/screens/SearchPool";


export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold })

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" translucent />
      {
        fontsLoaded ?  <SignIn /> : <Loading />
      }
    </NativeBaseProvider>
  );
}
