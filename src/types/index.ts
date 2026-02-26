import { z } from "zod";

export const CATEGORIES = ["feature", "bug", "meeting", "research", "review", "other"] as const;
export type Category = typeof CATEGORIES[number];

export const LogWorkSchema = z.object({
  note:     z.string().min(1).describe("What you worked on"),
  project:  z.string().optional().describe("Project or tenant name e.g. zurich, eqt, tce"),
  category: z.enum(CATEGORIES).optional().default("other"),
  date:     z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().describe("Date YYYY-MM-DD, defaults to today"),
});

export const GetByDateSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).describe("Date in YYYY-MM-DD format"),
});

export const GetSummarySchema = z.object({
  from:    z.string().regex(/^\d{4}-\d{2}-\d{2}$/).describe("Start date YYYY-MM-DD"),
  to:      z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().describe("End date YYYY-MM-DD, defaults to today"),
  project: z.string().optional().describe("Filter by project/tenant"),
});

export interface JournalEntry {
  id:         number;
  date:       string;
  project:    string | null;
  category:   Category;
  note:       string;
  created_at: string;
}