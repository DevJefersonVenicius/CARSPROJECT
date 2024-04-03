-- CreateTable
CREATE TABLE "favorite_cars" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "carId" INTEGER NOT NULL,

    CONSTRAINT "favorite_cars_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "favorite_cars" ADD CONSTRAINT "favorite_cars_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_cars" ADD CONSTRAINT "favorite_cars_carId_fkey" FOREIGN KEY ("carId") REFERENCES "cars"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
