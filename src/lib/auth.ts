import { passkey } from "@better-auth/passkey";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";
import { serverEnv } from "./env.server";
import { prisma } from "./prisma";

const authOrigin = serverEnv.BETTER_AUTH_URL.replace(/\/+$/, "");

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  plugins: [
    admin(),
    passkey({
      rpID: new URL(authOrigin).hostname,
      rpName: "FilmIsBest",
      origin: authOrigin,
    }),
  ],
  advanced: {
    database: {
      generateId: false,
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["github"],
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
    updateAge: 60 * 60 * 24 * 15, // 15 days
  },
  rateLimit: {
    enabled: true,
    storage: "database",
  },
  socialProviders: {
    github: {
      clientId: serverEnv.GITHUB_CLIENT_ID,
      clientSecret: serverEnv.GITHUB_CLIENT_SECRET,
      overrideUserInfoOnSignIn: true,
      disableSignUp: true,
    },
  },
});
