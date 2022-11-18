
import { FormControl, HStack, Input } from "native-base";
import { Control, Controller, FieldError } from "react-hook-form";
import CountryFlag from "react-native-country-flag";

interface CreateGuess {
  guessFirstTeam: string
  guessSecondTeam: string
}

interface TeamProps {
  isLeftFlag?: boolean
  isRightFlag?: boolean
  isoCode: string
  control: Control<CreateGuess>
  errors: FieldError
  name: 'guessFirstTeam' | 'guessSecondTeam'
}


export function Team({ isLeftFlag, isRightFlag, isoCode, control, errors, name }: TeamProps) {


  return (
    <HStack alignItems="center" justifyContent="center" h={9}>
      {isLeftFlag && <CountryFlag isoCode={isoCode} size={24} style={{ marginRight: 12 }} />}

      <Controller
        name={name}
        control={control} 
        render={({ field: { value, onChange, onBlur } }) => (
          <FormControl w="10" h="10">
            <Input  
              bgColor="gray.900"
              rounded="sm"
              borderWidth={1}
              borderColor="gray.600"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              color="white"
            />
            {
              errors?.message && 
              <FormControl.ErrorMessage>
                {errors?.message}
              </FormControl.ErrorMessage>
            }
          </FormControl>
        )}
      />
      

      {isRightFlag && <CountryFlag isoCode={isoCode} size={24} style={{ marginLeft: 12 }} />}
      
    </HStack>
  )
}