import { AppRouter } from "@/server/api/root";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

export type OgRouterInput= inferRouterInputs<AppRouter>["og"];
export type OgRouterOutput = inferRouterOutputs<AppRouter>["og"];

export type LinkRouterInput= inferRouterInputs<AppRouter>["links"];
export type LinkRouterOutput = inferRouterOutputs<AppRouter>["links"];


