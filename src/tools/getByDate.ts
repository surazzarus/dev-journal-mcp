import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getDb } from "../db/client.js";
import { GetByDateSchema, type JournalEntry } from "../types/index.js";
import { formatEntry } from "../utils/date.js";

export function registerGetByDate(server: McpServer) {
  server.tool(
    "get_by_date",
    "Get journal entries for a specific date.",
    GetByDateSchema.shape,
    async ({ date }) => {
      const db = getDb();
      const rows = db
        .prepare("SELECT * FROM entries WHERE date = ? ORDER BY created_at")
        .all(date) as JournalEntry[];

      if (!rows.length) {
        return { content: [{ type: "text", text: `No entries found for ${date}.` }] };
      }

      const lines = rows.map(formatEntry).join("\n");
      return { content: [{ type: "text", text: `📅 ${date}:\n${lines}` }] };
    }
  );
}