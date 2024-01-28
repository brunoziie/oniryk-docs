export async function fetchJSON<T>(url: string, options?: RequestInit) {
  const res = await fetch(url, options);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data as T;
}
