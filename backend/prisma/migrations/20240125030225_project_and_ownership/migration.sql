-- DropForeignKey
ALTER TABLE `magic_links` DROP FOREIGN KEY `magic_links_user_id_foreign`;

-- DropForeignKey
ALTER TABLE `password_recoveries` DROP FOREIGN KEY `password_recoveries_user_id_foreign`;

-- AlterTable
ALTER TABLE `documents` ADD COLUMN `searchableContent` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `password_recoveries` ALTER COLUMN `expires_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `users` MODIFY `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `updated_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0);

-- CreateTable
CREATE TABLE `projects` (
    `id` VARCHAR(36) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` TIMESTAMP(0) NULL,

    FULLTEXT INDEX `projects_title_description_idx`(`title`, `description`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ownerships` (
    `id` VARCHAR(36) NOT NULL,
    `entity` ENUM('project', 'document') NOT NULL,
    `entity_id` VARCHAR(36) NOT NULL,
    `level` ENUM('owner', 'viewer', 'writer') NOT NULL,
    `userId` VARCHAR(36) NOT NULL,

    INDEX `ownerships_entity_entity_id_idx`(`entity`, `entity_id`),
    INDEX `ownerships_entity_id_idx`(`entity_id`),
    INDEX `ownerships_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE FULLTEXT INDEX `documents_searchableContent_idx` ON `documents`(`searchableContent`);

-- CreateIndex
CREATE FULLTEXT INDEX `users_display_name_idx` ON `users`(`display_name`);

-- CreateIndex
CREATE FULLTEXT INDEX `users_username_display_name_email_idx` ON `users`(`username`, `display_name`, `email`);
