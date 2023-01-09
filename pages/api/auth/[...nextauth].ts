import NextAuth, {DefaultSession, Theme} from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "../../../lib/prisma"
import {customVerificationRequest} from '../../../lib/email'

export const authOptions = ({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      wellKnown: "https://accounts.google.com/.well-known/openid-configuration",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      },
      userinfo: {
        url: "https://openidconnect.googleapis.com/v1/userinfo",
        params: {scope: "openid email profile"}
      }
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest({ identifier, url, provider }) {
        customVerificationRequest({ identifier, url, provider })
      },
    }),
  ],
  pages:{
    verifyRequest: '/auth/verifyRequest',
    signIn: '/auth/signin'
  },
  callbacks: {
    async session({session, user}){
      session.user.id = user.id
      return session
    }
  }
})
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      image?: string
      email?: string
    }
  }
}

export default NextAuth(authOptions)