import { NativeBaseProvider, StatusBar } from "native-base";
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto'

import { THEME } from "./src/styles/theme";
import { Loading } from "./src/components/Loading";
import { Routes } from "./src/routes";


export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_500Medium, Roboto_700Bold })

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar backgroundColor="transparent" barStyle="light-content" translucent />
      {
        fontsLoaded ?  <Routes /> : <Loading />
      }
    </NativeBaseProvider>
  );
}
