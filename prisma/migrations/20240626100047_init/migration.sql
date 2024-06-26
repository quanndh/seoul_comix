-- CreateTable
CREATE TABLE "Restaurant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price_range" TEXT NOT NULL,
    "desc" TEXT,
    "rating" INTEGER,
    "rating_count" INTEGER,
    "category" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "images" TEXT[],
    "featured" JSONB NOT NULL,
    "isFavorite" BOOLEAN NOT NULL,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);
