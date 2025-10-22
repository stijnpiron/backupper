# Backupper

> A lightweight, efficient cross-platform system tray application for automated incremental backups with hardlinks.

![Status](https://img.shields.io/badge/status-in%20development-yellow)
![Platform](https://img.shields.io/badge/platform-macOS%2011%2B%20%7C%20Windows%2010%2F11-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## Overview

Backupper is a cross-platform desktop application designed to provide automated, incremental backups with intelligent triggering mechanisms. It lives in your system tray (macOS menu bar or Windows taskbar), monitors your system, and backs up your important data when you need it.

### Key Features

✨ **Incremental Backups with Hardlinks** - Save disk space by only copying changed files
📁 **Complete Snapshots** - Each backup shows the complete file tree at that moment
🔄 **Smart Triggers** - Backup on volume mount, app quit, or schedule
🖥️ **Cross-Platform** - Works on macOS and Windows with native integration
🎯 **System Tray Living** - Unobtrusive integration in your OS
⚙️ **Flexible Configuration** - Customize everything to your workflow
📊 **Progress Tracking** - Real-time backup status and statistics
🔔 **Native Notifications** - Platform-native notifications for backup events
🚀 **Launch at Login** - Optional automatic startup on both platforms

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

## Project Documentation

This project includes comprehensive documentation:

1. **[REQUIREMENTS.md](./REQUIREMENTS.md)** - Complete functional and non-functional requirements
2. **[USER_STORIES.md](./USER_STORIES.md)** - User stories and development tasks (185 tasks!)
3. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Technical architecture and design decisions
4. **[ROADMAP.md](./ROADMAP.md)** - Development roadmap and getting started guide

## Quick Start

### Prerequisites

**macOS**:

- macOS 11.0 (Big Sur) or later
- Xcode Command Line Tools: `xcode-select --install`
- Rust (latest stable)
- Node.js 18+ and npm

**Windows**:

- Windows 10 (version 1809+) or Windows 11
- Microsoft C++ Build Tools or Visual Studio 2019+
- Rust (latest stable)
- Node.js 18+ and npm

### Installation

**macOS**:

```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Node.js (via Homebrew)
brew install node

# Clone the repository
git clone <repository-url>
cd backupper

# Install dependencies
npm install

# Start development server
npm run tauri dev
```

**Windows**:

```powershell
# Install Rust (download from https://rustup.rs/)
# Or use winget:
winget install Rustlang.Rustup

# Install Node.js (download from https://nodejs.org/)
# Or use winget:
winget install OpenJS.NodeJS

# Clone the repository
git clone <repository-url>
cd backupper

# Install dependencies
npm install

# Start development server
npm run tauri dev
```

For detailed setup instructions, see [ROADMAP.md](./ROADMAP.md#quick-start-guide).

## Development Status

**Current Phase**: Planning Complete ✅
**Next Phase**: Sprint 1 - Foundation 🚧

### Roadmap Progress

- [x] Requirements documentation
- [x] User stories and task breakdown
- [x] Technical architecture
- [x] Development roadmap
- [ ] Project initialization (Sprint 1)
- [ ] Basic UI (Sprint 2)
- [ ] Backup engine (Sprints 3-4)
- [ ] Triggers (Sprint 6)
- [ ] System integration (Sprint 7)
- [ ] Polish & testing (Sprint 8)
- [ ] Distribution (Sprint 9)

**Estimated Total Development Time**: ~120 hours (11 weeks part-time, 3 weeks full-time)

## Core Functionality

### Backup Strategy

```
target/
├── backup_2025-10-22_143015/    # Most recent (complete snapshot)
│   ├── file1.txt                 # Copied (changed)
│   ├── file2.txt                 # Hardlinked (unchanged)
│   └── file3.txt                 # Hardlinked (unchanged)
├── backup_2025-10-22_120000/    # Previous backup
│   ├── file1.txt                 # Previous version
│   ├── file2.txt                 # Original
│   └── file3.txt                 # Original
└── backup_2025-10-21_180000/    # Oldest backup
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
- **Process Monitoring**: NSWorkspace (macOS) / WMI (Windows)
- **Notifications**: Native APIs for each platform

## Contributing

This project is currently in active development. Contributions, suggestions, and feedback are welcome!

### Development Workflow

1. Pick a task from [USER_STORIES.md](./USER_STORIES.md)
2. Create a feature branch: `git checkout -b feature/task-description`
3. Implement the feature with tests
4. Update task checklist in USER_STORIES.md
5. Submit pull request

### Code Style

- **Rust**: Follow Rust standard style (rustfmt)
- **TypeScript**: ESLint + Prettier configuration
- **Commits**: Conventional commits format

## Testing

```bash
# Run Rust tests
cd src-tauri
cargo test

# Run frontend tests (when implemented)
npm test

# Manual testing
npm run tauri dev
```

## Building

```bash
# Development build
npm run tauri dev

# Production build
npm run tauri build
```

The production build creates a `.dmg` installer in `src-tauri/target/release/bundle/`.

## Permissions Required

- **Full Disk Access** - Required to backup files across the system
- **Notifications** - For backup status notifications
- **Accessibility** - Required for application quit monitoring

The app will guide you through granting these permissions on first run.

## Performance

Target performance metrics:

- Scan 100,000 files in < 20 seconds
- Incremental backup (no changes) in < 5 seconds
- Menu response time < 100ms
- Memory usage (idle) < 50MB
- Memory usage (backup) < 200MB

## Roadmap

### MVP (Sprints 1-6)

- ✅ Complete planning and documentation
- 🚧 Project foundation
- 📋 Basic backup functionality
- 📋 Incremental backups with hardlinks
- 📋 All trigger mechanisms
- 📋 Complete UI

### Post-MVP

- Backup verification and integrity checks
- Advanced scheduling (cron-like)
- Multiple backup profiles
- Compression support
- Network share support
- Cloud storage integration
- Windows/Linux support

## FAQ

**Q: Why Tauri instead of Electron?**
A: Tauri is much lighter (~3MB vs ~100MB), uses less memory, and has better macOS integration.

**Q: Why not use Time Machine?**
A: Backupper is designed for specific workflows (like triggering on app quit) and provides more granular control over backup timing and retention.

**Q: Will this work on Windows/Linux?**
A: The architecture is designed with cross-platform support in mind, but initial focus is macOS. Hardlink support varies by OS and filesystem.

**Q: How much disk space do I need?**
A: First backup needs space equal to source size. Incremental backups only need space for changed files, making it very efficient.

**Q: Is my data safe?**
A: Backups are local copies with hardlinks. Failed backups are discarded to prevent corruption. However, this is not a replacement for offsite/cloud backups.

## License

MIT License - See [LICENSE](./LICENSE) file for details.

## Support

- **Issues**: Report bugs or request features via GitHub Issues
- **Discussions**: Ask questions or share ideas
- **Documentation**: Full docs in the repository

## Acknowledgments

- Built with [Tauri v2](https://v2.tauri.app/)
- Inspired by Time Machine, rsync, and various backup solutions
- Icons from [Lucide](https://lucide.dev/)

---

**Status**: Planning complete, ready for development
**Version**: 0.1.0-dev
**Last Updated**: October 22, 2025

---

Ready to build something amazing? Check out [ROADMAP.md](./ROADMAP.md) to get started!

---

## ⭐ UPDATED: MVP Feature Set (Oct 22, 2025)

All requirements have been finalized! Here's what's in the MVP and what comes later.

### ⭐ Priority 1 - MVP Features (v1.0)

**Core Functionality:**
- ✅ Incremental backups with hardlinks (APFS/HFS+ support)
- ✅ **Manual backup trigger** (essential for testing + user control)
- ✅ Basic backup verification (file count check)
- ✅ Retention management (keep last N backups, keep for X days)
- ✅ Basic progress feedback (file count, current operation)

**Automatic Triggers:**
- ✅ **Volume mount detection** (external SSD workflow - critical for Lightroom!)
- ✅ **App quit detection (ALL mode)** (backup when all monitored apps quit)

**System Integration:**
- ✅ System notifications (backup start, complete, error)
- ✅ Launch at login
- ✅ Menu bar app (macOS)

**Error Handling:**
- ✅ Backup cancellation (mark as failed, cleanup)
- ✅ Partial failure handling (keep partial, add missed files to next)
- ✅ Hardlink fallback (user choice if filesystem doesn't support)

### Coming in v1.1
- Windows support (+20 hours development)
- NTFS/ReFS hardlink support
- Windows-specific implementations

### Coming in v1.2+
- ANY quit mode (trigger when any app quits)
- Advanced checksum verification (incremental)
- Detailed progress (per-file, speed, ETA)
- Log viewer UI
- Exclude patterns UI

### Coming in v1.3+
- Multiple backup profiles
- Restore functionality
- Cloud backup destinations

---

## Timeline

- **macOS MVP (v1.0)**: ~130 hours (~18 weeks at 7-8 hours/week)
- **Windows Port (v1.1)**: +20 hours
- **Total**: ~150 hours

### Time Optimization
Saved ~15 hours through smart scoping:
- ALL-only quit mode: -2 hours
- Basic verification: -8 hours
- Minimal first run: -3 hours
- Better sprint organization: -2 hours

---

## Development Approach

**Sequential Development:**
1. macOS MVP first (v1.0)
2. Code structured with platform abstraction from day 1
3. Windows port minimal effort (v1.1)

**Platform Abstraction:**
- Core backup logic is platform-agnostic
- Platform-specific code isolated in traits
- Conditional compilation for macOS/Windows

---

**Status**: ✅ Requirements finalized - Ready for Sprint 1!

See **START_HERE.md** for complete project overview and next steps.
See **FINALIZED_DECISIONS.md** for detailed decision log.
