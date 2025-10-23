# Backupper - Project Overview

> A lightweight, efficient cross-platform system tray application for automated incremental backups with hardlinks.

![Status](https://img.shields.io/badge/status-in%20development-yellow)
![Platform](https://img.shields.io/badge/platform-macOS%2011%2B%20%7C%20Windows%2010%2F11-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## What is Backupper?

Backupper is a cross-platform desktop application designed to provide automated, incremental backups with intelligent triggering mechanisms. It lives in your system tray (macOS menu bar or Windows taskbar), monitors your system, and backs up your important data when you need it.

### Primary Use Case: Lightroom Classic Workflow

**Example Workflow (works on both macOS and Windows):**

1. Work on photos stored on external SSD
2. Edit in Lightroom Classic
3. When you quit Lightroom, Backupper automatically backs up your catalog and edits
4. Only changed files are copied - hardlinks save disk space for large photo libraries
5. Keep last N backups with full file history
6. Each backup is a complete snapshot you can browse and restore from

## Key Features

### ✨ Core Backup Technology

- **Incremental Backups with Hardlinks** - Only copies changed files, hardlinks unchanged ones
- **Complete Snapshots** - Each backup shows the complete file tree as it existed at that moment
- **Smart Retention** - Automatically manages old backups based on your rules

### 🔄 Smart Automatic Triggers

- **Volume Mount Detection** - Automatically backup when external drive is connected
- **Application Quit Monitoring** - Trigger backups when specific apps close
- **Periodic Scheduling** - Schedule regular backups (hourly, daily, weekly)
- **Manual Trigger** - Always available "Backup Now" button

### 🖥️ Cross-Platform Native Integration

- **macOS** - Menu bar app with native notifications and system integration
- **Windows** - System tray app with Windows notifications and native APIs
- **Platform-Specific APIs** - DiskArbitration (macOS), WMI (Windows) for system monitoring

### 🎯 User-Friendly Interface

- **System Tray Living** - Unobtrusive, always accessible
- **Visual Status Indicators** - Icon shows backup status at a glance
- **Progress Tracking** - Real-time backup progress and statistics
- **Settings Management** - Easy configuration of all backup rules

### ⚙️ Flexible Configuration

- Choose any source and target folders
- Select which apps to monitor
- Set retention policies (number of backups or time-based)
- Configure trigger conditions
- Enable/disable automatic startup

## How Backups Work

### Incremental Backup Strategy

```
target/
├── backup_2025-10-23_143015/    # Most recent (complete snapshot)
│   ├── file1.txt                 # Copied (changed since last backup)
│   ├── file2.txt                 # Hardlinked (unchanged)
│   └── file3.txt                 # Hardlinked (unchanged)
├── backup_2025-10-23_120000/    # Previous backup
│   ├── file1.txt                 # Previous version
│   ├── file2.txt                 # Original
│   └── file3.txt                 # Original
└── backup_2025-10-22_180000/    # Oldest backup (will be deleted per retention)
```

**How It Works:**

1. First backup copies all files
2. Subsequent backups only copy changed files
3. Unchanged files are hardlinked to previous backup
4. Each backup folder contains complete file tree (browseable snapshot)
5. Disk space only used for changed files

**Hardlink Benefits:**

- Massive space savings (especially for large media libraries)
- Fast backups (only copying changes)
- Each backup is independently browseable
- No complex restore process - just copy files back

### Backup Triggers

**1. Volume Mount Detection**

- Monitors for external drive connections
- Identifies drives by UUID (not just name)
- Triggers backup when source drive is connected
- Perfect for laptop + external SSD workflows

**2. Application Quit Monitoring**

- Select apps to monitor (e.g., Lightroom Classic, Photoshop)
- ALL mode (MVP): Backup when all monitored apps have quit
- ANY mode (v1.2+): Backup when any monitored app quits
- Handles app crashes gracefully

**3. Periodic Scheduling**

- Set backup intervals: hourly, daily, weekly, custom
- Only runs when system is awake
- Configurable quiet hours
- For internal/local sources

**4. Manual Trigger**

- Always available in system tray menu
- "Backup Now" button
- Useful for ad-hoc backups before important operations

## Technology Stack

### Frontend

- **Framework:** React 18+
- **Language:** TypeScript 5+
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **UI Components:** Radix UI
- **Icons:** Lucide React

### Backend

- **Framework:** Tauri v2
- **Language:** Rust (latest stable)
- **Async Runtime:** Tokio
- **Logging:** tracing + tracing-appender

### Platform Integration

**macOS:**

- DiskArbitration (volume monitoring)
- NSWorkspace (app monitoring)
- SMAppService (launch at login)
- UNUserNotification (notifications)
- Core Foundation & Objective-C bindings

**Windows:**

- WMI (volume and process monitoring)
- DeviceChange events
- Task Scheduler (launch at login)
- Windows Toast notifications
- Win32 APIs

## System Requirements

### macOS

- **OS Version:** macOS 11.0 (Big Sur) or later
- **Architecture:** Intel (x86_64) and Apple Silicon (ARM64)
- **Filesystem:** APFS or HFS+ (for hardlink support)
- **Permissions Required:**
  - Full Disk Access
  - Notifications
  - Accessibility (for app monitoring)

### Windows

- **OS Version:** Windows 10 (version 1809+) or Windows 11
- **Architecture:** x86_64 and ARM64
- **Filesystem:** NTFS or ReFS (for hardlink support)
- **Permissions Required:**
  - Standard user permissions
  - Notifications
  - Optional: Administrator for advanced monitoring

## Performance Targets

Backupper is designed to be lightweight and efficient:

| Metric                   | Target  | Notes                      |
| ------------------------ | ------- | -------------------------- |
| Scan 10,000 files        | < 2s    | Initial scan before backup |
| Scan 100,000 files       | < 20s   | Large photo libraries      |
| Backup 1GB (initial)     | < 1 min | First full backup          |
| Backup 1GB (incremental) | < 5s    | No changes                 |
| Menu response            | < 100ms | Instant feedback           |
| Memory (idle)            | < 50MB  | Minimal footprint          |
| Memory (backup)          | < 200MB | During active backup       |

## Security & Privacy

- **Local Only:** All backups stay on your local drives (no cloud, no network)
- **No Telemetry:** Zero data collection or phone-home
- **Secure Storage:** Settings stored in OS-standard locations
- **Permission Respect:** Only accesses folders you explicitly configure
- **Open Source:** Full source code transparency (MIT license)

## Development Status

**Current Phase:** Planning Complete ✅
**Next Phase:** Sprint 1 - Foundation 🚧

### Roadmap

**MVP (v1.0) - macOS 11.0+**

- ✅ Requirements finalized
- ✅ Architecture designed
- ✅ User stories created (214 GitHub issues)
- 🚧 Sprint 1: Foundation (starting now)
- 📋 Sprints 2-8: Core development
- 📋 Sprint 9: Testing & release

**Post-MVP (v1.1) - Windows 10/11**

- Platform abstraction enables easy Windows port
- Windows-specific implementations
- NTFS/ReFS hardlink support
- Windows installer and signing

**Future (v1.2+)**

- Advanced features (ANY quit mode, checksums, log viewer)
- Multiple backup profiles
- Restore functionality
- Additional platforms

### Development Timeline

- **macOS MVP:** ~130 hours (18 weeks part-time, ~4.5 months)
- **Windows Port:** +20 hours
- **Total:** ~150 hours

## Quick Start for Developers

### Prerequisites

**macOS:**

```bash
# Install Xcode Command Line Tools
xcode-select --install

# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Node.js (via Homebrew)
brew install node
```

**Windows:**

```powershell
# Install Rust (from https://rustup.rs/)
winget install Rustlang.Rustup

# Install Node.js
winget install OpenJS.NodeJS

# Install Microsoft C++ Build Tools
# (Visual Studio installer or standalone Build Tools)
```

### Running the Project

```bash
# Clone repository
git clone https://github.com/stijnpiron/backupper.git
cd backupper

# Install dependencies
npm install

# Start development server
npm run tauri dev
```

### Development Documentation

- **[REQUIREMENTS.md](./REQUIREMENTS.md)** - Complete requirements specification
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Technical architecture and design
- **[DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)** - Sprint planning and workflow

### GitHub Issues

All work is tracked as GitHub issues:

- 6 Epics (high-level features)
- 26 User Stories (user-facing functionality)
- 182 Tasks (implementation work)

Browse issues: https://github.com/stijnpiron/backupper/issues

## Support & Contributing

### Getting Help

- **Documentation:** Start with this overview, then dive into specific docs
- **GitHub Issues:** Report bugs or request features
- **GitHub Discussions:** Ask questions, share ideas

### Contributing

Contributions welcome! See [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) for:

- Development workflow
- Code style guidelines
- Testing requirements
- Git conventions

## FAQ

**Q: Why Tauri instead of Electron?**
A: Tauri is much lighter (~3MB vs ~100MB), uses less memory, and has better native system integration.

**Q: Why not use Time Machine (macOS) or Windows Backup?**
A: Backupper provides trigger-based backups (e.g., when app quits) and granular control over timing and retention that system tools don't offer.

**Q: How much disk space do I need?**
A: First backup needs space equal to source size. Incremental backups only need space for changed files thanks to hardlinks.

**Q: What happens if my filesystem doesn't support hardlinks?**
A: Backupper will detect this and ask if you want to proceed with full file copies or choose a different destination.

**Q: Can I restore individual files?**
A: Yes! Each backup folder is a complete snapshot - just browse it like any folder and copy files back.

**Q: Does this replace cloud backups?**
A: No - Backupper is for local backups. You should still maintain offsite/cloud backups for disaster recovery.

**Q: Will Windows support be exactly the same?**
A: Yes! Core functionality identical, with platform-native UI and system integration on each platform.

## License

MIT License - See LICENSE file for details.

---

**Ready to learn more?**

- Understanding requirements? → [REQUIREMENTS.md](./REQUIREMENTS.md)
- Technical architecture? → [ARCHITECTURE.md](./ARCHITECTURE.md)
- Start developing? → [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)

---

**Version:** 2.0
**Last Updated:** October 23, 2025
**Status:** Planning Complete - Ready for Development
