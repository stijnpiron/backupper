# Documentation Updates Needed - Action Items

**Based on finalized decisions from October 22, 2025**

---

## Files to Update

### ✅ 1. REFINEMENT_QUESTIONS.md
**Status**: COMPLETE
- Added finalized decisions summary
- Marked as ready for implementation

### 2. USER_STORIES.md - PRIORITY UPDATES NEEDED

**Changes Required**:

#### Epic 3 - Story 3.2: Manual Backup Trigger
- **Change Priority**: P2 → P0 (Must Have) ⭐
- **Add Note**: "Essential for testing during development"
- **Move to Sprint 2** (currently in Sprint 4)
- **Update estimate**: Keep at 7-8 hours
- **Add task**: Add basic backup verification (file count check) - 1 hour

#### Summary Section (Bottom of file)
- **Update total hours**: ~120 hours → ~130 hours
- **Update P0 stories**: 15 → 16 stories
- **Update P0 hours**: ~65 hours → ~73 hours
- **Add Priority Matrix**:
  ```markdown
  ### Feature Priority Matrix
  
  #### Priority 1 - Must Have (MVP)
  - Incremental backups with hardlinks
  - Volume mount detection
  - App quit detection (ALL mode only)
  - Manual backup trigger ⬆️ (elevated)
  - Retention management
  - Basic progress feedback
  - System notifications
  - Launch at login
  - Basic verification
  
  #### Priority 2 - Should Have
  - Periodic backup trigger (moved to Sprint 6)
  
  #### Priority 3 - Nice to Have
  - Detailed progress
  - Log viewer UI
  - Exclude patterns
  ```

### 3. ROADMAP.md - SPRINT REORGANIZATION NEEDED

**Changes Required**:

#### Sprint 2 (Weeks 3-4)
- **Rename**: "Core Backup Engine" → "Core Backup Engine + Manual Trigger"
- **Add User Story**: 3.2 Manual Backup Trigger (8 hours)
- **Update time**: 20 hours → 28 hours
- **Update deliverables**: Add "Manual backup button" and "Basic verification"

#### Sprint 4 (Weeks 7-8)
- **Rename**: "Backup Triggers" → "Critical Triggers - App Quit & Volume Mount"
- **Remove**: 3.2 Manual Backup Trigger (moved to Sprint 2)
- **Remove**: 4.2 Periodic Backup Trigger (move to Sprint 6)
- **Keep**: 4.1 App Quit (ALL mode only), 4.3 Volume Mount
- **Update time**: 33 hours → 30 hours
- **Add note**: "ALL quit mode only for MVP, ANY mode deferred to v1.2"

#### Sprint 6 (Weeks 11-12)
- **Rename**: "UI Polish" → "System Integration & Periodic Trigger"
- **Add User Story**: 4.2 Periodic Backup Trigger (12 hours)
- **Update stories**: 5.1 Notifications, 5.2 Launch at Login, 2.4 History, 4.2 Periodic
- **Update time**: 23 hours → 26 hours
- **Add note**: "Periodic trigger is Priority 2, not blocking MVP"

#### Timeline Summary Section
- **Update total hours**: 120 → 130
- **Add Windows port**: Sprint 10 (Post-MVP) - 20 hours
- **Update feature roadmap**:
  ```markdown
  ## Post-MVP Roadmap
  
  ### v1.1 (Sprint 10)
  - Windows support (+20 hours)
  - Periodic backups (if not in MVP)
  
  ### v1.2 (Future)
  - ANY quit mode
  - Advanced checksum verification (incremental)
  - Detailed progress (per-file, ETA)
  - Log viewer UI
  
  ### v1.3 (Future)
  - Multiple backup profiles
  - Exclude patterns UI
  - Restore functionality
  ```

### 4. CHECKLIST.md - ADD PRIORITY MARKERS

**Changes Required**:

#### Core Backup Features Section
- Add ⭐ markers for Priority 1 items:
  - ⭐ Incremental backup with hardlinks
  - ⭐ Manual backup trigger
  - ⭐ Basic backup verification
  - ⭐ Backup retention management
  - ⭐ Basic progress tracking

#### Backup Triggers Section
- Reorganize with priority markers:
  ```markdown
  ## Backup Triggers
  
  ### Priority 1 (MVP)
  - [ ] ⭐ Manual trigger
  - [ ] ⭐ Application quit detection (ALL mode)
  - [ ] ⭐ Volume mount detection
  
  ### Priority 2 (Sprint 6)
  - [ ] Periodic/scheduled backups
  
  ### Deferred (v1.2+)
  - [ ] ANY quit mode
  ```

#### System Integration Section
- Add ⭐ markers:
  - ⭐ System tray/menu bar icon
  - ⭐ Launch at login
  - ⭐ System notifications

### 5. ARCHITECTURE.md - PLATFORM ABSTRACTION DETAILS

**Changes Required**:

#### Add Platform Abstraction Section
- Add detailed trait definition:
  ```rust
  /// Platform-specific operations abstraction
  pub trait PlatformBackend: Send + Sync {
      /// Monitor applications for quit events
      /// mode: QuitMode::All (MVP) or QuitMode::Any (v1.2+)
      fn monitor_app_quit(&self, apps: Vec<PathBuf>, mode: QuitMode) -> Result<()>;
      
      /// Monitor volume mount events
      fn monitor_volume_mount(&self, volume_id: &str) -> Result<()>;
      
      /// Create hardlink (platform-specific implementation)
      fn create_hardlink(&self, src: &Path, dst: &Path) -> Result<bool>;
      
      /// Check if filesystem supports hardlinks
      fn supports_hardlinks(&self, path: &Path) -> bool;
      
      /// Show system notification
      fn show_notification(&self, title: &str, body: &str) -> Result<()>;
  }
  ```

#### Update Backup Verification Section
- Add MVP scope:
  ```markdown
  ### Backup Verification
  
  #### MVP (v1.0) - Basic Verification
  - Count files in source
  - Count files in destination
  - Compare counts
  - Verify no errors during backup
  
  #### Future (v1.2+) - Incremental Checksum Verification
  - First backup: SHA-256 for all files
  - Subsequent: Only verify changed files
  - Store checksums in metadata
  ```

### 6. QUICKREF.md - UPDATE QUICK FACTS

**Changes Required**:

- Update timeline: 120 hours → 130 hours
- Update MVP features list with priority markers
- Add note about manual backup being P1
- Update sprint count: 9 sprints (macOS MVP) + Sprint 10 (Windows port)

### 7. PLANNING_SUMMARY.md - UPDATE ESTIMATES

**Changes Required**:

- Update total estimate: 120 → 130 hours
- Add time savings note (-13 hours from simplifications)
- Update feature count with priorities
- Note Sprint 2 reorganization

### 8. README.md - UPDATE FEATURES LIST

**Changes Required**:

- Reorganize features by priority
- Add "⭐ MVP Features" section
- Add "Coming in v1.1" section (Windows, periodic backups)
- Add "Coming in v1.2+" section (ANY mode, advanced verification)

---

## Quick Update Script

You can manually apply these changes, or I can create specific file edits for each one.

**Recommended Order**:
1. ✅ REFINEMENT_QUESTIONS.md (done)
2. USER_STORIES.md (most important - defines work)
3. ROADMAP.md (timeline and sprints)
4. CHECKLIST.md (tracking)
5. ARCHITECTURE.md (technical details)
6. QUICKREF.md, PLANNING_SUMMARY.md, README.md (documentation)

---

## Key Messages to Communicate

1. **Manual backup elevated to P1** - Essential for testing
2. **Sprint 2 now includes manual trigger** - Test backup engine immediately
3. **ALL-only quit mode for MVP** - Simpler, matches use case
4. **Basic verification for MVP** - Advanced checksums in v1.2
5. **Timeline optimized to ~130 hours** - Saved 13 hours through smart decisions
6. **Windows port = v1.1** - macOS MVP first, then port

---

**Status**: Ready to apply updates to remaining documentation files
