# Backupper Documentation

Welcome to the Backupper documentation! This folder contains all documentation needed for the complete development cycle.

## Documentation Structure

### 1. [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)

**Start here!** Complete project introduction, key features, tech stack, and quick start guide.

### 2. [REQUIREMENTS.md](./REQUIREMENTS.md)

Comprehensive functional and non-functional requirements, including:

- Core backup functionality
- Backup triggers (volume mount, periodic, app quit, manual)
- User interface specifications
- Cross-platform considerations (macOS & Windows)
- Performance, reliability, security requirements
- Success criteria and risk mitigation

### 3. [ARCHITECTURE.md](./ARCHITECTURE.md)

Technical architecture and design decisions:

- System architecture diagrams
- Module structure (Rust backend, TypeScript frontend)
- Core data structures
- Key algorithms (incremental backup, file comparison, retention)
- IPC communication patterns
- Platform abstraction architecture
- Performance optimization strategies

### 4. [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)

Development roadmap, sprint planning, and getting started:

- Sprint-by-sprint breakdown (18 weeks for MVP)
- Development workflow and best practices
- Testing checklist and benchmarks
- Troubleshooting guide
- Timeline and time estimates (~130 hours for macOS MVP)

## Quick Navigation

**Getting Started:**

- New to the project? → [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md)
- Want to understand what we're building? → [REQUIREMENTS.md](./REQUIREMENTS.md)
- Ready to code? → [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)

**Technical Deep Dive:**

- System design? → [ARCHITECTURE.md](./ARCHITECTURE.md)
- Platform-specific details? → [ARCHITECTURE.md](./ARCHITECTURE.md#platform-abstraction-architecture)

**Development Process:**

- Sprint planning? → [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md#sprint-details)
- Testing strategy? → [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md#testing-checklist)
- Timeline estimates? → [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md#timeline-overview)

## Project Status

**Current Phase:** Planning Complete ✅
**Next Phase:** Sprint 1 - Foundation 🚧
**MVP Target:** macOS 11.0+ (v1.0)
**Post-MVP:** Windows 10/11 support (v1.1)

**Development Time Estimates:**

- macOS MVP: ~130 hours (18 weeks part-time)
- Windows Port: +20 hours
- Total: ~150 hours

## GitHub Issues

All user stories and tasks have been created as GitHub issues:

- **6 Epics** - High-level feature areas
- **26 User Stories** - User-facing functionality
- **182 Tasks** - Implementation work items

Issues are organized with labels:

- Type: `epic`, `user-story`, `task`
- Epic: `epic-1` through `epic-6`
- Priority: `p0` (Must Have), `p1` (Should Have), `p2` (Nice to Have)

View all issues: https://github.com/stijnpiron/backupper/issues

## Technology Stack

**Frontend:**

- React 18+ with TypeScript 5+
- Tailwind CSS for styling
- Zustand for state management
- Radix UI for components

**Backend:**

- Tauri v2 framework
- Rust (latest stable)
- Tokio for async runtime

**Platform Integration:**

- **macOS:** DiskArbitration, NSWorkspace, SMAppService
- **Windows:** WMI, Win32 APIs, DeviceChange events

## Key Features

✨ **Incremental Backups with Hardlinks** - Save disk space by only copying changed files
📁 **Complete Snapshots** - Each backup shows the complete file tree at that moment
🔄 **Smart Triggers** - Backup on volume mount, app quit, or schedule
🖥️ **Cross-Platform** - Works on macOS and Windows with native integration
🎯 **System Tray Living** - Unobtrusive integration in your OS
⚙️ **Flexible Configuration** - Customize everything to your workflow

## Contributing

See [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md#development-workflow) for:

- Development workflow
- Git workflow and commit conventions
- Code style guidelines
- Testing requirements

## License

MIT License - See the LICENSE file in the repository root for details.

---

**Last Updated:** October 23, 2025
**Documentation Version:** 2.0
