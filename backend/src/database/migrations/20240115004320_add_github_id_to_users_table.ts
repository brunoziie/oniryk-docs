import type { Knex } from 'knex';

export async function up({ schema }: Knex): Promise<void> {
  await schema.alterTable('users', (table) => {
    table.string('github_id');
  });
}

export async function down({ schema }: Knex): Promise<void> {
  await schema.alterTable('users', (table) => {
    table.dropColumn('github_id');
  });
}
