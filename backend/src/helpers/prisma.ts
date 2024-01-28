export function $in(key: string, values: any[]) {
  return {
    [key]: {
      in: values,
    },
  };
}

export function $or(...conditions: any[]) {
  return {
    OR: conditions,
  };
}

export function $int(value: bigint) {
  const str = value.toString();
  return parseInt(str);
}
