import { ExtractTablesWithRelations, sql } from 'drizzle-orm';
import {
  MySqlColumn,
  MySqlTransaction,
  customType,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core';
import { MySql2PreparedQueryHKT, MySql2QueryResultHKT } from 'drizzle-orm/mysql2';
import { randomUUID } from 'node:crypto';

export type MySqlDBTransaction = MySqlTransaction<
  MySql2QueryResultHKT,
  MySql2PreparedQueryHKT,
  Record<string, never>,
  ExtractTablesWithRelations<Record<string, never>>
>;

export const constraints = Object.freeze({ onDelete: 'restrict', onUpdate: 'restrict' });

export function uuid(name: string) {
  return varchar(name, { length: 36 }).$defaultFn(() => randomUUID());
}

uuid.primary = () => {
  return uuid('id').notNull();
};

export const longblob = customType<{ data: Uint8Array }>({
  dataType() {
    return 'longblob';
  },
});

export function timestamps() {
  return {
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
    deletedAt: timestamp('deleted_at', { mode: 'date' }).default(sql`null`),
  };
}

export function ref<T extends MySqlColumn<any>>(name: string, target: T) {
  return uuid(name).references(() => target, constraints);
}

export function fulltext(
  columns: MySqlColumn[],
  search: string,
  mode: 'natural' | 'boolean' = 'natural'
) {
  if (mode === 'natural') {
    return sql`match(${sql.join(columns, sql`, `)}) against(${search} in natural language mode)`;
  }

  return sql`match(${sql.join(columns, sql`, `)}) against(${search} in boolean mode)`;
}

type AllowedKeys<T, K extends keyof T> = {
  [P in K]: T[P];
};

export function form<T, K extends keyof T>(obj: T, allowedKeys: K[]) {
  const filtered: Record<K, T[K]> = { ...obj };

  if (allowedKeys.length > 0) {
    for (const key in filtered) {
      if (!allowedKeys.includes(key)) {
        delete filtered[key];
      }
    }
  }

  const values = new Proxy(filtered, {
    set(target, prop, value) {
      if (allowedKeys.includes(prop as K)) {
        if (target[prop as keyof typeof filtered] !== value) {
          target[prop as keyof typeof filtered] = value;
        }

        return true;
      } else {
        throw new Error(`A chave '${String(prop)}' não é permitida para alteração.`);
      }
    },
  }) as Partial<AllowedKeys<T, K>>;

  function fill(data: Partial<AllowedKeys<T, K>>) {
    for (const key in data) {
      values[key as keyof typeof filtered] = data[key];
    }
  }

  function isEmpty() {
    for (const key in filtered) {
      if (filtered[key] !== undefined) {
        return false;
      }
    }

    return true;
  }

  return {
    values,
    isEmpty,
    isNotEmpty: () => !isEmpty(),
    fill,
  };
}

export type Updatable<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>;
