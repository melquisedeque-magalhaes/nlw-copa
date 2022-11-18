import { FormControl, Heading, HStack, Input, Text, useTheme, useToast, VStack } from "native-base";
import { Check, X } from "phosphor-react-native";
import countries from 'i18n-iso-countries'
import day from 'dayjs'
import ptBR from 'dayjs/locale/pt-br';
import CountryFlag from "react-native-country-flag";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

countries.registerLocale(require("i18n-iso-countries/langs/pt.json"));

import { Game } from "../typings/Game";
import { ButtonConfirm } from "./ButtonConfirm";
import { schemaValidationCreateGuess } from "../yupSchemas";
import { Team } from "./Team";
import { useState } from "react";
import { api } from "../lib/api";

interface CardGameProps {
  data: Game
  poolId: string
}

interface CreateGuess {
  guessFirstTeam: string
  guessSecondTeam: string
}

export function CardGame({ data, poolId }: CardGameProps) {
  const { date, firstTeamCountryCode, guess, secondTeamCountryCode, id } = data
  const [ isShowButtonSendGuess, setIsShowButtonSendGuess ] = useState(!guess)

  console.log("isSendGuess", isShowButtonSendGuess)

  const [ isLoading, setIsLoading ] = useState(false)

  const toast = useToast()

  const { control, formState: { errors }, handleSubmit } = useForm<CreateGuess>({
    resolver: yupResolver(schemaValidationCreateGuess),
    defaultValues: {
      guessFirstTeam: String(guess?.firstTeamPoints || 0),
      guessSecondTeam: String(guess?.secondTeamPoints || 0)
    }
   })

  async function handleCreateGuess({ guessFirstTeam, guessSecondTeam }: CreateGuess) {
    try {
      setIsLoading(true)

      await api.post(`/pools/${poolId}/games/${id}/guess`, {
        firstTeamPoints: Number(guessFirstTeam),
        secondTeamPoints: Number(guessSecondTeam)
      })

      toast.show({
        title: 'Palpite feito com sucesso!',
        placement: 'top',
        bgColor: 'green.500'
      })

      setIsShowButtonSendGuess(false)

    }catch(err) {
      if(err?.response?.data?.message === 'You not allowed to create guess in this pool'){
        toast.show({
          title: 'Erro, você não tem permissão de criar um palpite nesse bolão!',
          placement: 'top',
          bgColor: 'red.500'
        })

        return
      }

      if(err?.response?.data?.message === 'You already send guess to this game on this pool'){
        toast.show({
          title: 'Erro, você ja enviou um palpite para esse bolão!',
          placement: 'top',
          bgColor: 'red.500'
        })

        return
      }

      toast.show({
        title: 'Erro, Não foi possivel fazer palpite, tente novamente!',
        placement: 'top',
        bgColor: 'red.500'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const { colors } = useTheme()

  const when = day(date).locale(ptBR).format('DD [de] MMMM [de] YYYY [às] HH:mm[h]')

  return(
    <VStack 
      my={3}
      bgColor="gray.800" 
      alignItems="center" 
      justifyContent="center" 
      borderBottomWidth={3} 
      borderBottomColor="yellow.500"
      p={4}
      rounded="sm"
    >
      <Heading 
        color="gray.100" 
        fontSize="sm"
      >
        {countries.getName(firstTeamCountryCode, "pt")} vs. {countries.getName(secondTeamCountryCode, "pt")}
      </Heading>

      <Text 
        color="gray.200" 
        fontSize="xs"
      >
        {when}
      </Text>

      <HStack mt={4} justifyContent="space-between" alignItems="center" w="full">
        <Team 
          isoCode={firstTeamCountryCode} 
          isRightFlag 
          name="guessFirstTeam" 
          control={control} 
          errors={errors.guessFirstTeam} 
        />

        <X size={24} color={colors.gray[300]} />

        <Team 
          isoCode={secondTeamCountryCode} 
          isLeftFlag 
          name="guessSecondTeam" 
          control={control} 
          errors={errors.guessFirstTeam} 
        />

      </HStack> 

      {
        new Date(date) > new Date() && 
          isShowButtonSendGuess && 
            <ButtonConfirm 
              icon={Check} 
              title="CONFIRMAR PALPITE" 
              onPress={handleSubmit(handleCreateGuess)}
              isLoading={isLoading} 
            />
      }

      {
        new Date(date) < new Date() &&
          isShowButtonSendGuess &&
            <ButtonConfirm 
              isDisable 
              title="TEMPO ESGOTADO" 
            /> 
      }
      
    
    </VStack>
  )
}