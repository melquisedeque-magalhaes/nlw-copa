import { Center, Heading } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

interface OptionProp extends TouchableOpacityProps {
  title: string
  isSelected: boolean
}

export function Option({ title, isSelected, ...rest }: OptionProp) {
  return (
    <TouchableOpacity style={{ flex: 1 }} {...rest}>
      <Center h={7} rounded="sm" bgColor={isSelected ? "gray.600" : "gray.800"} w="full">
        <Heading fontSize="xs" color="gray.100">
          {title}
        </Heading>
      </Center>
    </TouchableOpacity>
  ) 
}