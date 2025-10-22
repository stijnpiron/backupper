# Backupper - User Stories & Tasks

## Epic 1: Project Setup & Foundation

### User Story 1.1: As a developer, I want to set up the Tauri project structure

**Priority**: P0 (Must Have)
**Estimate**: 2 hours

**Acceptance Criteria**:

- Tauri v2 project initialized
- TypeScript configured
- React with Vite set up
- Basic project structure created
- Development environment runs successfully

**Tasks**:

- [ ] 1.1.1: Initialize Tauri v2 project with TypeScript template
- [ ] 1.1.2: Configure Tauri permissions in capabilities
- [ ] 1.1.3: Set up React with TypeScript and Vite
- [ ] 1.1.4: Configure Tailwind CSS
- [ ] 1.1.5: Create basic folder structure (components, hooks, utils, types)
- [ ] 1.1.6: Set up ESLint and Prettier
- [ ] 1.1.7: Test dev server and Tauri dev mode

**Technical Notes**:

- Use `npm create tauri-app@latest`
- Configure for macOS as primary target
- Set up proper TypeScript paths

---

### User Story 1.2: As a user, I want the app to appear in the menu bar

**Priority**: P0 (Must Have)
**Estimate**: 4 hours

**Acceptance Criteria**:

- Application icon appears in macOS menu bar
- Clicking icon shows dropdown menu
- Menu includes basic options (Settings, Quit)
- No dock icon appears (menu bar only)
- Icon changes based on basic states (idle, active)

**Tasks**:

- [ ] 1.2.1: Configure Tauri for menu bar app (no main window)
- [ ] 1.2.2: Create system tray in Rust backend
- [ ] 1.2.3: Design and add menu bar icons (idle, active, success, error)
- [ ] 1.2.4: Implement menu structure
- [ ] 1.2.5: Connect menu items to frontend events
- [ ] 1.2.6: Test menu bar behavior on macOS

**Technical Notes**:

- Use Tauri's tray API
- Disable main window in tauri.conf.json
- Icon formats: .icns for macOS

---

### User Story 1.3: As a developer, I want a settings storage system

**Priority**: P0 (Must Have)
**Estimate**: 3 hours

**Acceptance Criteria**:

- Settings persist between app restarts
- Settings stored securely on filesystem
- TypeScript types defined for all settings
- Default settings applied on first run
- Settings validation implemented

**Tasks**:

- [ ] 1.3.1: Define TypeScript settings interface
- [ ] 1.3.2: Create Rust settings struct with serde
- [ ] 1.3.3: Implement settings file I/O in Rust
- [ ] 1.3.4: Create Tauri commands for settings CRUD
- [ ] 1.3.5: Implement frontend settings store (Zustand)
- [ ] 1.3.6: Add settings validation logic
- [ ] 1.3.7: Create default settings configuration

**Technical Notes**:

- Store in `~/Library/Application Support/Backupper/settings.json`
- Use Tauri's fs plugin
- Validate on both frontend and backend

---

## Epic 2: User Interface

### User Story 2.1: As a user, I want to access settings through a window

**Priority**: P0 (Must Have)
**Estimate**: 6 hours

**Acceptance Criteria**:

- Settings window opens from menu bar
- Window is properly sized and centered
- Tabs for different setting categories
- Settings load current values
- Changes save immediately
- Window can be closed and reopened

**Tasks**:

- [ ] 2.1.1: Create Settings window component structure
- [ ] 2.1.2: Implement tab navigation (General, Source/Target, Triggers, Advanced)
- [ ] 2.1.3: Add window management (open/close/focus)
- [ ] 2.1.4: Style settings window with Tailwind
- [ ] 2.1.5: Connect to settings store
- [ ] 2.1.6: Implement auto-save on changes

**Technical Notes**:

- Window size: ~700x500px
- Use Tauri window API
- Prevent multiple instances

---

### User Story 2.2: As a user, I want to configure general settings

**Priority**: P0 (Must Have)
**Estimate**: 3 hours

**Acceptance Criteria**:

- Toggle "Launch at login"
- Set backup name prefix
- Set number of backups to keep
- All fields validate input
- Changes reflect immediately

**Tasks**:

- [ ] 2.2.1: Create General settings tab UI
- [ ] 2.2.2: Implement "Launch at login" toggle with validation
- [ ] 2.2.3: Add backup prefix input field
- [ ] 2.2.4: Add retention count input (min: 1, max: 999)
- [ ] 2.2.5: Connect form fields to settings store
- [ ] 2.2.6: Add input validation and error messages

---

### User Story 2.3: As a user, I want to select source and target folders

**Priority**: P0 (Must Have)
**Estimate**: 4 hours

**Acceptance Criteria**:

- Folder picker for source location
- Folder picker for target location
- Display selected paths clearly
- Show volume information for source
- Validate selections (must exist, be accessible)
- Warn if insufficient space on target

**Tasks**:

- [ ] 2.3.1: Create Source & Target tab UI
- [ ] 2.3.2: Implement folder picker dialog (Tauri dialog API)
- [ ] 2.3.3: Add Rust command to get volume info
- [ ] 2.3.4: Display volume details (name, type, space available)
- [ ] 2.3.5: Add path validation logic
- [ ] 2.3.6: Implement disk space check
- [ ] 2.3.7: Show warnings/errors for invalid selections

---

### User Story 2.4: As a user, I want to configure backup triggers

**Priority**: P1 (Should Have)
**Estimate**: 5 hours

**Acceptance Criteria**:

- Enable/disable volume mount trigger
- Enable/disable periodic backup with interval
- Select applications to monitor
- Choose monitoring mode (ANY/ALL)
- See list of installed applications
- Save trigger configuration

**Tasks**:

- [ ] 2.4.1: Create Triggers tab UI
- [ ] 2.4.2: Add volume mount trigger toggle
- [ ] 2.4.3: Add periodic backup toggle and interval selector
- [ ] 2.4.4: Create Rust command to list installed applications
- [ ] 2.4.5: Implement application selection list with search
- [ ] 2.4.6: Add monitoring mode radio buttons
- [ ] 2.4.7: Connect all fields to settings store

**Technical Notes**:

- List apps from /Applications and ~/Applications
- Cache app list for performance
- Include app icons if possible

---

### User Story 2.5: As a user, I want to see backup progress

**Priority**: P1 (Should Have)
**Estimate**: 4 hours

**Acceptance Criteria**:

- Progress visible in menu bar dropdown
- Shows current operation phase
- Shows files processed / total
- Shows data transferred / total
- Shows estimated time remaining
- Updates in real-time

**Tasks**:

- [ ] 2.5.1: Design progress UI component
- [ ] 2.5.2: Create progress state management
- [ ] 2.5.3: Implement Tauri events for progress updates
- [ ] 2.5.4: Add progress calculation logic in Rust
- [ ] 2.5.5: Update menu bar icon during backup
- [ ] 2.5.6: Add progress bar and statistics display
- [ ] 2.5.7: Format file sizes and time estimates

---

### User Story 2.6: As a user, I want to view backup logs and history

**Priority**: P2 (Nice to Have)
**Estimate**: 4 hours

**Acceptance Criteria**:

- Log viewer accessible from menu
- Shows recent backup history
- Displays detailed log entries
- Filterable by date and type
- Scrollable for long logs
- Export logs option

**Tasks**:

- [ ] 2.6.1: Create log viewer window component
- [ ] 2.6.2: Implement log reading from file
- [ ] 2.6.3: Add log entry formatting and display
- [ ] 2.6.4: Implement filtering and search
- [ ] 2.6.5: Add backup history summary view
- [ ] 2.6.6: Create export functionality
- [ ] 2.6.7: Style log viewer

---

## Epic 3: Backup Engine Core

### User Story 3.1: As a developer, I want a file system scanner

**Priority**: P0 (Must Have)
**Estimate**: 5 hours

**Acceptance Criteria**:

- Scans source directory recursively
- Collects file metadata (path, size, modified time)
- Handles permissions errors gracefully
- Excludes patterns if configured
- Performant for large directories (100k+ files)
- Reports progress during scan

**Tasks**:

- [ ] 3.1.1: Create Rust file scanner module
- [ ] 3.1.2: Implement recursive directory traversal
- [ ] 3.1.3: Collect file metadata (stat)
- [ ] 3.1.4: Add exclude pattern matching
- [ ] 3.1.5: Implement error handling for inaccessible files
- [ ] 3.1.6: Add progress reporting
- [ ] 3.1.7: Optimize for performance (parallel scanning)

**Technical Notes**:

- Use walkdir or jwalk crate
- Consider using rayon for parallelization
- Handle symlinks appropriately

---

### User Story 3.2: As a user, I want manual backup to work

**Priority**: P0 (Must Have)
**Estimate**: 6 hours

**Acceptance Criteria**:

- "Backup Now" option in menu
- Validates settings before starting
- Performs full file copy (no hardlinks yet)
- Creates timestamped backup folder
- Shows progress
- Notifies on completion/failure
- Prevents concurrent backups

**Tasks**:

- [ ] 3.2.1: Add "Backup Now" menu item
- [ ] 3.2.2: Create backup orchestration module in Rust
- [ ] 3.2.3: Implement settings validation
- [ ] 3.2.4: Create backup folder with timestamp
- [ ] 3.2.5: Implement basic file copy operation
- [ ] 3.2.6: Add concurrent backup prevention (mutex/lock)
- [ ] 3.2.7: Integrate progress reporting
- [ ] 3.2.8: Add completion notification

**Technical Notes**:

- Use std::fs::copy for now
- Create lock file to prevent concurrent runs

---

### User Story 3.3: As a user, I want incremental backups with hardlinks

**Priority**: P0 (Must Have)
**Estimate**: 8 hours

**Acceptance Criteria**:

- Compares source with last successful backup
- Identifies changed/new/deleted files
- Creates hardlinks for unchanged files
- Copies only changed files
- New backup shows complete file tree
- Significantly reduces disk usage
- Works correctly on APFS/HFS+

**Tasks**:

- [ ] 3.3.1: Implement file comparison logic (mtime, size)
- [ ] 3.3.2: Add hardlink creation in Rust (std::fs::hard_link)
- [ ] 3.3.3: Create backup snapshot structure
- [ ] 3.3.4: Implement incremental copy algorithm
- [ ] 3.3.5: Handle file deletions (not in new backup)
- [ ] 3.3.6: Add filesystem detection
- [ ] 3.3.7: Test hardlink creation and verification
- [ ] 3.3.8: Add fallback for filesystems without hardlink support

**Technical Notes**:

- Check filesystem type before using hardlinks
- Preserve file metadata (permissions, timestamps)
- Test on various filesystems

---

### User Story 3.4: As a user, I want backup state tracking

**Priority**: P0 (Must Have)
**Estimate**: 4 hours

**Acceptance Criteria**:

- System tracks last successful backup
- Failed backups are marked and not used as baseline
- Backup metadata saved (time, files, size, status)
- Next backup resumes from last successful
- Interrupted backups cleaned up

**Tasks**:

- [ ] 3.4.1: Create backup metadata structure
- [ ] 3.4.2: Implement metadata file storage (.backup_meta.json)
- [ ] 3.4.3: Track backup status (in_progress, success, failed)
- [ ] 3.4.4: Update metadata at backup milestones
- [ ] 3.4.5: Implement cleanup for failed backups
- [ ] 3.4.6: Add recovery logic for interrupted backups
- [ ] 3.4.7: Create function to find last successful backup

**Technical Notes**:

- Store metadata in each backup folder
- Add atomic write for metadata updates

---

### User Story 3.5: As a user, I want automatic retention management

**Priority**: P1 (Should Have)
**Estimate**: 3 hours

**Acceptance Criteria**:

- Old backups deleted when limit reached
- Deletion occurs after successful new backup
- Hardlinks cleaned up properly
- Only successful backups count toward limit
- Failed backups can be cleaned up separately

**Tasks**:

- [ ] 3.5.1: Create backup enumeration function
- [ ] 3.5.2: Implement backup sorting by timestamp
- [ ] 3.5.3: Add retention limit check
- [ ] 3.5.4: Implement safe backup deletion
- [ ] 3.5.5: Test hardlink cleanup
- [ ] 3.5.6: Add logging for retention actions
- [ ] 3.5.7: Handle edge cases (permission errors, in-use files)

---

## Epic 4: Backup Triggers

### User Story 4.1: As a user, I want backups triggered on volume mount

**Priority**: P1 (Should Have)
**Estimate**: 6 hours

**Acceptance Criteria**:

- Detects when volumes are mounted
- Identifies if source folder is on mounted volume
- Triggers backup automatically
- Works across volume remounts
- Handles multiple volumes correctly
- Respects trigger enable/disable setting

**Tasks**:

- [ ] 4.1.1: Research macOS volume monitoring APIs (DiskArbitration)
- [ ] 4.1.2: Create Rust volume monitor using system APIs
- [ ] 4.1.3: Implement volume UUID detection
- [ ] 4.1.4: Map source folder to volume
- [ ] 4.1.5: Add mount event handler
- [ ] 4.1.6: Trigger backup on matching volume mount
- [ ] 4.1.7: Add debouncing for repeated mounts
- [ ] 4.1.8: Test with external drives

**Technical Notes**:

- Use core-foundation or block crates for macOS APIs
- May need custom bindings to DiskArbitration framework
- Test with USB drives, SD cards, etc.

---

### User Story 4.2: Periodic Backup Trigger - PRIORITY 2 - SHOULD HAVE

**As a user**, I want backups to run on a schedule so that my data is backed up regularly.

**Acceptance Criteria**:

- Configure backup schedule (hourly, daily, weekly)
- Backup runs automatically at scheduled times
- Skip backup if source/destination unavailable with notification
- Work reliably in background

**Tasks**:

- [ ] 4.2.1 - Design schedule configuration UI (interval picker) (2 hours)
- [ ] 4.2.2 - Implement scheduling logic in Rust (using tokio interval) (4 hours)
- [ ] 4.2.3 - Add schedule settings to configuration (2 hours)
- [ ] 4.2.4 - Wire up scheduler to backup trigger (2 hours)
- [ ] 4.2.5 - Test various schedules (hourly, daily) (2 hours)

**Time Estimate**: 12 hours

**MOVED TO SPRINT 6** (deferred for MVP focus)

---

### User Story 4.3: As a user, I want backups triggered on application quit

**Priority**: P1 (Should Have)
**Estimate**: 6 hours

**Acceptance Criteria**:

- Monitors specified applications
- Detects when monitored app quits
- Supports "ANY quit" mode
- Supports "ALL quit" mode
- Triggers backup based on mode
- Handles app crashes
- Works even if app closed from Activity Monitor

**Tasks**:

- [ ] 4.3.1: Research macOS process monitoring (NSWorkspace, sysctl)
- [ ] 4.3.2: Create Rust process monitor
- [ ] 4.3.3: Implement app launch/quit detection
- [ ] 4.3.4: Track monitored app states
- [ ] 4.3.5: Implement "ANY quit" logic
- [ ] 4.3.6: Implement "ALL quit" logic
- [ ] 4.3.7: Trigger backup based on mode
- [ ] 4.3.8: Test with various applications

**Technical Notes**:

- May need Accessibility permissions
- Use NSRunningApplication equivalent in Rust
- Consider using sysctl or kqueue for process events

---

## Epic 5: System Integration

### User Story 5.1: As a user, I want the app to launch at login

**Priority**: P1 (Should Have)
**Estimate**: 3 hours

**Acceptance Criteria**:

- Toggle in settings enables/disables launch at login
- App starts minimized to menu bar
- Works after system reboot
- Compatible with macOS 11+
- No additional prompts needed

**Tasks**:

- [ ] 5.1.1: Research macOS launch at login APIs (SMAppService)
- [ ] 5.1.2: Create Rust command to register launch agent
- [ ] 5.1.3: Create Rust command to unregister launch agent
- [ ] 5.1.4: Connect toggle in UI to Rust commands
- [ ] 5.1.5: Test registration persistence
- [ ] 5.1.6: Handle permission requests gracefully
- [ ] 5.1.7: Test on different macOS versions

**Technical Notes**:

- Use tauri-plugin-autostart or implement directly
- Prefer SMAppService (modern) over LaunchAgents

---

### User Story 5.2: As a user, I want notifications for backup events

**Priority**: P1 (Should Have)
**Estimate**: 3 hours

**Acceptance Criteria**:

- Notification on backup start
- Notification on backup success
- Notification on backup failure
- Notifications show relevant info (time, file count)
- Can be enabled/disabled in settings
- Follow macOS notification guidelines

**Tasks**:

- [ ] 5.2.1: Set up Tauri notification permissions
- [ ] 5.2.2: Create notification helper module
- [ ] 5.2.3: Implement start notification
- [ ] 5.2.4: Implement success notification with summary
- [ ] 5.2.5: Implement failure notification with error
- [ ] 5.2.6: Add notification enable/disable setting
- [ ] 5.2.7: Test notification display and interactions

**Technical Notes**:

- Use tauri-plugin-notification
- Include app icon in notifications

---

### User Story 5.3: As a developer, I want comprehensive logging

**Priority**: P1 (Should Have)
**Estimate**: 4 hours

**Acceptance Criteria**:

- All backup operations logged
- Log includes timestamps and details
- Log levels (info, warn, error)
- Logs written to file
- Log rotation implemented
- Logs help troubleshooting

**Tasks**:

- [ ] 5.3.1: Set up logging framework (tracing or log crate)
- [ ] 5.3.2: Configure log file location
- [ ] 5.3.3: Implement log rotation (by size or time)
- [ ] 5.3.4: Add logging throughout backup operations
- [ ] 5.3.5: Add logging for triggers and events
- [ ] 5.3.6: Add logging for errors and warnings
- [ ] 5.3.7: Test log output and rotation

**Technical Notes**:

- Log to `~/Library/Logs/Backupper/`
- Use tracing-appender for rotation
- Keep last 10 log files or 50MB total

---

### User Story 5.4: As a user, I want proper permission handling

**Priority**: P0 (Must Have)
**Estimate**: 3 hours

**Acceptance Criteria**:

- App detects missing permissions
- Guides user to grant permissions
- Shows status of required permissions
- Graceful degradation if permissions denied
- Clear messaging about why permissions needed

**Tasks**:

- [ ] 5.4.1: Identify all required macOS permissions
- [ ] 5.4.2: Create permission check functions
- [ ] 5.4.3: Implement permission request flow
- [ ] 5.4.4: Add permission status UI
- [ ] 5.4.5: Create guidance for granting permissions
- [ ] 5.4.6: Handle permission denial gracefully
- [ ] 5.4.7: Test permission flows

**Technical Notes**:

- Full Disk Access required for backups
- Accessibility for app monitoring
- Notifications permission

---

## Epic 6: Polish & Testing

### User Story 6.1: As a user, I want a smooth first-run experience

**Priority**: P1 (Should Have)
**Estimate**: 4 hours

**Acceptance Criteria**:

- Welcome screen on first launch
- Guided setup wizard
- Permission requests explained
- Basic configuration collected
- Can skip and configure later
- Clear call-to-action

**Tasks**:

- [ ] 6.1.1: Design welcome/onboarding flow
- [ ] 6.1.2: Create welcome screen component
- [ ] 6.1.3: Create setup wizard steps
- [ ] 6.1.4: Implement first-run detection
- [ ] 6.1.5: Add skip/continue navigation
- [ ] 6.1.6: Set default configuration
- [ ] 6.1.7: Test first-run experience

---

### User Story 6.2: As a developer, I want comprehensive error handling

**Priority**: P0 (Must Have)
**Estimate**: 5 hours

**Acceptance Criteria**:

- All errors caught and logged
- User-friendly error messages
- Recovery suggestions provided
- App doesn't crash on errors
- Errors reported in UI appropriately

**Tasks**:

- [ ] 6.2.1: Define error types and categories
- [ ] 6.2.2: Implement error handling in Rust
- [ ] 6.2.3: Create error display components in UI
- [ ] 6.2.4: Add error recovery logic
- [ ] 6.2.5: Test error scenarios
- [ ] 6.2.6: Add user-friendly error messages
- [ ] 6.2.7: Implement error reporting/logging

---

### User Story 6.3: As a developer, I want unit and integration tests

**Priority**: P1 (Should Have)
**Estimate**: 8 hours

**Acceptance Criteria**:

- Core backup logic tested
- File operations tested
- Settings persistence tested
- Hardlink creation tested
- Edge cases covered
- CI/CD integration possible

**Tasks**:

- [ ] 6.3.1: Set up test framework (Rust: cargo test)
- [ ] 6.3.2: Write tests for file scanner
- [ ] 6.3.3: Write tests for incremental backup logic
- [ ] 6.3.4: Write tests for hardlink operations
- [ ] 6.3.5: Write tests for settings management
- [ ] 6.3.6: Write tests for retention logic
- [ ] 6.3.7: Create test fixtures and mock data
- [ ] 6.3.8: Run tests in CI environment

---

### User Story 6.4: As a user, I want performance optimization

**Priority**: P2 (Nice to Have)
**Estimate**: 6 hours

**Acceptance Criteria**:

- Large directory scans are fast
- Backup operations efficient
- UI remains responsive
- Memory usage reasonable
- CPU usage appropriate
- Battery impact minimal

**Tasks**:

- [ ] 6.4.1: Profile file scanning performance
- [ ] 6.4.2: Optimize directory traversal
- [ ] 6.4.3: Implement parallel file operations
- [ ] 6.4.4: Add throttling for CPU-intensive tasks
- [ ] 6.4.5: Optimize UI rendering
- [ ] 6.4.6: Test with large datasets (1M+ files)
- [ ] 6.4.7: Measure and optimize memory usage

---

### User Story 6.5: As a user, I want the app to be distributable

**Priority**: P1 (Should Have)
**Estimate**: 4 hours

**Acceptance Criteria**:

- App can be built as .dmg for macOS
- App is properly signed (if possible)
- Updater mechanism in place
- Version tracking
- Release notes format

**Tasks**:

- [ ] 6.5.1: Configure Tauri bundler for macOS
- [ ] 6.5.2: Create app icon and assets
- [ ] 6.5.3: Set up code signing (if applicable)
- [ ] 6.5.4: Configure tauri-plugin-updater
- [ ] 6.5.5: Test .dmg installation
- [ ] 6.5.6: Create release build script
- [ ] 6.5.7: Document build process

---

## Summary

**Total User Stories**: 27
**Total Tasks**: 185
**Estimated Effort**: ~120 hours

### Priority Breakdown:

- **P0 (Must Have)**: 15 stories, ~65 hours
- **P1 (Should Have)**: 10 stories, ~47 hours
- **P2 (Nice to Have)**: 2 stories, ~10 hours

### Recommended Development Order:

1. **Sprint 1** (Epic 1): Foundation - ~9 hours
2. **Sprint 2** (Epic 2, Stories 2.1-2.3): Basic UI - ~13 hours
3. **Sprint 3** (Epic 3, Stories 3.1-3.2): Basic Backup - ~11 hours
4. **Sprint 4** (Epic 3, Stories 3.3-3.5): Incremental Backup - ~15 hours
5. **Sprint 5** (Epic 2, Stories 2.4-2.5): Advanced UI - ~9 hours
6. **Sprint 6** (Epic 4): Triggers - ~16 hours
7. **Sprint 7** (Epic 5): System Integration - ~13 hours
8. **Sprint 8** (Epic 6): Polish & Testing - ~23 hours
9. **Sprint 9** (Epic 2, Story 2.6): Logging UI - ~4 hours

Each sprint represents roughly 1-2 weeks of development time for a single developer.

---

## ⭐ UPDATED: Feature Priority Matrix (Oct 22, 2025)

### Priority 1 - Must Have (MVP Blockers)
1. **Incremental backups with hardlinks** (Epic 3, Story 3.1)
2. **Volume mount detection** (Epic 4, Story 4.3)
3. **App quit detection (ALL mode)** (Epic 4, Story 4.1)
4. **Manual backup trigger** ⬆️ **ELEVATED TO P1** (Epic 3, Story 3.2)
5. **Retention management** (Epic 3, Story 3.4)
6. **Basic progress feedback** (Epic 2, Story 2.5)
7. **System notifications** (Epic 5, Story 5.1)
8. **Launch at login** (Epic 5, Story 5.2)
9. **Basic backup verification** (Epic 3, Story 3.2)

### Priority 2 - Should Have (Post-MVP)
1. **Periodic backup trigger** (Epic 4, Story 4.2) - Moved to Sprint 6

### Priority 3 - Nice to Have (Future Versions)
1. **Detailed progress** (per-file, ETA)
2. **Log viewer UI** (Epic 2, Story 2.6)
3. **Exclude patterns UI**

### Deferred Features
- **ANY quit mode** → v1.2+
- **Advanced checksum verification (incremental)** → v1.2+
- **Multiple backup profiles** → v1.3+
- **Restore functionality** → v1.3+

---

## ⭐ UPDATED: Revised Sprint Breakdown

### Sprint 1: Foundation & Platform Abstraction (~8 hours)
- Epic 1, Stories 1.1-1.3
- Set up Tauri with platform abstraction structure

### Sprint 2: Backup Engine + Manual Trigger (~28 hours) ⭐ UPDATED
- Epic 3, Story 3.1: Incremental Backup (20h)
- **Epic 3, Story 3.2: Manual Backup Trigger (8h)** ⬅️ MOVED FROM SPRINT 4
- Allows immediate testing of backup engine!

### Sprint 3: UI & Configuration (~16 hours)
- Epic 2, Stories 2.1-2.3
- Settings window and configuration

### Sprint 4: Critical Triggers (~30 hours) ⭐ UPDATED
- Epic 4, Story 4.1: App Quit Detection - ALL mode (15h)
- Epic 4, Story 4.3: Volume Mount Detection (15h)
- **Removed: Story 4.2 Periodic Trigger** (moved to Sprint 6)

### Sprint 5: Advanced Features (~26 hours)
- Epic 3, Story 3.4: Retention Management (18h)
- Epic 2, Story 2.5: Progress Feedback (8h)

### Sprint 6: System Integration + Periodic Trigger (~26 hours) ⭐ UPDATED
- Epic 5, Story 5.1: System Notifications (5h)
- Epic 5, Story 5.2: Launch at Login (6h)
- Epic 2, Story 2.4: Backup History (3h)
- **Epic 4, Story 4.2: Periodic Backup Trigger (12h)** ⬅️ MOVED FROM SPRINT 4

### Sprint 7: Error Handling (~15 hours)
- Epic 3, Stories 3.5, 3.6, 3.7
- Cancellation, partial failures, hardlink fallback

### Sprint 8: Testing (~18 hours)
- Epic 6, Stories 6.1-6.2
- Unit tests, integration tests, Lightroom workflow validation

### Sprint 9: Documentation & Release (~12 hours)
- Epic 6, Stories 6.3-6.5
- macOS MVP Release (v1.0)

### Sprint 10 (Post-MVP): Windows Port (~20 hours)
- Platform-specific Windows implementations
- v1.1 Release

---

## UPDATED: Summary Statistics

**Total User Stories**: 27  
**Total Tasks**: ~195 (adjusted for platform abstraction)  
**Estimated Effort**: ~130 hours (macOS MVP)  
**Windows Port**: +20 hours (v1.1)

### Updated Priority Breakdown:

- **P0 (Must Have)**: 16 stories, ~73 hours
- **P1 (Should Have)**: 9 stories, ~45 hours
- **P2 (Nice to Have)**: 2 stories, ~10 hours

### Time Optimization Achieved:
- ALL-only quit mode: -2 hours
- Basic verification only: -8 hours
- Minimal first run: -3 hours
- **Total saved**: ~13 hours from original cross-platform estimate

---

**Status**: ✅ Requirements finalized - Ready for Sprint 1
