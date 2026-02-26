# dev-journal-mcp

A personal developer journal MCP server for Claude. Log what you work on daily and generate standups, sprint summaries, and retrospectives — all from natural conversation.

## What it does

`dev-journal-mcp` gives Claude four tools to manage a local SQLite journal of your dev work:

| Tool | Description |
|------|-------------|
| `log_work` | Log a task, bug fix, meeting, or any dev activity |
| `get_today` | Get everything you've logged today |
| `get_by_date` | Get entries for a specific date |
| `get_summary` | Summarize work across a date range (great for standups) |

Entries are stored in `~/.dev-journal.db` on your machine — no cloud, no accounts.

## Installation

### Claude Desktop

Add this to your `claude_desktop_config.json`:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "dev-journal": {
      "command": "npx",
      "args": ["-y", "@nepvibe/dev-journal-mcp"]
    }
  }
}
```

Restart Claude Desktop after saving.

## Usage

Just talk to Claude naturally:

**Logging work:**
> "Log that I fixed the auth bug in the payments service"
> "I just finished reviewing the PR for the new dashboard feature — log it under project frontend"
> "Had a sprint planning meeting this morning"

**Viewing today's work:**
> "What did I work on today?"
> "Show me today's journal"

**Looking up a specific date:**
> "What did I do on February 20th?"
> "Show me my entries for 2026-02-15"

**Generating standups & summaries:**
> "Write my standup for today"
> "Summarize what I worked on this week"
> "Give me a summary of my work on the frontend project this sprint"

## Entry categories

When logging, Claude will categorize your entry as one of:

- `feature` — new feature work
- `bug` — bug fixes
- `meeting` — meetings, syncs, planning
- `research` — investigation, spikes, learning
- `review` — code reviews, PR feedback
- `other` — everything else

## Configuration

By default, the journal database is stored at `~/.dev-journal.db`. You can override this with an environment variable:

```json
{
  "mcpServers": {
    "dev-journal": {
      "command": "npx",
      "args": ["-y", "@nepvibe/dev-journal-mcp"],
      "env": {
        "DEV_JOURNAL_DB_PATH": "/path/to/your/journal.db"
      }
    }
  }
}
```

## Requirements

- Node.js 18+
- Claude Desktop (or any MCP-compatible client)

## License

MIT
