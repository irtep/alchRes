-- CreateTable
CREATE TABLE "Note" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "organ" TEXT NOT NULL,
    "metal" TEXT NOT NULL,
    "herb" TEXT NOT NULL,
    "alche" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
