import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getDb } from "../db/client.js";
import { type JournalEntry } from "../types/index.js";
import { today, formatEntry } from "../utils/date.js";

export function registerGetToday(server: McpServer) {
  server.tool(
    "get_today",
    "Get all journal entries logged today.",
    {},
    async () => {
      const db = getDb();
      const rows = db
        .prepare("SELECT * FROM entries WHERE date = ? ORDER BY created_at")
        .all(today()) as JournalEntry[];

      if (!rows.length) {
        return { content: [{ type: "text", text: "No entries logged today yet. Start logging with log_work!" }] };
      }

      const lines = rows.map(formatEntry).join("\n");
      return { content: [{ type: "text", text: `📅 Today (${today()}):\n${lines}` }] };
    }
  );
}