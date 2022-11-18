import { Button, Heading, HStack, IButtonProps } from "native-base";
import { IconProps } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";

interface ButtonConfirmProps extends IButtonProps {
  title: string
  icon?: React.FC<IconProps>
  isDisable?: boolean
}

export function ButtonConfirm({ icon: Icon, title, isDisable = false, ...rest }: ButtonConfirmProps) {
  return (
    <Button 
      w="full" 
      h="8" 
      mt={4} 
      bgColor={isDisable ? 'gray.600' : "green.500"} 
      _pressed={{
        bg: "green.600"
      }}
      isDisabled={isDisable} 
      {...rest}
    >
      <HStack alignItems="center" justifyContent="center">
        <Heading fontSize="xs" color={isDisable ? 'gray.300' : "white"}>
          {title}
        </Heading>

        {Icon && <Icon size={16} style={{ marginLeft: 12 }} color="white" />}
      </HStack>

    </Button>
  )
}