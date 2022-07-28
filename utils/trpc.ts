import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "../server/router/";

export const trpc = createReactQueryHooks<AppRouter>();

import type { inferProcedureOutput } from "@trpc/server";

export type TQuery = keyof AppRouter["_def"]["queries"];

export type TMutation = keyof AppRouter["_def"]["mutations"];

// get return type of a query
export type InferQueryOutput<TRouteKey extends TQuery> = inferProcedureOutput<AppRouter["_def"]["queries"][TRouteKey]>;

// get return type of a mutation
export type InferMutationOutput<TRouteKey extends TMutation> = inferProcedureOutput<
  AppRouter["_def"]["mutations"][TRouteKey]
>;
