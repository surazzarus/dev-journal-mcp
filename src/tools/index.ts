import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerLogWork } from "./logWork.js";
import { registerGetToday } from "./getToday.js";
import { registerGetByDate } from "./getByDate.js";
import { registerGetSummary } from "./getSummary.js";

export function registerAllTools(server: McpServer): void {
  registerLogWork(server);
  registerGetToday(server);
  registerGetByDate(server);
  registerGetSummary(server);
}