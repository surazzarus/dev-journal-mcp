#!/usr/bin/env node
import { startServer } from "../src/server.js";

startServer().catch((err) => {
  console.error("[dev-journal-mcp] Fatal error:", err);
  process.exit(1);
});