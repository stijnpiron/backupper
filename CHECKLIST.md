# Backupper - Master Checklist

> Track overall project progress from planning to release

**Last Updated**: October 22, 2025
**Current Phase**: Planning Complete ✅

---

## 📋 Phase 0: Planning & Documentation ✅ COMPLETE

- [x] Define project requirements
- [x] Create user stories and task breakdown
- [x] Design technical architecture
- [x] Plan development roadmap
- [x] Create quick reference guides
- [x] Generate system diagrams
- [x] Write comprehensive README

**Documents Created**:

- [x] README.md
- [x] REQUIREMENTS.md
- [x] USER_STORIES.md
- [x] ARCHITECTURE.md
- [x] ROADMAP.md
- [x] QUICKREF.md
- [x] PLANNING_SUMMARY.md
- [x] DIAGRAMS.md
- [x] CHECKLIST.md (this file)

---

## 🔧 Phase 1: Development Environment Setup

### Prerequisites Installation

- [ ] Install Xcode Command Line Tools
- [ ] Install Rust (latest stable)
- [ ] Install Node.js 18+
- [ ] Install Tauri CLI
- [ ] Verify all installations

### IDE Setup

- [ ] Configure VS Code (or preferred IDE)
- [ ] Install Rust extensions
- [ ] Install React/TypeScript extensions
- [ ] Configure Prettier and ESLint
- [ ] Set up debugging configuration

### Git Repository

- [ ] Initialize Git repository
- [ ] Create .gitignore
- [ ] Make initial commit
- [ ] Set up remote repository (if applicable)
- [ ] Configure branch protection rules

**Status**: ⏳ Not Started
**Estimated Time**: 1-2 hours

---

## 🎯 Sprint 1: Foundation (Week 1)

### User Story 1.1: Project Setup ✅

- [ ] Task 1.1.1: Initialize Tauri v2 project
- [ ] Task 1.1.2: Configure Tauri permissions
- [ ] Task 1.1.3: Set up React with TypeScript
- [ ] Task 1.1.4: Configure Tailwind CSS
- [ ] Task 1.1.5: Create folder structure
- [ ] Task 1.1.6: Set up ESLint and Prettier
- [ ] Task 1.1.7: Test dev server

### User Story 1.2: Menu Bar App

- [ ] Task 1.2.1: Configure Tauri for menu bar
- [ ] Task 1.2.2: Create system tray in Rust
- [ ] Task 1.2.3: Design and add menu bar icons
- [ ] Task 1.2.4: Implement menu structure
- [ ] Task 1.2.5: Connect menu items to events
- [ ] Task 1.2.6: Test menu bar behavior

### User Story 1.3: Settings Storage

- [ ] Task 1.3.1: Define TypeScript settings interface
- [ ] Task 1.3.2: Create Rust settings struct
- [ ] Task 1.3.3: Implement settings file I/O
- [ ] Task 1.3.4: Create Tauri commands for settings
- [ ] Task 1.3.5: Implement frontend settings store
- [ ] Task 1.3.6: Add settings validation
- [ ] Task 1.3.7: Create default settings

**Status**: ⏳ Not Started
**Estimated Time**: 9 hours
**Completion**: 0/21 tasks

---

## 🎨 Sprint 2: Basic UI (Week 1-2)

### User Story 2.1: Settings Window

- [ ] Task 2.1.1: Create Settings window structure
- [ ] Task 2.1.2: Implement tab navigation
- [ ] Task 2.1.3: Add window management
- [ ] Task 2.1.4: Style settings window
- [ ] Task 2.1.5: Connect to settings store
- [ ] Task 2.1.6: Implement auto-save

### User Story 2.2: General Settings

- [ ] Task 2.2.1: Create General settings tab UI
- [ ] Task 2.2.2: Implement "Launch at login" toggle
- [ ] Task 2.2.3: Add backup prefix input
- [ ] Task 2.2.4: Add retention count input
- [ ] Task 2.2.5: Connect to settings store
- [ ] Task 2.2.6: Add validation and errors

### User Story 2.3: Source/Target Selection

- [ ] Task 2.3.1: Create Source & Target tab UI
- [ ] Task 2.3.2: Implement folder picker dialog
- [ ] Task 2.3.3: Add Rust command for volume info
- [ ] Task 2.3.4: Display volume details
- [ ] Task 2.3.5: Add path validation
- [ ] Task 2.3.6: Implement disk space check
- [ ] Task 2.3.7: Show warnings for invalid selections

**Status**: ⏳ Not Started
**Estimated Time**: 13 hours
**Completion**: 0/19 tasks

---

## 💾 Sprint 3: Basic Backup (Week 2-3)

### User Story 3.1: File System Scanner

- [ ] Task 3.1.1: Create Rust file scanner module
- [ ] Task 3.1.2: Implement recursive traversal
- [ ] Task 3.1.3: Collect file metadata
- [ ] Task 3.1.4: Add exclude pattern matching
- [ ] Task 3.1.5: Implement error handling
- [ ] Task 3.1.6: Add progress reporting
- [ ] Task 3.1.7: Optimize for performance

### User Story 3.2: Manual Backup

- [ ] Task 3.2.1: Add "Backup Now" menu item
- [ ] Task 3.2.2: Create backup orchestration
- [ ] Task 3.2.3: Implement settings validation
- [ ] Task 3.2.4: Create backup folder with timestamp
- [ ] Task 3.2.5: Implement basic file copy
- [ ] Task 3.2.6: Add concurrent backup prevention
- [ ] Task 3.2.7: Integrate progress reporting
- [ ] Task 3.2.8: Add completion notification

**Status**: ⏳ Not Started
**Estimated Time**: 11 hours
**Completion**: 0/15 tasks

---

## 🔄 Sprint 4: Incremental Backup (Week 3-4)

### User Story 3.3: Hardlinks & Incremental

- [ ] Task 3.3.1: Implement file comparison logic
- [ ] Task 3.3.2: Add hardlink creation
- [ ] Task 3.3.3: Create backup snapshot structure
- [ ] Task 3.3.4: Implement incremental algorithm
- [ ] Task 3.3.5: Handle file deletions
- [ ] Task 3.3.6: Add filesystem detection
- [ ] Task 3.3.7: Test hardlink creation
- [ ] Task 3.3.8: Add fallback for unsupported filesystems

### User Story 3.4: Backup State Tracking

- [ ] Task 3.4.1: Create backup metadata structure
- [ ] Task 3.4.2: Implement metadata storage
- [ ] Task 3.4.3: Track backup status
- [ ] Task 3.4.4: Update metadata at milestones
- [ ] Task 3.4.5: Implement cleanup for failed backups
- [ ] Task 3.4.6: Add recovery logic
- [ ] Task 3.4.7: Create last successful backup finder

### User Story 3.5: Retention Management

- [ ] Task 3.5.1: Create backup enumeration
- [ ] Task 3.5.2: Implement backup sorting
- [ ] Task 3.5.3: Add retention limit check
- [ ] Task 3.5.4: Implement safe deletion
- [ ] Task 3.5.5: Test hardlink cleanup
- [ ] Task 3.5.6: Add logging for retention
- [ ] Task 3.5.7: Handle edge cases

**Status**: ⏳ Not Started
**Estimated Time**: 15 hours
**Completion**: 0/22 tasks

---

## 🎯 Sprint 5: Advanced UI (Week 4-5)

### User Story 2.4: Triggers Configuration

- [ ] Task 2.4.1: Create Triggers tab UI
- [ ] Task 2.4.2: Add volume mount toggle
- [ ] Task 2.4.3: Add periodic backup options
- [ ] Task 2.4.4: Create command to list apps
- [ ] Task 2.4.5: Implement app selection list
- [ ] Task 2.4.6: Add monitoring mode radio
- [ ] Task 2.4.7: Connect to settings store

### User Story 2.5: Progress Display

- [ ] Task 2.5.1: Design progress UI component
- [ ] Task 2.5.2: Create progress state management
- [ ] Task 2.5.3: Implement Tauri progress events
- [ ] Task 2.5.4: Add progress calculation in Rust
- [ ] Task 2.5.5: Update menu bar icon during backup
- [ ] Task 2.5.6: Add progress bar and statistics
- [ ] Task 2.5.7: Format sizes and time estimates

**Status**: ⏳ Not Started
**Estimated Time**: 9 hours
**Completion**: 0/14 tasks

---

## 🔔 Sprint 6: Backup Triggers (Week 5-7)

### User Story 4.1: Volume Mount Detection

- [ ] Task 4.1.1: Research macOS volume monitoring
- [ ] Task 4.1.2: Create Rust volume monitor
- [ ] Task 4.1.3: Implement volume UUID detection
- [ ] Task 4.1.4: Map source folder to volume
- [ ] Task 4.1.5: Add mount event handler
- [ ] Task 4.1.6: Trigger backup on mount
- [ ] Task 4.1.7: Add debouncing
- [ ] Task 4.1.8: Test with external drives

### User Story 4.2: Periodic Backups

- [ ] Task 4.2.1: Create periodic scheduler
- [ ] Task 4.2.2: Implement interval calculation
- [ ] Task 4.2.3: Add timer/scheduler logic
- [ ] Task 4.2.4: Integrate sleep detection
- [ ] Task 4.2.5: Trigger backup at interval
- [ ] Task 4.2.6: Add countdown display
- [ ] Task 4.2.7: Handle schedule changes

### User Story 4.3: Application Quit Monitoring

- [ ] Task 4.3.1: Research process monitoring
- [ ] Task 4.3.2: Create Rust process monitor
- [ ] Task 4.3.3: Implement app quit detection
- [ ] Task 4.3.4: Track monitored app states
- [ ] Task 4.3.5: Implement "ANY quit" logic
- [ ] Task 4.3.6: Implement "ALL quit" logic
- [ ] Task 4.3.7: Trigger backup based on mode
- [ ] Task 4.3.8: Test with various applications

**Status**: ⏳ Not Started
**Estimated Time**: 16 hours
**Completion**: 0/23 tasks

---

## 🔗 Sprint 7: System Integration (Week 7-8)

### User Story 5.1: Launch at Login

- [ ] Task 5.1.1: Research launch at login APIs
- [ ] Task 5.1.2: Create Rust command to register
- [ ] Task 5.1.3: Create command to unregister
- [ ] Task 5.1.4: Connect toggle in UI
- [ ] Task 5.1.5: Test registration persistence
- [ ] Task 5.1.6: Handle permission requests
- [ ] Task 5.1.7: Test on different macOS versions

### User Story 5.2: Notifications

- [ ] Task 5.2.1: Set up Tauri notification permissions
- [ ] Task 5.2.2: Create notification helper
- [ ] Task 5.2.3: Implement start notification
- [ ] Task 5.2.4: Implement success notification
- [ ] Task 5.2.5: Implement failure notification
- [ ] Task 5.2.6: Add enable/disable setting
- [ ] Task 5.2.7: Test notification display

### User Story 5.3: Comprehensive Logging

- [ ] Task 5.3.1: Set up logging framework
- [ ] Task 5.3.2: Configure log file location
- [ ] Task 5.3.3: Implement log rotation
- [ ] Task 5.3.4: Add logging for backup operations
- [ ] Task 5.3.5: Add logging for triggers
- [ ] Task 5.3.6: Add logging for errors
- [ ] Task 5.3.7: Test log output and rotation

### User Story 5.4: Permission Handling

- [ ] Task 5.4.1: Identify required permissions
- [ ] Task 5.4.2: Create permission check functions
- [ ] Task 5.4.3: Implement permission request flow
- [ ] Task 5.4.4: Add permission status UI
- [ ] Task 5.4.5: Create guidance for permissions
- [ ] Task 5.4.6: Handle permission denial
- [ ] Task 5.4.7: Test permission flows

**Status**: ⏳ Not Started
**Estimated Time**: 13 hours
**Completion**: 0/28 tasks

---

## ✨ Sprint 8: Polish & Testing (Week 8-10)

### User Story 6.1: First-Run Experience

- [ ] Task 6.1.1: Design onboarding flow
- [ ] Task 6.1.2: Create welcome screen
- [ ] Task 6.1.3: Create setup wizard steps
- [ ] Task 6.1.4: Implement first-run detection
- [ ] Task 6.1.5: Add skip/continue navigation
- [ ] Task 6.1.6: Set default configuration
- [ ] Task 6.1.7: Test first-run experience

### User Story 6.2: Error Handling

- [ ] Task 6.2.1: Define error types
- [ ] Task 6.2.2: Implement error handling in Rust
- [ ] Task 6.2.3: Create error display components
- [ ] Task 6.2.4: Add error recovery logic
- [ ] Task 6.2.5: Test error scenarios
- [ ] Task 6.2.6: Add user-friendly messages
- [ ] Task 6.2.7: Implement error reporting

### User Story 6.3: Testing

- [ ] Task 6.3.1: Set up test framework
- [ ] Task 6.3.2: Write tests for file scanner
- [ ] Task 6.3.3: Write tests for backup logic
- [ ] Task 6.3.4: Write tests for hardlinks
- [ ] Task 6.3.5: Write tests for settings
- [ ] Task 6.3.6: Write tests for retention
- [ ] Task 6.3.7: Create test fixtures
- [ ] Task 6.3.8: Run tests in CI

### User Story 6.4: Performance Optimization

- [ ] Task 6.4.1: Profile file scanning
- [ ] Task 6.4.2: Optimize directory traversal
- [ ] Task 6.4.3: Implement parallel operations
- [ ] Task 6.4.4: Add throttling for CPU tasks
- [ ] Task 6.4.5: Optimize UI rendering
- [ ] Task 6.4.6: Test with large datasets
- [ ] Task 6.4.7: Measure and optimize memory

**Status**: ⏳ Not Started
**Estimated Time**: 23 hours
**Completion**: 0/29 tasks

---

## 📦 Sprint 9: Distribution (Week 10-11)

### User Story 2.6: Log Viewer

- [ ] Task 2.6.1: Create log viewer window
- [ ] Task 2.6.2: Implement log reading
- [ ] Task 2.6.3: Add log entry formatting
- [ ] Task 2.6.4: Implement filtering and search
- [ ] Task 2.6.5: Add backup history summary
- [ ] Task 2.6.6: Create export functionality
- [ ] Task 2.6.7: Style log viewer

### User Story 6.5: Distribution

- [ ] Task 6.5.1: Configure Tauri bundler
- [ ] Task 6.5.2: Create app icon and assets
- [ ] Task 6.5.3: Set up code signing
- [ ] Task 6.5.4: Configure tauri-plugin-updater
- [ ] Task 6.5.5: Test .dmg installation
- [ ] Task 6.5.6: Create release build script
- [ ] Task 6.5.7: Document build process

### Documentation

- [ ] Write user manual
- [ ] Create FAQ
- [ ] Document known issues
- [ ] Create troubleshooting guide
- [ ] Write release notes

**Status**: ⏳ Not Started
**Estimated Time**: 8 hours
**Completion**: 0/19 tasks

---

## 🎯 Milestones

### Milestone 1: Hello World ✨

- [ ] App runs and appears in menu bar
- [ ] Settings window opens
- [ ] Basic UI styled and functional
- **Target**: End of Sprint 2

### Milestone 2: Basic Backup MVP 🎯

- [ ] Manual backup works
- [ ] Files copied correctly
- [ ] Progress displayed
- [ ] Settings persist
- **Target**: End of Sprint 3

### Milestone 3: Incremental Backup 🔄

- [ ] Hardlinks working
- [ ] Incremental backup functional
- [ ] Retention policy working
- [ ] State tracking complete
- **Target**: End of Sprint 4

### Milestone 4: Full Automation 🤖

- [ ] At least one trigger working
- [ ] All trigger types implemented
- [ ] Triggers configurable in UI
- **Target**: End of Sprint 6

### Milestone 5: Production Ready 🚀

- [ ] All features complete
- [ ] Tests passing
- [ ] Performance acceptable
- [ ] Error handling robust
- [ ] First-run experience smooth
- **Target**: End of Sprint 8

### Milestone 6: Release 1.0 🎉

- [ ] Signed .dmg available
- [ ] Documentation complete
- [ ] Tested on fresh macOS install
- [ ] Ready for distribution
- **Target**: End of Sprint 9

---

## 📊 Progress Summary

### Overall Progress

**Total Tasks**: 185
**Completed**: 0
**In Progress**: 0
**Not Started**: 185
**Completion**: 0%

### By Priority

- **P0 (Must Have)**: 0/107 (0%)
- **P1 (Should Have)**: 0/65 (0%)
- **P2 (Nice to Have)**: 0/13 (0%)

### By Sprint

- **Sprint 1**: 0/21 (0%)
- **Sprint 2**: 0/19 (0%)
- **Sprint 3**: 0/15 (0%)
- **Sprint 4**: 0/22 (0%)
- **Sprint 5**: 0/14 (0%)
- **Sprint 6**: 0/23 (0%)
- **Sprint 7**: 0/28 (0%)
- **Sprint 8**: 0/29 (0%)
- **Sprint 9**: 0/19 (0%)

---

## 🎓 Learning Checklist

### Rust Fundamentals

- [ ] Ownership and borrowing
- [ ] Error handling (Result, Option)
- [ ] Async/await with Tokio
- [ ] File system operations
- [ ] Process and system APIs

### Tauri Specific

- [ ] Tauri commands and events
- [ ] System tray API
- [ ] Window management
- [ ] File dialogs
- [ ] Notifications

### macOS Integration

- [ ] DiskArbitration framework
- [ ] Process monitoring
- [ ] Launch agents
- [ ] Permissions model

---

## 🐛 Known Issues

_Track bugs and issues as they're discovered_

| ID  | Description | Severity | Status | Notes |
| --- | ----------- | -------- | ------ | ----- |
|     |             |          |        |       |

---

## 💡 Ideas & Future Enhancements

_Track feature ideas for post-MVP_

- [ ] Multiple backup profiles
- [ ] Cloud storage targets (S3, Dropbox)
- [ ] Backup encryption
- [ ] Advanced scheduling (cron-like)
- [ ] Network share support
- [ ] Windows/Linux ports
- [ ] Command-line interface
- [ ] Backup verification/integrity checks
- [ ] Email notifications
- [ ] Bandwidth throttling

---

## 📝 Notes & Decisions

_Record important decisions and context_

| Date       | Topic           | Decision                  | Reason                                     |
| ---------- | --------------- | ------------------------- | ------------------------------------------ |
| 2025-10-22 | Tech Stack      | Tauri + Rust + React + TS | Cross-platform, performant, TS familiarity |
| 2025-10-22 | Backup Strategy | Hardlinks + incremental   | Space efficiency + complete snapshots      |
|            |                 |                           |                                            |

---

## ✅ Next Actions

**Immediate Next Steps**:

1. [ ] Review all documentation
2. [ ] Set up development environment
3. [ ] Run `npm create tauri-app@latest` in current directory
4. [ ] Start Sprint 1, Task 1.1.1

**This Week**:

- Complete Sprint 1 (Foundation)
- Start Sprint 2 (Basic UI)

**This Month**:

- Complete Sprints 1-4 (Foundation + UI + Backup Engine)
- Reach Milestone 3 (Incremental Backup)

---

**How to Use This Checklist**:

1. Check off tasks as you complete them
2. Update progress percentages weekly
3. Add notes for blockers or challenges
4. Track time spent vs estimated
5. Celebrate milestones! 🎉

---

**Last Updated**: October 22, 2025
**Current Sprint**: Not Started
**Next Milestone**: Milestone 1 (Hello World)

---

## ⭐ UPDATED CHECKLIST (Oct 22, 2025)

Features reorganized by priority based on finalized requirements.

### Priority 1 - Must Have (MVP Blockers) ⭐

#### Core Backup Features
- [ ] ⭐ Incremental backup with hardlinks (APFS/HFS+ on macOS)
- [ ] ⭐ Manual backup trigger (essential for testing)
- [ ] ⭐ Basic backup verification (file count check, completion status)
- [ ] ⭐ Backup retention management (keep last N, keep for X days)
- [ ] ⭐ Basic progress tracking (file count, current operation)
- [ ] Backup cancellation (mark as failed, cleanup partial)
- [ ] Partial failure handling (keep partial, add missed files to next)
- [ ] Hardlink fallback strategy (inform user, let them decide)
- [ ] Error handling and recovery

#### Backup Triggers
- [ ] ⭐ Manual trigger (button in UI, always enabled when config valid)
- [ ] ⭐ Application quit detection (ALL mode - backup when all apps quit)
- [ ] ⭐ Volume mount detection (external drive workflow)
- [ ] Trigger configuration UI (app picker, volume picker)
- [ ] Notifications for triggered backups

#### System Integration
- [ ] ⭐ System tray/menu bar icon (macOS)
- [ ] ⭐ Launch at login functionality
- [ ] ⭐ System notifications (backup start, complete, error)
- [ ] Background operation (no interference with user work)
- [ ] Resource management (respectful CPU/disk usage)

#### Platform Abstraction
- [ ] Platform detection and conditional compilation
- [ ] Platform trait definitions (PlatformBackend trait)
- [ ] macOS implementation (NSWorkspace, DiskArbitration, cocoa)
- [ ] Windows stub implementation (for future v1.1)
- [ ] Platform-agnostic core backup logic

### Priority 2 - Should Have (Sprint 6) 

- [ ] Periodic/scheduled backup trigger (hourly, daily, weekly)
- [ ] Schedule configuration UI
- [ ] Skip logic when source/destination unavailable

### Priority 3 - Nice to Have (Future Versions)

- [ ] Detailed progress tracking (per-file, speed, ETA)
- [ ] Log viewer UI (view detailed logs in app)
- [ ] Exclude patterns UI (exclude files/folders)

### Deferred Features (v1.2+)

- [ ] ANY quit mode (trigger when any app quits)
- [ ] Advanced checksum verification (incremental)
- [ ] Multiple backup profiles (v1.3)
- [ ] Restore functionality (v1.3)

---

## Sprint-by-Sprint Checklist

### Sprint 1: Foundation (8h)
- [ ] Tauri v2 project initialized with platform detection
- [ ] Platform abstraction structure created
- [ ] macOS-specific dependencies configured
- [ ] Basic dev environment working

### Sprint 2: Backup Engine + Manual Trigger (28h) ⭐
- [ ] Incremental backup engine implemented
- [ ] Hardlink support (APFS/HFS+)
- [ ] File comparison logic
- [ ] **Manual backup button in UI**
- [ ] **Basic verification (file count check)**

### Sprint 3: UI & Configuration (16h)
- [ ] Settings window
- [ ] Source/destination selection
- [ ] Configuration UI

### Sprint 4: Critical Triggers (30h) ⭐
- [ ] App quit detection (ALL mode only)
- [ ] Volume mount detection
- [ ] Trigger configuration UI
- [ ] Notifications for triggers

### Sprint 5: Advanced Features (26h)
- [ ] Retention management
- [ ] Basic progress feedback

### Sprint 6: System Integration + Periodic (26h) ⭐
- [ ] System notifications
- [ ] Launch at login
- [ ] Backup history
- [ ] **Periodic backup trigger (Priority 2)**

### Sprint 7: Error Handling (15h)
- [ ] Cancellation support
- [ ] Partial failure handling
- [ ] Hardlink fallback strategy

### Sprint 8: Testing (18h)
- [ ] Unit tests
- [ ] Integration tests
- [ ] Lightroom workflow validation

### Sprint 9: Release (12h)
- [ ] Documentation
- [ ] macOS .dmg package
- [ ] Code signing & notarization
- [ ] v1.0 release

### Sprint 10: Windows Port (20h)
- [ ] Windows platform implementation
- [ ] Windows installer
- [ ] v1.1 release

---

**Status**: ✅ Checklist updated with priorities - Ready to track progress
