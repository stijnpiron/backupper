# Backupper - Project Roadmap & Getting Started

## Quick Start Guide

### Prerequisites

1. **macOS Development Environment**

   - macOS 11.0 (Big Sur) or later
   - Xcode Command Line Tools: `xcode-select --install`

2. **Rust**

   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   rustup update stable
   ```

3. **Node.js & npm**

   ```bash
   # Using Homebrew
   brew install node
   # or download from https://nodejs.org/
   ```

4. **Tauri CLI**
   ```bash
   npm install -g @tauri-apps/cli@next
   ```

### Project Initialization

We'll start with Sprint 1 (Foundation) which takes approximately 9 hours.

---

## Development Roadmap

### 🎯 Sprint 1: Foundation (Week 1)

**Duration**: ~9 hours | **Priority**: P0

**Goals**:

- Set up development environment
- Initialize Tauri v2 project
- Configure TypeScript, React, and Tailwind
- Create menu bar app
- Implement basic settings storage

**Deliverables**:

- [ ] Runnable Tauri app
- [ ] Menu bar icon with dropdown
- [ ] Settings window (skeleton)
- [ ] Settings persistence working

**Success Criteria**:

- App appears in menu bar
- Settings window opens/closes
- Settings save and load correctly

---

### 🎯 Sprint 2: Basic UI (Week 1-2)

**Duration**: ~13 hours | **Priority**: P0

**Goals**:

- Build settings UI (General, Source/Target tabs)
- Implement folder pickers
- Display volume information
- Form validation

**Deliverables**:

- [ ] Complete General settings tab
- [ ] Complete Source/Target settings tab
- [ ] Folder selection working
- [ ] Settings validation in place

**Success Criteria**:

- User can configure all basic settings
- Invalid inputs are caught and displayed
- UI follows macOS design guidelines

---

### 🎯 Sprint 3: Basic Backup (Week 2-3)

**Duration**: ~11 hours | **Priority**: P0

**Goals**:

- Implement file scanner
- Create basic backup engine
- Manual backup trigger
- Progress indication

**Deliverables**:

- [ ] File system scanner working
- [ ] Basic file copy backup
- [ ] "Backup Now" functional
- [ ] Basic progress display

**Success Criteria**:

- Manual backup successfully copies files
- Progress shown during backup
- Creates timestamped backup folder
- Handles errors gracefully

---

## Sprint 5: Advanced Features - Retention & Progress (Weeks 9-10)

**Goal**: Add retention management and basic progress feedback

**User Stories**:

- 3.4: Retention Management ⭐ PRIORITY 1
- 2.3: Progress Feedback (Basic) ⭐ PRIORITY 1

**Time Estimate**: 26 hours (18 + 8)

**Key Deliverables**:

- Backup retention policies (keep last N backups, keep for X days)
- Automatic cleanup of old backups
- Space management
- Basic progress display (file count, current operation)
- Progress updates during backup
- Completion notifications

---

### 🎯 Sprint 5: Advanced UI (Week 4-5)

**Duration**: ~9 hours | **Priority**: P1

**Goals**:

- Triggers configuration tab
- Application selection UI
- Progress details enhancement
- Status indicators

**Deliverables**:

- [ ] Triggers tab complete
- [ ] App selection list with icons
- [ ] Detailed progress display
- [ ] Menu bar status icons

**Success Criteria**:

- User can configure all trigger types
- Application list populated correctly
- Progress shows detailed statistics
- Status clear at a glance

---

### 🎯 Sprint 6: Backup Triggers (Week 5-7)

**Duration**: ~16 hours | **Priority**: P1

**Goals**:

- Volume mount detection
- Periodic backup scheduler
- Application quit monitoring
- Trigger coordination

**Deliverables**:

- [ ] Volume monitoring working
- [ ] Periodic scheduler functional
- [ ] App quit detection working
- [ ] Trigger modes (ANY/ALL) implemented

**Success Criteria**:

- Backup triggers on volume mount
- Periodic backups run on schedule
- App quit triggers work reliably
- No duplicate/concurrent backups

---

## Sprint 7: Error Handling & Edge Cases (Weeks 13-14)

**Goal**: Robust error handling and edge case coverage

**User Stories**:

- 3.5: Backup Cancellation
- 3.6: Partial Backup Failure Handling
- 3.7: Hardlink Fallback Strategy

**Time Estimate**: 15 hours (5 + 5 + 5)

**Key Deliverables**:

- Backup cancellation with cleanup
- Mark cancelled backups as failed
- Partial failure handling (keep partial backup, add missed files to next)
- Hardlink fallback (inform user if filesystem doesn't support hardlinks)
- User decision prompt for fallback scenarios
- Robust error messages and logging

---

### 🎯 Sprint 8: Polish & Testing (Week 8-10)

**Duration**: ~23 hours | **Priority**: P1

**Goals**:

- First-run experience
- Error handling improvements
- Unit and integration tests
- Performance optimization
- Bug fixes

**Deliverables**:

- [ ] Welcome/onboarding flow
- [ ] Comprehensive error handling
- [ ] Test suite (80%+ coverage)
- [ ] Performance optimizations
- [ ] Bug fixes

**Success Criteria**:

- Smooth first-run experience
- All errors handled gracefully
- Tests passing
- Acceptable performance with large datasets
- No critical bugs

---

### 🎯 Sprint 9: Logs & Distribution (Week 10-11)

**Duration**: ~8 hours | **Priority**: P2

**Goals**:

- Log viewer UI
- Build configuration
- App signing and notarization
- Documentation

**Deliverables**:

- [ ] Log viewer window
- [ ] Build scripts
- [ ] Signed .dmg
- [ ] User documentation
- [ ] Developer documentation

**Success Criteria**:

- Logs viewable in UI
- App installable via .dmg
- App runs on fresh macOS install
- Documentation complete

---

## Timeline Overview

```
Week 1  : Sprint 1 (Foundation) → Sprint 2 (Basic UI) START
Week 2  : Sprint 2 (Basic UI) END → Sprint 3 (Basic Backup)
Week 3  : Sprint 3 END → Sprint 4 (Incremental Backup)
Week 4  : Sprint 4 (Incremental Backup) → Sprint 5 (Advanced UI)
Week 5  : Sprint 5 END → Sprint 6 (Triggers) START
Week 6-7: Sprint 6 (Triggers)
Week 7-8: Sprint 7 (System Integration)
Week 8-10: Sprint 8 (Polish & Testing)
Week 10-11: Sprint 9 (Logs & Distribution)
```

**Total Duration**: ~11 weeks (part-time) or ~3 weeks (full-time)

---

## Development Workflow

### Daily Workflow

1. **Morning**

   - Review current sprint tasks
   - Check USER_STORIES.md for current task details
   - Run `npm run tauri dev` to start development

2. **Development**

   - Implement features per task list
   - Test incrementally
   - Commit regularly with clear messages

3. **End of Day**
   - Update task checkboxes in USER_STORIES.md
   - Run tests
   - Document any issues or blockers

### Git Workflow

```bash
# Feature branch workflow
git checkout -b feature/task-description
# Make changes
git add .
git commit -m "feat: implement [feature description]"
git push origin feature/task-description
# Merge to main when complete
```

### Commit Message Convention

```
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting, missing semicolons, etc.
refactor: code refactoring
test: adding tests
chore: maintenance
```

---

## Testing Checklist

### Per Sprint Testing

**Sprint 1-2** (UI):

- [ ] Settings window opens/closes correctly
- [ ] All form fields work
- [ ] Settings persist after restart
- [ ] Validation catches invalid inputs

**Sprint 3-4** (Backup):

- [ ] Backup creates correct folder structure
- [ ] Files copied correctly
- [ ] Hardlinks created and verified
- [ ] Progress updates shown
- [ ] Errors handled gracefully

**Sprint 5-6** (Triggers):

- [ ] Volume mount detected
- [ ] Periodic backup runs on schedule
- [ ] App quit triggers backup
- [ ] No duplicate backups

**Sprint 7** (Integration):

- [ ] Launch at login works after reboot
- [ ] Notifications appear
- [ ] Permissions requested properly
- [ ] Logs created and rotated

**Sprint 8** (Polish):

- [ ] First-run experience smooth
- [ ] All error messages clear
- [ ] Performance acceptable (100k+ files)
- [ ] Memory usage reasonable

---

## Performance Benchmarks

Target performance metrics:

| Operation                | Target  | Measurement                  |
| ------------------------ | ------- | ---------------------------- |
| Scan 10k files           | < 2s    | Time to complete scan        |
| Scan 100k files          | < 20s   | Time to complete scan        |
| Backup 1GB (initial)     | < 1 min | Cold backup time             |
| Backup 1GB (incremental) | < 5s    | Hot backup time (no changes) |
| Menu response            | < 100ms | Click to menu display        |
| Settings save            | < 50ms  | Save operation time          |
| Memory (idle)            | < 50MB  | RSS memory usage             |
| Memory (backup)          | < 200MB | RSS during backup            |

---

## Troubleshooting Guide

### Common Issues

**1. Tauri dev won't start**

```bash
# Clear cache and reinstall
rm -rf node_modules
rm -rf src-tauri/target
npm install
npm run tauri dev
```

**2. Rust compilation errors**

```bash
# Update Rust
rustup update stable
# Clean build
cd src-tauri
cargo clean
cd ..
```

**3. Permission errors on macOS**

- System Settings → Privacy & Security → Full Disk Access
- Add Backupper.app (or terminal/IDE during dev)

**4. Menu bar icon not appearing**

- Check tauri.conf.json: `"systemTray"` configuration
- Verify icon files exist in `src-tauri/icons/`

---

## Resources

### Documentation

- [Tauri v2 Docs](https://v2.tauri.app/)
- [Tauri API Reference](https://v2.tauri.app/reference/)
- [Rust Book](https://doc.rust-lang.org/book/)
- [React Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Tauri Plugins

- [tauri-plugin-notification](https://v2.tauri.app/plugin/notification/)
- [tauri-plugin-dialog](https://v2.tauri.app/plugin/dialog/)
- [tauri-plugin-fs](https://v2.tauri.app/plugin/file-system/)
- [tauri-plugin-autostart](https://github.com/tauri-apps/tauri-plugin-autostart)

### macOS APIs (Rust)

- [core-foundation](https://docs.rs/core-foundation/)
- [cocoa](https://docs.rs/cocoa/)
- [objc](https://docs.rs/objc/)
- [walkdir](https://docs.rs/walkdir/)

### UI Libraries

- [Radix UI](https://www.radix-ui.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## Next Steps

### Immediate Action Items

1. **Review Documentation** ✓

   - [x] REQUIREMENTS.md
   - [x] USER_STORIES.md
   - [x] ARCHITECTURE.md
   - [x] ROADMAP.md (this file)

2. **Set Up Development Environment**

   - [ ] Install prerequisites (Rust, Node.js, Xcode tools)
   - [ ] Verify installations
   - [ ] Clone/create project repository

3. **Start Sprint 1**

   - [ ] Initialize Tauri project
   - [ ] Set up basic project structure
   - [ ] Get "Hello World" running

4. **First Milestone**
   - [ ] Complete User Story 1.1 (Project setup)
   - [ ] Complete User Story 1.2 (Menu bar app)
   - [ ] Complete User Story 1.3 (Settings storage)

---

## Questions & Decisions Log

Track important decisions and open questions:

| Date       | Question          | Decision                             | Rationale                                         |
| ---------- | ----------------- | ------------------------------------ | ------------------------------------------------- |
| 2025-10-22 | Tech stack        | Tauri v2 + Rust + React + TypeScript | Cross-platform, performant, user familiar with TS |
| 2025-10-22 | Backup strategy   | Hardlinks for unchanged files        | Disk space efficiency                             |
| 2025-10-22 | Naming convention | `{prefix}_{YYYY-MM-DD}_{HHMMSS}`     | User-configurable, sortable                       |
|            |                   |                                      |                                                   |

---

## Success Metrics

### MVP Success Criteria

- [ ] App runs on macOS 11+
- [ ] Successfully backs up 10GB+ folder
- [ ] Hardlinks work correctly (verified)
- [ ] At least one trigger works (volume/periodic/app)
- [ ] Retention policy functions correctly
- [ ] UI intuitive and responsive
- [ ] Launch at login works
- [ ] No data loss or corruption

### Post-Launch Metrics

- User retention after 1 month
- Average backup success rate
- Performance with various dataset sizes
- User feedback and feature requests
- Bug reports and resolution time

---

## Contact & Support

- **GitHub Issues**: Track bugs and features
- **Discussions**: Ask questions, share ideas
- **Wiki**: Community documentation

---

**Ready to start building?**

👉 **Next Step**: Begin with Sprint 1, Task 1.1.1: Initialize Tauri v2 project

Let me know when you're ready to proceed with the project initialization!

---

**Document Version**: 1.0
**Last Updated**: October 22, 2025

---

## ⭐ UPDATED ROADMAP (Oct 22, 2025)

Based on finalized requirements, the roadmap has been reorganized for optimal development flow.

### Key Changes:
1. **Manual Backup Trigger** moved to Sprint 2 (from Sprint 4) - Essential for testing
2. **Periodic Backup Trigger** moved to Sprint 6 (from Sprint 4) - Priority 2 feature
3. **Timeline optimized** to ~130 hours (saved 13 hours through smart scoping)

---

## Updated Sprint Details

### Sprint 2: Core Backup Engine + Manual Trigger (Weeks 3-4) ⭐ UPDATED
**Goal**: Implement backup functionality AND manual trigger for immediate testing

**User Stories**:
- 3.1: Incremental Backup with Hardlinks (20 hours)
- **3.2: Manual Backup Trigger (8 hours)** ⬅️ MOVED FROM SPRINT 4

**Time Estimate**: 28 hours (was 20 hours)

**Key Deliverables**:
- Working backup engine with platform-abstracted file operations
- Hardlink support for unchanged files (APFS/HFS+ on macOS)
- File comparison and incremental logic
- **Manual backup button in UI** ⭐
- **Basic backup verification (file count check)** ⭐
- Ability to test backup engine immediately!

**Rationale**: Manual trigger is Priority 1 because it's essential for testing the backup engine during development. Moving it to Sprint 2 allows immediate validation of core functionality.

---

### Sprint 4: Critical Triggers - App Quit & Volume Mount (Weeks 7-8) ⭐ UPDATED
**Goal**: Implement the two critical automatic backup triggers for MVP

**User Stories**:
- 4.1: Application Quit Detection (ALL mode) (15 hours)
- 4.3: Volume Mount Detection (15 hours)
- **REMOVED: 4.2 Periodic Backup Trigger** (moved to Sprint 6)

**Time Estimate**: 30 hours (was 33 hours)

**Key Deliverables**:
- App quit monitoring with **ALL mode only** (backup when all monitored apps quit)
- Volume mount detection for external drives (critical for Lightroom workflow)
- App selection UI with browseable app picker
- Volume selection UI with dropdown of mounted volumes
- Trigger configuration in settings
- Notifications for triggered backups
- macOS-specific implementations (NSWorkspace, DiskArbitration)

**Technical Notes**:
- **ALL quit mode only** - Simpler than implementing both ANY and ALL
- ANY mode deferred to v1.2+ (not needed for single-app Lightroom workflow)
- Time saved: ~2 hours

---

### Sprint 6: System Integration + Periodic Trigger (Weeks 11-12) ⭐ UPDATED
**Goal**: Complete system integration and add scheduled backups

**User Stories**:
- 5.1: System Notifications (5 hours)
- 5.2: Launch at Login (6 hours)
- 2.4: Backup History (3 hours)
- **4.2: Periodic Backup Trigger (12 hours)** ⬅️ MOVED FROM SPRINT 4

**Time Estimate**: 26 hours (was 23 hours)

**Key Deliverables**:
- System notifications for backup events (start, complete, error)
- Launch at login functionality
- Backup history view with timestamps and status
- **Scheduled/periodic backup trigger** (hourly, daily, weekly)
- Complete MVP feature set

**Rationale**: Periodic trigger is Priority 2 (Should Have), not blocking MVP core functionality. Better to implement it after critical triggers are working and tested.

---

## Updated Timeline Summary

| Sprint | Duration | Focus | Hours | Status |
|--------|----------|-------|-------|--------|
| 1 | Weeks 1-2 | Foundation + Platform Abstraction | 8h | Ready to start |
| 2 | Weeks 3-4 | **Backup Engine + Manual Trigger** | 28h | ⭐ Updated |
| 3 | Weeks 5-6 | UI & Configuration | 16h | |
| 4 | Weeks 7-8 | **Critical Triggers (App Quit + Volume)** | 30h | ⭐ Updated |
| 5 | Weeks 9-10 | Retention + Basic Progress | 26h | |
| 6 | Weeks 11-12 | **Integration + Periodic Trigger** | 26h | ⭐ Updated |
| 7 | Weeks 13-14 | Error Handling | 15h | |
| 8 | Weeks 15-16 | Testing + Lightroom Validation | 18h | |
| 9 | Weeks 17-18 | Documentation + macOS Release | 12h | |
| **Total** | **18 weeks** | **macOS MVP (v1.0)** | **~130h** | |
| 10 | Post-MVP | Windows Port (v1.1) | +20h | |

**Total Development Time**: ~150 hours (macOS MVP + Windows port)  
**Calendar Time**: ~18 weeks for MVP (~4.5 months)  
**Recommended Weekly Commitment**: 7-8 hours/week

---

## Post-MVP Feature Roadmap

### v1.1 (Sprint 10, +20 hours)
- ✅ Windows support
- ✅ Windows-specific implementations (WMI, Win32 APIs)
- ✅ NTFS/ReFS hardlink support
- ✅ Windows installer and code signing

### v1.2 (Future)
- ANY quit mode (trigger when any app quits)
- Advanced checksum verification (incremental)
- Detailed progress (per-file, speed, ETA)
- Log viewer UI
- Exclude patterns UI

### v1.3 (Future)
- Multiple backup profiles
- Restore functionality
- Cloud backup destinations
- Compression options

---

## Time Optimization Summary

**Original Estimate** (unfocused cross-platform): 145-150 hours  
**Optimized Estimate** (smart scoping): 130 hours  
**Time Saved**: ~15 hours

### How We Saved Time:
1. **ALL-only quit mode** (-2 hours): Simpler than implementing both ANY and ALL modes
2. **Basic verification** (-8 hours): Advanced checksums deferred to v1.2
3. **Minimal first run** (-3 hours): No wizard, just basic setup
4. **Sprint reorganization** (-2 hours): Better flow reduces context switching

These optimizations don't sacrifice quality - they focus the MVP on what's truly essential for your Lightroom workflow!

---

## Risk Mitigation Updates

1. **Manual Trigger in Sprint 2**: Allows early testing of backup engine, reducing risk of late-stage issues
2. **Critical Triggers First**: App quit and volume mount (Sprint 4) before nice-to-have periodic trigger (Sprint 6)
3. **Platform Abstraction**: Sprint 1 setup pays dividends in Sprint 10 Windows port
4. **Buffer Time**: Sprints 7 and 8 provide cushion for unexpected issues

---

**Status**: ✅ Roadmap finalized and optimized - Ready to begin Sprint 1
