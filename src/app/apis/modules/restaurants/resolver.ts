import prisma from "@/utils/prisma";
import { Prisma } from "@prisma/client";

export const RestaurantResolver = {
  getRestaurants: async (search?: string, category?: string) => {
    const where: Partial<Prisma.RestaurantWhereInput> = {};

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { desc: { contains: search } },
      ];
    }

    if (category) {
      where.category = category;
    }

    return await prisma.restaurant.findMany({
      where,
      orderBy: {
        name: "asc",
      },
    });
  },
  addFavorite: async (id: string) => {
    const restaurant = await prisma.restaurant.findUnique({
      where: {
        id,
      },
    });
    if (!restaurant) throw new Error("Restaurant not found");
    await prisma.restaurant.update({
      where: {
        id,
      },
      data: {
        isFavorite: !restaurant.isFavorite,
      },
    });
    return {
      success: true,
      message: restaurant.isFavorite
        ? "Removed from favorite"
        : "Added to favorite",
    };
  },
};
