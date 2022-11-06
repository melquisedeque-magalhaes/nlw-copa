import { IInputProps, Input as InputNativeBase } from 'native-base'

interface InputProps extends IInputProps {}

export function Input({ ...rest }: InputProps) {
  return(
    <InputNativeBase 
      {...rest}
      rounded="sm"
      h="50px"
      bg="gray.800"
      borderWidth="1"
      borderColor="gray.600"
      placeholderTextColor="gray.300"
      color="white"   
      fontSize="sm"
      px={4}
      mb={2}
      _focus={{
        bg: "gray.800",
        borderColor: "gray.600"
      }}
      w="full"
    />
  )
}