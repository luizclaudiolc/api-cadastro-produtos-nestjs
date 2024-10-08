-- CreateTable
CREATE TABLE "Produto" (
    "id" TEXT NOT NULL,
    "cod" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "qtd" TEXT NOT NULL,

    CONSTRAINT "Produto_pkey" PRIMARY KEY ("id")
);
