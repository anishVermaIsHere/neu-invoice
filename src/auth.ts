import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Nodemailer from "next-auth/providers/nodemailer"
import AppConfig from "./config/app.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma/db";




const { oAuth, mailer, authSecret } = AppConfig;

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: oAuth.clientId,
      clientSecret: oAuth.clientSecret,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        },
      },

    }),
    Nodemailer({
      server: {
        host: mailer.host,
        port: mailer.port,
        auth: {
          user: mailer.user,
          pass: mailer.password,
        },
      },
      from: mailer.email,
    }),
  ],
  secret: authSecret,
  adapter: PrismaAdapter(prisma),
  pages: {
    verifyRequest: '/verify-request'
  }
});


export const getAuth = async () => await auth();