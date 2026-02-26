import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getDb } from "../db/client.js";
import { GetSummarySchema, type JournalEntry } from "../types/index.js";
import { today, formatEntry, groupByDate } from "../utils/date.js";

export function registerGetSummary(server: McpServer) {
  server.tool(
    "get_summary",
    "Summarize work done between two dates. Great for standups, sprint reviews, and retrospectives.",
    GetSummarySchema.shape,
    async ({ from, to, project }) => {
      const db = getDb();
      const toDate = to ?? today();

      const params: (string)[] = [from, toDate];
      let query = "SELECT * FROM entries WHERE date BETWEEN ? AND ?";

      if (project) {
        query += " AND project = ?";
        params.push(project);
      }
      query += " ORDER BY date ASC, created_at ASC";

      const rows = db.prepare(query).all(...params) as JournalEntry[];

      if (!rows.length) {
        return { content: [{ type: "text", text: `No entries found between ${from} and ${toDate}.` }] };
      }

      const grouped = groupByDate(rows);
      const output = Object.entries(grouped)
        .map(([d, entries]) => `📅 ${d}:\n${entries.map(formatEntry).join("\n")}`)
        .join("\n\n");

      const header = project ? `Summary for [${project}] — ${from} to ${toDate}` : `Summary — ${from} to ${toDate}`;
      return { content: [{ type: "text", text: `${header}\n\n${output}` }] };
    }
  );
}