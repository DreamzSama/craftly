-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_creatorId_fkey";

-- AlterTable
ALTER TABLE "Products" ALTER COLUMN "creatorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
