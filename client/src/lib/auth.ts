
import { createAuthClient } from 'better-auth/react'
import {  } from 'better-auth/client/plugins'


export const auth = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3333',
  plugins: [],
})