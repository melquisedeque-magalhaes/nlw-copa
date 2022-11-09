import { Box, Heading, HStack } from "native-base";
import { CaretLeft, Export } from "phosphor-react-native";
import { ButtonIcon } from "./ButtonIcon";

interface HeaderProps {
  title: string
  showBackButton?: boolean,
  showShareButton?: boolean
  onShared?: () => void
  onGoBack?: () => void
}

export function Header({ title, showBackButton = false, showShareButton = false, onShared, onGoBack }: HeaderProps) {
  
  const EmptyBoxSpace = () => (<Box w={6} h={6} />);

  return (
    <HStack 
      h="94px" 
      w="full" 
      bg="gray.800" 
      alignItems="center" 
      justifyContent='space-between'
      pt={5}
      px={5}
    >

      {showBackButton ? <ButtonIcon onPress={onGoBack} icon={CaretLeft} size={24}  /> : <EmptyBoxSpace />}

      <Heading fontSize="md" color="white" fontFamily="mono">{title}</Heading>

      {showShareButton ? <ButtonIcon onPress={onShared} icon={Export} size={24}  /> : <EmptyBoxSpace />}
    </HStack>
  )
}