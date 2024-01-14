import type { Knex } from 'knex';

export async function up({ schema }: Knex): Promise<void> {
  await schema.createTable('documents', (table) => {
    table.uuid('id').primary();

    table.string('title').notNullable();
    table.text('content', 'longtext').notNullable();
    table.specificType('binary_content', 'blob').notNullable();

    table.timestamps();
    table.timestamp('deleted_at').nullable();
  });
}

export async function down({ schema }: Knex): Promise<void> {
  await schema.dropTable('documents');
}
