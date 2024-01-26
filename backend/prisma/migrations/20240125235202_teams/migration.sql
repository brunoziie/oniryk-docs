/*
  Warnings:

  - Made the column `created_at` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `magic_links_user_id_foreign` ON `magic_links`;

-- DropIndex
DROP INDEX `password_recoveries_user_id_foreign` ON `password_recoveries`;

-- AlterTable
ALTER TABLE `ownerships` ADD COLUMN `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `deleted_at` TIMESTAMP(0) NULL,
    ADD COLUMN `teamId` VARCHAR(36) NULL,
    ADD COLUMN `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `userId` VARCHAR(36) NULL;

-- AlterTable
ALTER TABLE `password_recoveries` ALTER COLUMN `expires_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `users` MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- CreateTable
CREATE TABLE `teams` (
    `id` VARCHAR(36) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` TIMESTAMP(0) NULL,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `ownerships_teamId_idx` ON `ownerships`(`teamId`);

-- CreateIndex
CREATE INDEX `ownerships_entity_entity_id_userId_idx` ON `ownerships`(`entity`, `entity_id`, `userId`);

-- CreateIndex
CREATE INDEX `ownerships_entity_entity_id_teamId_idx` ON `ownerships`(`entity`, `entity_id`, `teamId`);

-- AddForeignKey
ALTER TABLE `magic_links` ADD CONSTRAINT `magic_links_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `password_recoveries` ADD CONSTRAINT `password_recoveries_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `ownerships` ADD CONSTRAINT `ownerships_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ownerships` ADD CONSTRAINT `ownerships_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `teams`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
