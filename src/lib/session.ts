import { fetchTable } from "./airtable";
import { TABLE_NAMES } from "./constants";

export function generateSessionCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export async function validateSessionCode(code: string): Promise<boolean> {
  const rows = await fetchTable(TABLE_NAMES.trainingSessions, {
    filterByFormula: `AND({Session Code}="${code}",{Status}="Active")`,
    maxRecords: 1,
  });
  return rows.length > 0;
}

export async function isCodeUnique(code: string): Promise<boolean> {
  const rows = await fetchTable(TABLE_NAMES.trainingSessions, {
    filterByFormula: `{Session Code}="${code}"`,
    maxRecords: 1,
  });
  return rows.length === 0;
}

export async function generateUniqueCode(): Promise<string> {
  let code = generateSessionCode();
  let attempts = 0;
  while (!(await isCodeUnique(code)) && attempts < 10) {
    code = generateSessionCode();
    attempts++;
  }
  return code;
}
