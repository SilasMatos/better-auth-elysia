import  {betterAuth} from "better-auth"

export const auth = betterAuth({

    secret: process.env.BETTER_AUTH_SECRET!,
    baseUrl: process.env.BETTER_AUTH_URL!,
})