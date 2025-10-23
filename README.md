# Backupper

> A lightweight cross-platform system tray application for automated incremental backups with hardlinks.

![Status](https://img.shields.io/badge/status-in%20development-yellow)
![Platform](https://img.shields.io/badge/platform-macOS%2011%2B%20%7C%20Windows%2010%2F11-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Overview

Backupper automates incremental backups with intelligent triggers. Lives in your system tray, monitors your system, and backs up your data when needed.

**Perfect for workflows like:** Lightroom Classic on external SSD - automatically backup when you quit the app or plug in your drive.

### Key Features

✨ **Incremental Backups with Hardlinks** - Only copies changed files, saves disk space
🔄 **Smart Triggers** - Backup on volume mount, app quit, or schedule
🖥️ **Cross-Platform** - Native macOS and Windows support
🎯 **System Tray** - Unobtrusive, always accessible
📊 **Progress Tracking** - Real-time backup status

### Use Case Example

**Lightroom Classic Workflow** (works on both macOS and Windows):

1. Work on photos stored on external SSD
2. Backupper monitors when you quit Lightroom
3. Automatically backs up your catalog and edits
4. Keeps last N backups with full file history
5. Hardlinks save disk space for large photo libraries

## Technology Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Rust (Tauri v2)
- **Platforms**:
  - macOS 11.0+ (Big Sur and later)
  - Windows 10 (1809+) and Windows 11

## Documentation

All documentation is in the **[docs/](./docs/)** folder:

- **[PROJECT_OVERVIEW.md](./docs/PROJECT_OVERVIEW.md)** - Start here! Complete project introduction
- **[REQUIREMENTS.md](./docs/REQUIREMENTS.md)** - Functional and technical requirements
- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - System architecture and design decisions
- **[DEVELOPMENT_GUIDE.md](./docs/DEVELOPMENT_GUIDE.md)** - Sprint planning and development workflow

## Quick Start

```bash
# Prerequisites: Rust, Node.js 18+

# Clone and install
git clone https://github.com/stijnpiron/backupper.git
cd backupper
pnpm install

# Run development server
pnpm tauri dev
```

For detailed setup instructions, see **[docs/DEVELOPMENT_GUIDE.md](./docs/DEVELOPMENT_GUIDE.md)**.

### MCP Server Configuration

This project includes Model Context Protocol (MCP) server configurations in `.mcp/` for enhanced AI-assisted development:

- **Filesystem Server**: File operations within the project
- **Git Server**: Repository management and version control
- **GitHub Server**: Issue tracking and PR management

See [.mcp/README.md](./.mcp/README.md) for setup instructions and environment variables.

## Development Status

**Current Phase:** Planning Complete ✅
**Next Phase:** Sprint 1 - Foundation 🚧

**GitHub Issues:** All user stories and tasks tracked as issues:

- 6 Epics
- 26 User Stories
- 182 Tasks

**Timeline:** ~130 hours for macOS MVP (~18 weeks part-time)

## How It Works

### Incremental Backup Strategy

Each backup is a complete snapshot, but unchanged files are hardlinked to save space:

```
target/
├── backup_2025-10-23_143015/  # Latest - full snapshot
│   ├── photo1.jpg              # Copied (changed)
│   ├── photo2.jpg              # Hardlinked (unchanged)
│   └── catalog.lrcat           # Copied (changed)
└── backup_2025-10-22_120000/  # Previous backup
    └── ...                     # Original files
```

### Backup Triggers

1. **Volume Mount** - External drive connected
2. **App Quit** - Monitored app(s) close
3. **Periodic** - Scheduled intervals
4. **Manual** - "Backup Now" button

```

Each backup is a complete snapshot, but unchanged files are hardlinked to save space.

### Trigger Mechanisms

1. **Volume Mount** - Triggers when external drive with source folder is mounted (platform-specific implementation)
2. **Periodic** - Scheduled backups at configurable intervals (hourly, daily, custom)
3. **Application Quit** - Triggers when monitored applications quit (cross-platform)
   - ANY mode: Trigger when any monitored app quits
   - ALL mode: Trigger when all monitored apps have quit
4. **Manual** - "Backup Now" button in system tray

### Settings

- **General**: Launch at login, backup prefix, retention count
- **Source & Target**: Folder selection and volume information
- **Triggers**: Configure all trigger mechanisms
- **Advanced**: Exclude patterns, verification, notifications

## Architecture Highlights

### Backend (Rust)

- **Backup Engine**: Incremental backup with hardlinks (APFS/HFS+ on macOS, NTFS/ReFS on Windows)
- **File Scanner**: Efficient directory traversal
- **Trigger System**: Volume, process, and scheduler monitoring (platform-specific APIs)
- **State Management**: Settings, backup metadata, progress tracking
- **Platform Abstraction**: Clean separation of platform-specific code

### Frontend (React + TypeScript)

- **System Tray**: Platform-appropriate tray with status indicator
- **Settings Window**: Multi-tab configuration interface
- **Progress Display**: Real-time backup statistics
- **Log Viewer**: Backup history and detailed logs

### Communication

- Tauri IPC commands for frontend ↔ backend
- Event system for real-time updates
- Async operations for non-blocking UI

### Cross-Platform Support

- **Filesystem Operations**: PathBuf for cross-platform paths
- **Hardlinks**: Platform-specific implementations (std::fs::hard_link with API wrappers)
- **Volume Monitoring**: DiskArbitration (macOS) / WMI (Windows)

## Contributing

See [docs/DEVELOPMENT_GUIDE.md](./docs/DEVELOPMENT_GUIDE.md) for development workflow, testing, and contribution guidelines.

## License

MIT License - See [LICENSE](./LICENSE) file for details.

---

**Ready to dive deeper?** Start with **[docs/PROJECT_OVERVIEW.md](./docs/PROJECT_OVERVIEW.md)**
```
