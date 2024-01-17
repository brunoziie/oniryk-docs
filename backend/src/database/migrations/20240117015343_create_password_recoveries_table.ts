import type { Knex } from 'knex';

export async function up({ schema }: Knex): Promise<void> {
  await schema.createTable('password_recoveries', (table) => {
    table.uuid('id').primary();
    table.uuid('user_id').notNullable().references('id').inTable('users');
    table.string('code', 64).notNullable();
    table.timestamp('expires_at');
    table.timestamps(true, true);
    table.timestamp('deleted_at').nullable();
  });
}

export async function down({ schema }: Knex): Promise<void> {
  await schema.dropTable('password_recoveries');
}
