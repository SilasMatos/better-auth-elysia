import  {betterAuth} from "better-auth"
import {drizzleAdapter} from "better-auth/adapters/drizzle"
import {openAPI  } from "better-auth/plugins"
import {db} from "@/database/client"
export const auth = betterAuth({
    basePath: "/auth",
    plugins: [
        openAPI()
        
    ],
    trustedOrigins: ["http://localhost:5173"],
    database: drizzleAdapter(
    db, {
        provider: "pg",
        usePlural: true,

    }),
    advanced: {
        generateId: false // Desativa a geração automática de IDs
    },
    emailAndPassword:{
        enabled: true, // Habilita autenticação por email e senha
        autoSignIn: true,//autentica o usuário automaticamente após o cadastro
        password: {
            hash: (password: string) => Bun.password.hash(password), // Função para hashear a senha
            verify: ({password, hash }) => Bun.password.verify(password, hash), // Função para verificar a senha
        }
    } ,
    session: {
      expiresIn: 60 * 60 * 24 * 7, // Sessão expira em 7 dias
      cookieCache: {
        maxAge: 60 * 60 * 24 * 7, // Cookie expira em 7 dias
        enabled: true, // Habilita cache de cookies
      }
    }
})