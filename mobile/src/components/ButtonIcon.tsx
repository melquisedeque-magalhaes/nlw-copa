import { useTheme } from "native-base";
import { IconProps } from "phosphor-react-native";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonIconProps extends TouchableOpacityProps {
  icon: React.FC<IconProps>
  size: number
}

export function ButtonIcon({ icon: Icon, size, ...rest }: ButtonIconProps) {
  const { colors } = useTheme()

  return (
    <TouchableOpacity {...rest}>
      <Icon size={size} color={colors.gray[300]} />
    </TouchableOpacity>
  )
}