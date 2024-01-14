import type { Knex } from 'knex';

export async function up({ schema }: Knex): Promise<void> {
  await schema.createTable('users', (table) => {
    table.uuid('id').primary();

    table.string('username').notNullable();
    table.string('display_name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('avatar').nullable();
    table.string('favorite_color', 7).nullable();

    table.timestamps();
    table.timestamp('deleted_at').nullable();
  });
}

export async function down({ schema }: Knex): Promise<void> {
  await schema.dropTable('users');
}
