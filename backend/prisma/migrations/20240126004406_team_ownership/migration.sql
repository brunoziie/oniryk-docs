-- AlterTable
ALTER TABLE `ownerships` MODIFY `entity` ENUM('project', 'document', 'team') NOT NULL;

-- AlterTable
ALTER TABLE `password_recoveries` ALTER COLUMN `expires_at` DROP DEFAULT;
