const TOKEN = process.env.AIRTABLE_TOKEN!;
const BASE_ID = process.env.AIRTABLE_BASE_ID!;
const API_URL = `https://api.airtable.com/v0/${BASE_ID}`;

interface AirtableRecord {
  id: string;
  fields: Record<string, unknown>;
}

interface AirtableResponse {
  records: AirtableRecord[];
  offset?: string;
}

export async function fetchTable(
  tableName: string,
  options?: {
    filterByFormula?: string;
    sort?: { field: string; direction?: "asc" | "desc" }[];
    maxRecords?: number;
  }
): Promise<Record<string, unknown>[]> {
  const allRecords: Record<string, unknown>[] = [];
  let offset: string | undefined;

  do {
    const params = new URLSearchParams();
    if (offset) params.set("offset", offset);
    if (options?.filterByFormula) params.set("filterByFormula", options.filterByFormula);
    if (options?.maxRecords) params.set("maxRecords", String(options.maxRecords));
    if (options?.sort) {
      options.sort.forEach((s, i) => {
        params.set(`sort[${i}][field]`, s.field);
        params.set(`sort[${i}][direction]`, s.direction || "asc");
      });
    }

    const url = `${API_URL}/${encodeURIComponent(tableName)}?${params.toString()}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${TOKEN}` },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Airtable fetch error (${tableName}): ${res.status} ${err}`);
    }

    const data: AirtableResponse = await res.json();
    allRecords.push(...data.records.map((r) => r.fields));
    offset = data.offset;
  } while (offset);

  return allRecords;
}

export async function createRecord(
  tableName: string,
  fields: Record<string, unknown>
): Promise<AirtableRecord> {
  const url = `${API_URL}/${encodeURIComponent(tableName)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ records: [{ fields }] }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Airtable create error (${tableName}): ${res.status} ${err}`);
  }

  const data = await res.json();
  return data.records[0];
}
