import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { prisma } from "./db/client";

export async function createContext(opts?: trpcNext.CreateNextContextOptions) {
  return {
    ...opts,
    prisma,
  };
}

type Context = trpc.inferAsyncReturnType<typeof createContext>;

// Helper function to create a router with your app's context
export function createRouter() {
  return trpc.router<Context>();
}
