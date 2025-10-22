# Backupper - Requirements Documentation

## Project Overview

A cross-platform (macOS and Windows) system tray application for automated incremental backups with hardlinks, triggered by volume mounts and application quit events.

**Technology Stack**: Tauri v2 + TypeScript + React (frontend) + Rust (backend)
**Target Platforms**: macOS 11.0+ (Big Sur), Windows 10/11

---

## 1. Functional Requirements

### 1.1 Core Backup Functionality

#### 1.1.1 Incremental Backup with Hardlinks

- **REQ-BACKUP-001**: System shall perform incremental backups using hardlinks to save disk space
- **REQ-BACKUP-002**: Each backup snapshot shall contain the complete file tree as it existed at that moment
- **REQ-BACKUP-003**: Only files modified since the last successful backup shall be physically copied
- **REQ-BACKUP-004**: Unchanged files shall be hardlinked to the previous backup
- **REQ-BACKUP-005**: System shall track backup success/failure state
- **REQ-BACKUP-006**: Failed/interrupted backups shall be discarded and not count as successful backups
- **REQ-BACKUP-007**: Next backup after a failure shall start from the last successful backup

#### 1.1.2 Backup Naming and Structure

- **REQ-NAMING-001**: Backup folders shall be named with format: `{prefix}_{YYYY-MM-DD}_{HHMMSS}`
- **REQ-NAMING-002**: Prefix shall be user-configurable (default: "backup")
- **REQ-NAMING-003**: Backups shall be stored in chronological order in the target directory
- **REQ-NAMING-004**: System shall maintain metadata about each backup (timestamp, status, file count, size)

#### 1.1.3 Retention Management

- **REQ-RETENTION-001**: User shall be able to set maximum number of backups to retain
- **REQ-RETENTION-002**: When limit is reached, oldest backup shall be automatically deleted
- **REQ-RETENTION-003**: Deletion shall occur after new backup completes successfully
- **REQ-RETENTION-004**: System shall safely handle hardlink deletion to prevent data loss

#### 1.1.4 Source and Target Selection

- **REQ-SOURCE-001**: User shall be able to select any local folder as source
- **REQ-SOURCE-002**: Source can be on internal SSD/HDD or external drive
- **REQ-SOURCE-003**: Network shares shall NOT be supported as source
- **REQ-TARGET-001**: User shall be able to select any local folder as target
- **REQ-TARGET-002**: System shall validate sufficient disk space before backup

### 1.2 Backup Triggers

#### 1.2.1 Volume Mount Detection

- **REQ-MOUNT-001**: System shall detect when external volumes are mounted (macOS: DiskArbitration, Windows: WMI/DeviceChange events)
- **REQ-MOUNT-002**: If source folder is on external drive, backup shall trigger on mount
- **REQ-MOUNT-003**: System shall identify volume by UUID/identifier, not just name (macOS: Volume UUID, Windows: Volume Serial Number)
- **REQ-MOUNT-004**: System shall handle volume remount scenarios
- **REQ-MOUNT-005**: System shall handle platform-specific volume paths (macOS: /Volumes/, Windows: Drive letters)

#### 1.2.2 Periodic Backup (Local Sources)

- **REQ-PERIODIC-001**: For local/internal sources, user shall be able to enable periodic backups
- **REQ-PERIODIC-002**: User shall be able to set backup interval (hourly, daily, custom)
- **REQ-PERIODIC-003**: Periodic backups shall only run when system is not sleeping

#### 1.2.3 Application Quit Monitoring

- **REQ-APPMON-001**: User shall be able to select applications to monitor from installed apps
- **REQ-APPMON-002**: System shall display list of all installed applications
- **REQ-APPMON-003**: User shall choose monitoring mode:
  - Option A: Trigger on ANY monitored app quit
  - Option B: Trigger only when ALL monitored apps have quit
- **REQ-APPMON-004**: Backup shall trigger immediately when quit condition is met
- **REQ-APPMON-005**: System shall handle application crash scenarios

#### 1.2.4 Manual Backup

- **REQ-MANUAL-001**: User shall be able to trigger backup manually from menu bar
- **REQ-MANUAL-002**: Manual backup shall be available regardless of other trigger settings
- **REQ-MANUAL-003**: System shall prevent concurrent backups

### 1.3 User Interface

#### 1.3.1 System Tray Integration

- **REQ-UI-001**: Application shall run as system tray application (macOS: menu bar, Windows: system tray)
- **REQ-UI-002**: System tray icon shall indicate current status:
  - Idle (ready)
  - Backing up (in progress)
  - Success (recently completed)
  - Error (failed)
- **REQ-UI-003**: System tray icon shall be clickable to show menu options
- **REQ-UI-004**: Menu shall include:
  - Status information
  - "Backup Now" option
  - "Open Settings" option
  - "View Logs" option
  - "Quit" option

#### 1.3.2 Settings Window

- **REQ-SETTINGS-001**: Settings window shall open from menu bar
- **REQ-SETTINGS-002**: Settings shall include following sections:

**General Tab**:

- Launch at login (checkbox)
- Backup name prefix (text input)
- Number of backups to keep (number input)

**Source & Target Tab**:

- Source folder selection (folder picker)
- Target folder selection (folder picker)
- Display volume information for source

**Triggers Tab**:

- Enable volume mount trigger (checkbox)
- Enable periodic backup (checkbox)
- Backup interval (dropdown: 1h, 6h, 12h, 24h, custom)
- Application monitoring (multi-select list)
- Monitor mode (radio: ANY quit / ALL quit)

**Advanced Tab**:

- Exclude patterns (text area)
- Verify backups after completion (checkbox)
- Show notifications (checkbox)

- **REQ-SETTINGS-003**: Settings shall persist between application restarts
- **REQ-SETTINGS-004**: Settings changes shall take effect immediately
- **REQ-SETTINGS-005**: Settings shall validate user input

#### 1.3.3 Progress Indication

- **REQ-PROGRESS-001**: During backup, progress shall be visible in menu bar (icon animation/overlay)
- **REQ-PROGRESS-002**: Progress details shall show in menu dropdown:
  - Current operation (scanning, copying, verifying)
  - Files processed / total files
  - Data transferred / total size
  - Estimated time remaining
- **REQ-PROGRESS-003**: User shall be able to view progress without opening settings window

#### 1.3.4 Notifications

- **REQ-NOTIFY-001**: System shall send macOS notification on backup start
- **REQ-NOTIFY-002**: System shall send notification on backup completion (success)
- **REQ-NOTIFY-003**: System shall send notification on backup failure with error summary
- **REQ-NOTIFY-004**: Notifications shall be configurable (enable/disable)

#### 1.3.5 Logging and History

- **REQ-LOG-001**: System shall maintain detailed log file
- **REQ-LOG-002**: Log shall include:
  - Timestamp
  - Event type (start, complete, error, trigger)
  - Details (files copied, errors encountered)
  - Performance metrics
- **REQ-LOG-003**: Log viewer shall be accessible from system tray menu
- **REQ-LOG-004**: Logs shall be rotated to prevent excessive disk usage
- **REQ-LOG-005**: Recent backup history shall be viewable in UI
- **REQ-LOG-006**: Log file location shall follow platform conventions (macOS: ~/Library/Logs, Windows: %APPDATA%)

### 1.4 System Integration

#### 1.4.1 Launch at Login

- **REQ-LAUNCH-001**: User shall be able to enable/disable launch at login
- **REQ-LAUNCH-002**: Application shall start minimized to system tray (no window)
- **REQ-LAUNCH-003**: Launch at login shall use platform-specific mechanisms (macOS: LaunchAgents/SMAppService, Windows: Registry/Task Scheduler)

#### 1.4.2 Permissions

- **REQ-PERM-001**: Application shall request necessary permissions per platform:
  - macOS: Full Disk Access, Notifications, Accessibility (for app monitoring)
  - Windows: Administrator for system monitoring (optional), Notifications
- **REQ-PERM-002**: Application shall detect missing permissions and guide user
- **REQ-PERM-003**: Application shall handle permission differences between platforms gracefully

#### 1.4.3 Resource Management

- **REQ-RESOURCE-001**: Application shall run with minimal resource footprint when idle
- **REQ-RESOURCE-002**: During backup, CPU usage shall be throttled if configured
- **REQ-RESOURCE-003**: Application shall not prevent system sleep when idle
- **REQ-RESOURCE-004**: Active backup shall prevent system sleep

---

## 2. Non-Functional Requirements

### 2.1 Performance

- **REQ-PERF-001**: Backup operation shall not significantly impact system performance
- **REQ-PERF-002**: File scanning shall be optimized for large directories (>100k files)
- **REQ-PERF-003**: System tray response time shall be < 100ms
- **REQ-PERF-004**: Application startup time shall be < 2 seconds

### 2.2 Reliability

- **REQ-REL-001**: Application shall handle unexpected shutdowns gracefully
- **REQ-REL-002**: Backup shall be atomic (complete or rolled back)
- **REQ-REL-003**: Data corruption shall be prevented through verification
- **REQ-REL-004**: Application shall recover from crashes without data loss

### 2.3 Security

- **REQ-SEC-001**: Application shall follow platform security best practices (macOS: Sandboxing, Windows: Code signing)
- **REQ-SEC-002**: User credentials (if needed) shall be stored securely (macOS: Keychain, Windows: Credential Manager)
- **REQ-SEC-003**: File permissions shall be preserved during backup
- **REQ-SEC-004**: Application shall handle platform-specific security contexts appropriately

### 2.4 Usability

- **REQ-USE-001**: UI shall follow platform design guidelines (macOS: HIG, Windows: Fluent Design)
- **REQ-USE-002**: Settings shall have sensible defaults
- **REQ-USE-003**: Error messages shall be clear and actionable
- **REQ-USE-004**: First-run experience shall guide user through setup
- **REQ-USE-005**: UI shall adapt to platform conventions (menu positioning, keyboard shortcuts)

### 2.5 Maintainability

- **REQ-MAINT-001**: Code shall be well-documented
- **REQ-MAINT-002**: Architecture shall be modular and testable
- **REQ-MAINT-003**: Logging shall facilitate troubleshooting
- **REQ-MAINT-004**: Platform-specific code shall be clearly separated and documented

---

## 3. Technical Constraints

### 3.1 Platform Support

- **Primary Targets**:
  - macOS 11.0+ (Big Sur and later)
  - Windows 10 (version 1809+) and Windows 11
- **Architecture**: x86_64 and ARM64 (Apple Silicon, Windows ARM)
- **Future**: Potential Linux support

### 3.2 Technology Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Rust (Tauri core)
- **Build Tool**: Tauri v2
- **State Management**: Zustand or Redux Toolkit
- **UI Components**: Radix UI or shadcn/ui

### 3.3 Dependencies

- Tauri v2 APIs for system integration
- Native file system APIs (Rust std::fs with platform-specific extensions)
- Platform notification frameworks:
  - macOS: NSUserNotification / UNUserNotification
  - Windows: Windows Toast notifications
- Volume monitoring:
  - macOS: FSEvents, DiskArbitration
  - Windows: WMI Win32_Volume, DeviceChange events
- Process monitoring:
  - macOS: NSWorkspace / sysctl
  - Windows: Windows Management Instrumentation (WMI)
- Hardlink support:
  - macOS: APFS, HFS+ (std::fs::hard_link)
  - Windows: NTFS (CreateHardLink API)

### 3.4 Filesystem Requirements

- **Hardlink Support**: Target filesystem must support hardlinks
  - macOS: APFS (recommended), HFS+
  - Windows: NTFS (required), ReFS
  - Fallback: Full copy if hardlinks unavailable
- **Case Sensitivity**: Handle platform differences (macOS typically case-insensitive, Windows case-insensitive)
- **Path Separators**: Handle / (macOS) and \ (Windows) appropriately

---

## 4. Out of Scope (Future Considerations)

- Network share support as source
- Cloud storage integration
- Encryption of backups
- Compression of backup data
- Differential backups (only incremental)
- Multiple backup profiles
- Backup scheduling with complex rules
- File versioning within backups
- Bandwidth throttling for network targets
- Email notifications

---

## 5. Success Criteria

### 5.1 Cross-Platform Success Criteria

1. Application successfully backs up 10GB+ folder with 10k+ files on both macOS and Windows
2. Hardlinks correctly created on APFS (macOS) and NTFS (Windows), disk usage verified
3. Volume mount trigger works reliably on both platforms
4. Application quit monitoring works for test applications on both platforms
5. Retention policy correctly removes old backups
6. Failed backup recovery works correctly
7. UI is responsive and intuitive on both platforms
8. Launch at login works after reboot on both platforms
9. Resource usage remains minimal when idle
10. Backup completes without data loss or corruption
11. Path handling works correctly with platform-specific separators
12. Notifications display correctly using native APIs

### 5.2 Platform-Specific Testing

**macOS**:

- APFS hardlinks functional
- DiskArbitration volume monitoring working
- NSWorkspace app monitoring working
- Menu bar integration native
- Keychain integration (if needed)

**Windows**:

- NTFS hardlinks functional
- WMI volume monitoring working
- WMI process monitoring working
- System tray integration native
- Credential Manager integration (if needed)

---

## 6. Risks and Mitigations

| Risk                                  | Impact | Mitigation                                          | Platform Notes                                   |
| ------------------------------------- | ------ | --------------------------------------------------- | ------------------------------------------------ |
| Hardlink support varies by filesystem | High   | Detect filesystem, fallback to full copy, warn user | macOS: APFS/HFS+, Windows: NTFS/ReFS only        |
| Large file operations may hang UI     | Medium | Run all backup operations in background thread      | Cross-platform                                   |
| Permission issues                     | High   | Clear permission request flow, documentation        | Different per platform                           |
| Volume detection may be unreliable    | Medium | Multiple detection methods, user manual trigger     | Different APIs per platform                      |
| App monitoring may miss some apps     | Low    | Provide manual trigger, log all monitoring events   | Requires elevated permissions on Windows         |
| Concurrent backup attempts            | Medium | Implement locking mechanism                         | Cross-platform                                   |
| Disk full during backup               | High   | Pre-check space, handle gracefully                  | Cross-platform                                   |
| Path separator differences            | Medium | Use Rust PathBuf for cross-platform paths           | Handle \ vs /                                    |
| Case sensitivity differences          | Low    | Normalize paths consistently                        | macOS case-insensitive, Windows case-insensitive |
| Windows long path support             | Medium | Enable long path support (260 char limit)           | Windows-specific: Use \\?\ prefix                |
| Administrator rights on Windows       | Medium | Request UAC elevation only when needed              | Windows-specific                                 |

---

## 7. Development Phases

### Phase 1: Foundation (MVP)

- Basic Tauri app structure
- System tray integration (cross-platform)
- Settings UI (basic)
- Manual backup trigger
- Simple file copy (no hardlinks yet)
- Platform detection and abstraction layer

### Phase 2: Core Backup Logic

- Incremental backup with hardlinks
- Platform-specific hardlink implementation
- Backup naming and metadata
- Retention management
- Error handling and recovery

### Phase 3: Triggers

- Volume mount detection (platform-specific)
- Periodic backup scheduler (cross-platform)
- Application quit monitoring (platform-specific)

### Phase 4: Polish

- Progress indication
- Notifications (platform-specific)
- Logging and history viewer
- Launch at login (platform-specific)
- UI refinements

### Phase 5: Testing & Release

- Comprehensive testing on both platforms
- Performance optimization
- Platform-specific installers (macOS: .dmg, Windows: .msi/.exe)
- Documentation
- Release preparation
- Settings UI (basic)
- Manual backup trigger
- Simple file copy (no hardlinks yet)

### Phase 2: Core Backup Logic

- Incremental backup with hardlinks
- Backup naming and metadata
- Retention management
- Error handling and recovery

### Phase 3: Triggers

- Volume mount detection
- Periodic backup scheduler
- Application quit monitoring

### Phase 4: Polish

- Progress indication
- Notifications
- Logging and history viewer
- Launch at login
- UI refinements

### Phase 5: Testing & Release

- Comprehensive testing
- Performance optimization
- Documentation
- Release preparation

---

**Document Version**: 1.0
**Last Updated**: October 22, 2025
**Author**: AI Assistant with User Input
