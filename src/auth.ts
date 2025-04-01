
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import config from "./config"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  secret:config.jwtSecret
})