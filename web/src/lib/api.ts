import axios from 'axios'
import { getCookie } from 'cookies-next'

export const api = axios.create({
  baseURL: 'http://127.0.0.1:3333/',
  headers: { Authorization: 'Bearer ' + getCookie('nlw-token') },
})
