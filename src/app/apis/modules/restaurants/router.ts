import { RestaurantResolver } from "@/app/apis/modules/restaurants/resolver";
import { publicProcedure, router } from "@/server/trpc";
import { z } from "zod";

export const restaurantRouter = router({
  getRestaurants: publicProcedure
    .input(
      z.object({
        search: z.string().optional(),
        category: z.string().optional(),
      })
    )
    .query(async (opts) => {
      const { search, category } = opts.input;
      const restaurants = await RestaurantResolver.getRestaurants(
        search,
        category
      );
      return restaurants;
    }),
  addFavorite: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async (opts) => {
      const { id } = opts.input;
      try {
        return await RestaurantResolver.addFavorite(id);
      } catch (error: any) {
        return {
          success: false,
          message: String(error.message),
        };
      }
    }),
});
