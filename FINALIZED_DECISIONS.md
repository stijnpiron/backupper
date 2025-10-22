# Backupper - Finalized Requirements & Decisions

**Date**: October 22, 2025  
**Status**: ✅ All questions answered - Ready for implementation

---

## Executive Summary

All requirements have been finalized through interactive discussion. Manual backup elevated to Priority 1, basic verification for MVP, incremental checksums in v1.2+. Timeline adjusted to ~130 hours for macOS MVP.

---

## Feature Priority Matrix

### ⭐ Priority 1 - Must Have (MVP Blockers)

1. **Incremental backups with hardlinks** - APFS/HFS+ support
2. **Volume mount detection** - Critical for external SSD workflow
3. **App quit detection (ALL mode)** - Backup when ALL monitored apps quit
4. **Manual backup trigger** ⬆️ **ELEVATED FROM P2** - Essential for testing
5. **Retention management** - Keep last N backups, keep for X days
6. **Basic progress feedback** - File count, current operation
7. **System notifications** - Backup start, complete, error
8. **Launch at login** - Auto-start capability
9. **Basic backup verification** - File count check, completion status

### Priority 2 - Should Have (Post-MVP, Sprint 6)

1. **Periodic/scheduled backup trigger** - Hourly, daily, weekly

### Priority 3 - Nice to Have (Future Versions)

1. **Detailed progress** - Per-file progress, speed, ETA
2. **Log viewer UI** - View detailed backup logs
3. **Exclude patterns UI** - Exclude files/folders

### Deferred Features

- **ANY quit mode** → v1.2+
- **Advanced checksum verification (incremental)** → v1.2+
- **Multiple backup profiles** → v1.3+
- **Restore functionality** → v1.3+

---

## Technical Decisions

### Q1.1 - Development Order
**Answer**: Sequential (Option A)
- Start with macOS MVP
- Structure code with platform abstraction from day 1
- Windows port in v1.1

### Q1.2 - MVP Platform Scope
**Answer**: Single Platform MVP (Option A)
- v1.0 = macOS only
- v1.1 = Windows port (+20 hours)

### Q2.1 - Manual Backup Priority
**Answer**: Priority 1 (Must Have)
- Originally rated Priority 2
- **Clarification**: Essential for testing during development
- Foundational for user control
- Simple to implement but critical

### Q2.2 - Backup Verification Level
**Answer**: 
- **MVP (v1.0)**: Option A - Basic verification
  - Verify backup completed successfully
  - Check file count matches between source/destination
  - Confirm destination integrity
- **Future (v1.2+)**: Option C - Incremental checksum verification
  - First backup: Calculate and verify checksums for ALL files
  - Subsequent backups: Only verify checksums for changed/new files
  - Balances thoroughness with performance

### Q3.1 - App Quit Mode
**Answer**: ALL mode for MVP
- User's use case: Single app (Lightroom Classic)
- ALL mode simpler to implement
- ANY mode deferred to v1.2+
- **Time saved**: ~2 hours

### Q4.1 - Hardlink Fallback
**Answer**: Option C
- Detect if filesystem supports hardlinks
- Show dialog if not supported
- Let user decide: proceed with full copies or cancel
- Remember choice per destination

### Q5.1 - Windows Admin Elevation
**Answer**: Option B
- Start without admin by default
- Elevate only when needed
- Show dialog explaining why
- Handle user denial gracefully

### Q6.1 - First Run Experience
**Answer**: Minimal for MVP
- Basic setup screen
- No wizard (can add in v1.2+)
- **Time saved**: ~3 hours

### Q7.1 - Backup Cancellation
**Answer**: Yes, mark as failed and cleanup
- Allow cancellation during backup
- Mark as "Failed" in history
- Clean up partial destination
- Log cancellation with timestamp

### Q8.1 - Partial Backup Failures
**Answer**: Option B
- Keep partial backup (don't delete)
- Mark as "Partial" in history
- Add missed files to next backup automatically
- Log which files failed and why

---

## Timeline Updates

### Time Estimates
- **macOS MVP (v1.0)**: ~130 hours (reduced from 145)
- **Windows Port (v1.1)**: +20 hours
- **Total**: ~150 hours

### Time Savings Achieved
- ALL-only quit mode: -2 hours
- Basic verification only: -8 hours  
- Minimal first run: -3 hours
- **Total saved**: ~13 hours

### Sprint Reorganization

**Sprint 2: Core Backup Engine + Manual Trigger** (28 hours)
- Incremental backups with hardlinks (20h)
- **Manual backup trigger (8h)** ⬅️ MOVED FROM SPRINT 4
- Allows immediate testing of backup engine

**Sprint 4: Critical Triggers** (30 hours)
- App quit detection - ALL mode (15h)
- Volume mount detection (15h)
- **Deferred**: Periodic trigger → Sprint 6

**Sprint 6: System Integration + Periodic Trigger** (26 hours)
- Notifications, launch at login
- **Periodic backup trigger** ⬅️ MOVED FROM SPRINT 4
- Priority 2 feature, not blocking MVP

---

## Updated Sprint Breakdown

1. **Sprint 1** (8h): Foundation & Setup with platform abstraction
2. **Sprint 2** (28h): Backup Engine + Manual Trigger
3. **Sprint 3** (16h): UI & Configuration
4. **Sprint 4** (30h): App Quit + Volume Mount Triggers
5. **Sprint 5** (26h): Retention + Basic Progress
6. **Sprint 6** (26h): Notifications + Launch at Login + Periodic Trigger
7. **Sprint 7** (15h): Error Handling (cancellation, partial failures, fallback)
8. **Sprint 8** (18h): Testing & Lightroom workflow validation
9. **Sprint 9** (12h): Documentation & macOS Release (v1.0)
10. **Sprint 10** (20h): Windows Port (v1.1)

---

## Platform Abstraction Architecture

```rust
// Core trait for platform-specific operations
trait PlatformBackend {
    fn monitor_app_quit(&self, apps: Vec<PathBuf>, mode: QuitMode) -> Result<()>;
    fn monitor_volume_mount(&self, volume_id: &str) -> Result<()>;
    fn create_hardlink(&self, src: &Path, dst: &Path) -> Result<()>;
    fn supports_hardlinks(&self, path: &Path) -> bool;
    fn show_notification(&self, title: &str, body: &str) -> Result<()>;
}

// macOS implementation (v1.0)
#[cfg(target_os = "macos")]
impl PlatformBackend for MacOSBackend {
    // NSWorkspace for app monitoring
    // DiskArbitration for volume monitoring
    // APFS/HFS+ hardlinks
    // macOS Notification Center
}

// Windows implementation (v1.1)
#[cfg(target_os = "windows")]
impl PlatformBackend for WindowsBackend {
    // WMI Win32_Process for app monitoring
    // WMI Win32_Volume for volume monitoring
    // NTFS/ReFS hardlinks
    // Windows Toast Notifications
}
```

---

## Use Case Validation: Lightroom Classic Workflow

**User's Primary Workflow**:
1. Photography files on external SSD
2. Work in Lightroom Classic
3. **Triggers**:
   - SSD mount → automatic backup
   - Lightroom quits (ALL sessions closed) → automatic backup
   - Manual backup button → on-demand backup
4. Old backups auto-cleaned per retention policy

**Why Priority Decisions Matter**:
- ✅ Volume mount = P1 (external SSD critical)
- ✅ App quit (ALL mode) = P1 (matches single-app workflow)
- ✅ Manual backup = P1 (testing + ad-hoc needs)
- ✅ Notifications = P1 (visibility into backup status)

---

## MVP Success Criteria (v1.0)

### Must Have (All Priority 1)
✅ macOS 11+ support  
✅ Incremental backups with hardlinks (APFS/HFS+)  
✅ Manual backup trigger  
✅ App quit detection (ALL mode)  
✅ Volume mount detection  
✅ Basic progress (file count, current file)  
✅ System notifications  
✅ Retention management  
✅ Launch at login  
✅ Basic verification (file count check)  
✅ Error handling (cancellation, partial failures, hardlink fallback)  
✅ System tray integration  
✅ Settings persistence  
✅ Background operation  

### Not in MVP
❌ Windows support (v1.1)  
❌ ANY quit mode (v1.2)  
❌ Periodic/scheduled backups (Sprint 6, but P2)  
❌ Advanced checksums (v1.2)  
❌ Detailed progress with ETA (v1.2)  
❌ Log viewer UI (v1.2)  
❌ Exclude patterns UI (v1.2)  
❌ Multiple profiles (v1.3)  
❌ Restore functionality (v1.3)  

---

## Next Steps

1. ✅ **All questions answered** - Requirements finalized
2. **Update documentation files**:
   - ✅ REFINEMENT_QUESTIONS.md - Marked as complete
   - [ ] USER_STORIES.md - Adjust priorities, move Manual trigger to Sprint 2
   - [ ] ROADMAP.md - Update sprint breakdown
   - [ ] CHECKLIST.md - Add priority markers
   - [ ] ARCHITECTURE.md - Finalize platform abstraction
3. **Begin Sprint 1**: Initialize Tauri with platform abstraction structure
4. **Target**: macOS MVP in ~18 weeks

---

## Question Resolution Log

| Question | Answer | Impact |
|----------|--------|--------|
| Q1.1 Development Order | Sequential (macOS first) | Platform abstraction layer required |
| Q1.2 MVP Platform | macOS only | Windows deferred to v1.1 |
| Q2.1 Manual Backup Priority | P1 (elevated from P2) | Moved to Sprint 2, critical for testing |
| Q2.2 Verification Level | Basic (MVP), Incremental (v1.2) | -8 hours saved in MVP |
| Q3.1 App Quit Mode | ALL only (MVP) | -2 hours saved, ANY deferred |
| Q4.1 Hardlink Fallback | Inform user, let decide | User control maintained |
| Q5.1 Windows Admin | Elevate when needed | Better UX, security balance |
| Q6.1 First Run | Minimal (no wizard) | -3 hours saved |
| Q7.1 Cancellation | Yes, mark failed | Enhanced UX |
| Q8.1 Partial Failures | Keep, add missed to next | Robust recovery |

---

**Status**: ✅ **FINALIZED - Ready to begin development**

All requirements clarified, priorities set, technical decisions made, timeline optimized. Sprint 1 can begin immediately.
