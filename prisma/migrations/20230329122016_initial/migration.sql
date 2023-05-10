-- CreateTable
CREATE TABLE "Station" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT,
    "operator" TEXT,
    "x" TEXT NOT NULL,
    "y" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,

    CONSTRAINT "Station_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Journey" (
    "id" SERIAL NOT NULL,
    "departureId" INTEGER NOT NULL,
    "returnId" INTEGER NOT NULL,
    "departureTime" TIMESTAMP(3) NOT NULL,
    "returnTime" TIMESTAMP(3) NOT NULL,
    "distance" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "Journey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Station_name_key" ON "Station"("name");

-- AddForeignKey
ALTER TABLE "Journey" ADD CONSTRAINT "Journey_departureId_fkey" FOREIGN KEY ("departureId") REFERENCES "Station"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Journey" ADD CONSTRAINT "Journey_returnId_fkey" FOREIGN KEY ("returnId") REFERENCES "Station"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
