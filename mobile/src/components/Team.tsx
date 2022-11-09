import { HStack, Input } from "native-base";
import CountryFlag from "react-native-country-flag";

interface TeamProps {
  isLeftFlag?: boolean
  isRightFlag?: boolean
  isoCode: string
}

export function Team({ isLeftFlag, isRightFlag, isoCode }: TeamProps) {
  return (
    <HStack alignItems="center" justifyContent="center" h={9}>
      {isLeftFlag && <CountryFlag isoCode={isoCode} size={24} style={{ marginRight: 12 }} />}

      <Input 
        w="10"
        h="9"
        bgColor="gray.900"
        rounded="sm"
        borderWidth={1}
        borderColor="gray.600"
      />

      {isRightFlag && <CountryFlag isoCode={isoCode} size={24} style={{ marginLeft: 12 }} />}
      
    </HStack>
  )
}