import { Heading, HStack } from "native-base";

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  return (
    <HStack h="94px" w="full" bg="gray.800" alignItems="center" justifyContent="center">
      <Heading fontSize="md" color="white" fontFamily="mono">{title}</Heading>
    </HStack>
  )
}