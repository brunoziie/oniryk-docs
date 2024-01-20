import { randomUUID } from 'node:crypto';
import db from './connector';
import { DatabaseMap } from './tables';
import lodash from 'lodash';

export function safetify(obj: Record<string, any>) {
  return lodash.omit(obj, ['password', 'token', 'deleted_at']);
}

export function query(table: keyof DatabaseMap, conditions: Record<string, any> = {}) {
  return db(table).where({ ...conditions, deleted_at: null });
}

export function first(table: keyof DatabaseMap, id: string) {
  return query(table, { id }).first();
}

export async function firstOrFail(table: keyof DatabaseMap, id: string) {
  const row = await first(table, id);

  if (!row) {
    throw new Error(`Database: Row not found in table "${table}" with id "${id}"`);
  }

  return row;
}

export function firstBy(table: keyof DatabaseMap, conditions: Record<string, any>) {
  return query(table, conditions).first();
}

export async function insert(
  table: keyof DatabaseMap,
  data: Record<string, any>,
  timestamp = true
) {
  const row = { ...data };

  if (!row.id) {
    row.id = randomUUID();
  }

  if (timestamp) {
    row.created_at = new Date();
    row.updated_at = new Date();
  }

  await db(table).insert(row);

  return row.uuid;
}

export async function insertMany(
  table: keyof DatabaseMap,
  data: Record<string, any>[],
  timestamp = true
) {
  const rows = data.map((row) => ({
    ...row,
    uuid: randomUUID(),
    ...(timestamp && { created_at: new Date(), updated_at: new Date() }),
  }));

  await db(table).insert(rows);
  return rows.map((row) => row.uuid);
}

export function update(
  table: keyof DatabaseMap,
  id: string,
  data: Record<string, any>,
  timestamp = true
) {
  const row = { ...data };

  if (timestamp) {
    row.updated_at = new Date();
  }

  return db(table).where({ id }).update(row);
}

export function remove(table: keyof DatabaseMap, id: string) {
  return db(table).where({ id }).update({ deleted_at: new Date() });
}
