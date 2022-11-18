import * as yup from 'yup'

export const schemaValidationCreatedPool = yup.object({
  namePool: yup.string()
    .required('Erro, por favor digite o nome do bolão!')
    .min(3, 'Digite no mínimo 3 caracteres')
})

export const schemaValidationFindPoolCode = yup.object({
  findCode: yup.string()
    .required('Erro, por favor digite o código do bolão')
    .min(3, 'Digite no mínimo 3 caracteres')
})

export const schemaValidationCreateGuess = yup.object({
  guessFirstTeam: yup.string()
    .required('Erro, por favor digite um palpite para o primeiro time'),

  guessSecondTeam: yup.string()
    .required('Erro, por favor digite um palpite para o primeiro time')
})