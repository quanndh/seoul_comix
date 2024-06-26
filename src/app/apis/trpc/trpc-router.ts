import { restaurantRouter } from "@/app/apis/modules/restaurants/router";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";

const t = initTRPC.create({
  transformer: superjson,
});

export const appRouter = t.router({
  restaurant: restaurantRouter,
});

export type AppRouter = typeof appRouter;
