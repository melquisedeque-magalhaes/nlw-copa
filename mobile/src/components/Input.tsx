import { IInputProps, Input as InputNativeBase, FormControl } from 'native-base'

interface InputProps extends IInputProps {
  errorMessage?: string
}

export function Input({ errorMessage ,...rest }: InputProps) {
  return(
    <FormControl isInvalid={!!errorMessage} mb={2}>
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
        _focus={{
          bg: "gray.800",
          borderColor: "gray.600"
        }}
        _invalid={{
          borderColor: 'red.500',
          borderWidth: 1
        }}
        w="full"
      />
      <FormControl.ErrorMessage>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>

  )
}