import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base'

interface ButtonPros extends IButtonProps {
  title: string
  variant?: 'default' | 'google'
}

export function Button({ title, variant = 'default', ...rest }: ButtonPros) {
  const colorBgButton = variant === 'default' ? "yellow.500" : 'red.500'
  const colorTextButton = variant === 'default' ? "gray.950" : 'white'
  const colorActionPressedButton = variant === 'default' ? "yellow.600" : "red.600"

   return (
    <ButtonNativeBase 
      rounded="sm"
      bg={colorBgButton} 
      w="full" 
      h={52}
      _pressed={{
        bg: colorActionPressedButton
      }}
      {...rest}
    >
      <Text
         textTransform="uppercase" 
         color={colorTextButton} 
         fontWeight="bold" 
         fontSize={14} 
         fontFamily="heading"
      >
        {title} 
      </Text>
    </ButtonNativeBase>
   )
}