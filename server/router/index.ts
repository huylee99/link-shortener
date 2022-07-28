import superjson from "superjson";
import { createRouter } from "../context";
import { url } from "./url";

export const appRouter = createRouter().transformer(superjson).merge("url.", url);

export type AppRouter = typeof appRouter;
