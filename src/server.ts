import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerAllTools } from "./tools/index.js";

export async function startServer(): Promise<void> {
  const server = new McpServer({
    name: "dev-journal-mcp",
    version: "1.0.0",
  });

  registerAllTools(server);

  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error("[dev-journal-mcp] Server running");
}