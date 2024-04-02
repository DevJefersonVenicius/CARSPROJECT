-- CreateTable
CREATE TABLE "cars" (
    "id" SERIAL NOT NULL,
    "nameCar" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "accessories" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "km" TEXT NOT NULL,
    "price" TEXT,
    "images" TEXT,

    CONSTRAINT "cars_pkey" PRIMARY KEY ("id")
);
