# MCP (Model Context Protocol) Server Configuration

This directory contains the configuration for MCP servers used in the Backupper project.

## Configured Servers

### 1. Filesystem Server
**Purpose**: Provides file system operations for the project
- Read/write files
- List directories
- File operations

### 2. Git Server
**Purpose**: Git repository operations
- View commits
- Check status
- Branch management
- Diff viewing

### 3. GitHub Server
**Purpose**: GitHub API integration
- Manage issues
- Create/review pull requests
- Repository operations

## Setup

### Prerequisites

1. Node.js and npm/npx installed
2. For GitHub server: Set the `GITHUB_TOKEN` environment variable

```bash
export GITHUB_TOKEN="your_github_personal_access_token"
```

### Usage

The MCP servers are automatically available when using compatible AI tools that support the Model Context Protocol.

## Environment Variables

- `GITHUB_TOKEN`: GitHub Personal Access Token for GitHub server operations
  - Required scopes: `repo`, `read:org`, `read:user`
  - [Create a token](https://github.com/settings/tokens/new)

## Configuration

The main configuration is in `config.json`. You can modify:
- Command paths
- Arguments
- Environment variables
- Descriptions

## Adding More Servers

To add additional MCP servers, add entries to the `mcpServers` object in `config.json`:

```json
{
  "mcpServers": {
    "your-server": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-name"],
      "description": "Description of what it does"
    }
  }
}
```

## Available MCP Servers

Common MCP servers you might want to add:
- `@modelcontextprotocol/server-postgres` - PostgreSQL database operations
- `@modelcontextprotocol/server-slack` - Slack integration
- `@modelcontextprotocol/server-google-drive` - Google Drive operations
- `@modelcontextprotocol/server-puppeteer` - Web automation
- `@modelcontextprotocol/server-brave-search` - Search functionality

## References

- [Model Context Protocol Documentation](https://modelcontextprotocol.io/)
- [MCP Servers Repository](https://github.com/modelcontextprotocol/servers)
