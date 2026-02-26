import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getDb } from "../db/client.js";
import { LogWorkSchema } from "../types/index.js";
import { today } from "../utils/date.js";

export function registerLogWork(server: McpServer) {
  server.tool(
    "log_work",
    "Log what you worked on today. Call this when the user mentions completing a task, fixing a bug, attending a meeting, or any dev activity.",
    LogWorkSchema.shape,
    async ({ note, project, category, date }) => {
      const db = getDb();
      const entryDate = date ?? today();

      db.prepare(
        "INSERT INTO entries (date, project, category, note) VALUES (?, ?, ?, ?)"
      ).run(entryDate, project ?? null, category ?? "other", note);

      return {
        content: [{
          type: "text",
          text: `✅ Logged for ${entryDate}${project ? ` [${project}]` : ""}: "${note}"`,
        }],
      };
    }
  );
}