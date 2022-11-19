import axios from 'axios'
import { getCookie } from 'cookies-next'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { Authorization: 'Bearer ' + getCookie('nlw-token') },
})
