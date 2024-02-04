interface Schema {
  [key: string]: boolean | Schema | { $: Schema };
}

export function cleaner(obj: any, schema: Schema) {
  function clean(currentObj: any, currentSchema: Schema | { $: Schema }) {
    if (Array.isArray(currentObj)) {
      //@ts-ignore
      currentObj.forEach((item) => clean(item, currentSchema['$'] || {}));
    } else if (typeof currentObj === 'object' && currentObj !== null) {
      Object.keys(currentObj).forEach((key) => {
        if (schema[`**${key}`] === false) {
          delete currentObj[key];
          //@ts-ignore
        } else if (currentSchema[key] === false) {
          delete currentObj[key];
        } else if (typeof currentObj[key] === 'object') {
          //@ts-ignore
          clean(currentObj[key], currentSchema[key] || {});
        }
      });
    }
  }

  // Inicia a limpeza com o objeto e esquema fornecidos
  clean(obj, schema);
  return obj;
}

cleaner.auto = (obj: any) => cleaner(obj, { '**deletedAt': false });
