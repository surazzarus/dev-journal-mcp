export const today = (): string => new Date().toISOString().split("T")[0];

export const formatEntry = (r: { category: string; project: string | null; note: string }): string =>
  `  - [${r.category}]${r.project ? ` (${r.project})` : ""} ${r.note}`;

export const groupByDate = <T extends { date: string }>(rows: T[]): Record<string, T[]> =>
  rows.reduce<Record<string, T[]>>((acc, r) => {
    (acc[r.date] ??= []).push(r);
    return acc;
  }, {});