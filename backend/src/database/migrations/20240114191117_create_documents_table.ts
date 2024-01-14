import type { Knex } from 'knex';
import { TiptapTransformer } from '@hocuspocus/transformer';

export async function up({ schema }: Knex): Promise<void> {
  await schema.createTable('documents', (table) => {
    table.uuid('id').primary();

    table.string('title').notNullable();
    table.text('content', 'longtext').nullable();
    table.specificType('binary_content', 'blob').nullable();

    table.timestamps(true, true);
    table.timestamp('deleted_at').nullable();
  });
}

export async function down({ schema }: Knex): Promise<void> {
  await schema.dropTable('documents');
}
