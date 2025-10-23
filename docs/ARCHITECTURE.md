# Backupper - Technical Architecture

## System Overview

```
┌────────────────────────────────────────────────────────────┐
│                        macOS System                        │
│  ┌────────────┐  ┌──────────────┐  ┌───────────────────┐   │
│  │   Volume   │  │ Application  │  │   Notifications   │   │
│  │  Monitor   │  │   Monitor    │  │     System        │   │
│  └─────┬──────┘  └───────┬──────┘  └────────┬──────────┘   │
└────────┼─────────────────┼──────────────────┼──────────────┘
         │                 │                  │
         │   Events        │    Events        │    Notify
         │                 │                  │
┌────────▼─────────────────▼──────────────────▼──────────────┐
│                    Tauri Backend (Rust)                    │
│  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓   │
│  ┃              Core Backup Engine                     ┃   │
│  ┃  ┌────────────┐  ┌──────────────┐  ┌─────────────┐  ┃   │
│  ┃  │   File     │  │  Incremental │  │  Retention  │  ┃   │
│  ┃  │  Scanner   │─>│    Backup    │─>│  Manager    │  ┃   │
│  ┃  └────────────┘  └──────────────┘  └─────────────┘  ┃   │
│  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛   │
│  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓   │
│  ┃              Trigger Subsystem                      ┃   │
│  ┃  ┌────────────┐  ┌──────────────┐  ┌─────────────┐  ┃   │
│  ┃  │  Volume    │  │   Periodic   │  │   Process   │  ┃   │
│  ┃  │  Monitor   │  │   Scheduler  │  │   Monitor   │  ┃   │
│  ┃  └────────────┘  └──────────────┘  └─────────────┘  ┃   │
│  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛   │
│  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓   │
│  ┃            Settings & State Management              ┃   │
│  ┃  ┌────────────┐  ┌──────────────┐  ┌─────────────┐  ┃   │
│  ┃  │  Settings  │  │    Backup    │  │   Logger    │  ┃   │
│  ┃  │  Manager   │  │    State     │  │             │  ┃   │
│  ┃  └────────────┘  └──────────────┘  └─────────────┘  ┃   │
│  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛   │
│                           ▲                                │
│                           │ Tauri Commands & Events        │
│                           ▼                                │
│  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓   │
│  ┃                   Tauri IPC Layer                   ┃   │
│  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛   │
└──────────────────────────────┬─────────────────────────────┘
                               │
┌──────────────────────────────▼─────────────────────────────┐
│              Tauri Frontend (React + TypeScript)           │
│  ┌────────────┐  ┌──────────────┐  ┌───────────────────┐   │
│  │   System   │  │   Settings   │  │      Logs         │   │
│  │    Tray    │  │    Window    │  │     Viewer        │   │
│  └────────────┘  └──────────────┘  └───────────────────┘   │
│  ┌────────────┐  ┌──────────────┐  ┌───────────────────┐   │
│  │  Progress  │  │    State     │  │   Components      │   │
│  │   Display  │  │  Management  │  │    Library        │   │
│  └────────────┘  └──────────────┘  └───────────────────┘   │
└────────────────────────────────────────────────────────────┘
```

---

## Technology Stack

### Frontend

- **Framework**: React 18+
- **Language**: TypeScript 5+
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **UI Components**: Radix UI
- **Icons**: Lucide React

### Backend

- **Framework**: Tauri v2
- **Language**: Rust (latest stable)
- **Async Runtime**: Tokio
- **Serialization**: Serde
- **Logging**: tracing + tracing-appender
- **File Operations**: std::fs + walkdir

### System Integration

- **macOS APIs**:
  - DiskArbitration (volume monitoring)
  - Core Foundation
  - NSWorkspace (via objc bindings)
  - SMAppService (launch at login)
- **Permissions**: Full Disk Access, Notifications, Accessibility

---

## Module Structure

### Rust Backend (`src-tauri/src/`)

```
src-tauri/
├── Cargo.toml
└── src/
    ├── main.rs                    # App entry point, Tauri setup
    ├── lib.rs                     # Module exports
    │
    ├── backup/
    │   ├── mod.rs                 # Backup module exports
    │   ├── scanner.rs             # File system scanner
    │   ├── engine.rs              # Backup orchestration
    │   ├── incremental.rs         # Incremental backup logic
    │   ├── hardlink.rs            # Hardlink operations
    │   ├── metadata.rs            # Backup metadata management
    │   └── retention.rs           # Backup retention & cleanup
    │
    ├── triggers/
    │   ├── mod.rs
    │   ├── volume_monitor.rs      # Volume mount/unmount detection
    │   ├── scheduler.rs           # Periodic backup scheduler
    │   ├── process_monitor.rs     # Application quit monitoring
    │   └── coordinator.rs         # Trigger coordination
    │
    ├── settings/
    │   ├── mod.rs
    │   ├── types.rs               # Settings structs
    │   ├── storage.rs             # Settings persistence
    │   └── validation.rs          # Settings validation
    │
    ├── system/
    │   ├── mod.rs
    │   ├── permissions.rs         # macOS permission checks
    │   ├── notifications.rs       # Native notifications
    │   ├── launch_agent.rs        # Launch at login
    │   ├── volume_info.rs         # Volume information
    │   └── app_list.rs            # Installed apps enumeration
    │
    ├── state/
    │   ├── mod.rs
    │   ├── app_state.rs           # Global application state
    │   └── backup_state.rs        # Backup progress state
    │
    ├── logging/
    │   ├── mod.rs
    │   └── setup.rs               # Logging configuration
    │
    ├── commands/
    │   ├── mod.rs                 # Tauri command exports
    │   ├── settings_commands.rs   # Settings CRUD
    │   ├── backup_commands.rs     # Backup operations
    │   ├── system_commands.rs     # System info & controls
    │   └── log_commands.rs        # Log retrieval
    │
    ├── events/
    │   ├── mod.rs
    │   └── types.rs               # Event type definitions
    │
    └── error.rs                   # Error types
```

### TypeScript Frontend (`src/`)

```
src/
├── main.tsx                       # React entry point
├── App.tsx                        # Root component
│
├── components/
│   ├── tray/
│   │   ├── TrayMenu.tsx          # Menu bar menu
│   │   └── StatusIcon.tsx        # Status indicator
│   │
│   ├── settings/
│   │   ├── SettingsWindow.tsx    # Main settings window
│   │   ├── GeneralTab.tsx        # General settings
│   │   ├── SourceTargetTab.tsx   # Source/target config
│   │   ├── TriggersTab.tsx       # Trigger configuration
│   │   └── AdvancedTab.tsx       # Advanced settings
│   │
│   ├── progress/
│   │   ├── ProgressDisplay.tsx   # Backup progress UI
│   │   └── ProgressBar.tsx       # Progress bar component
│   │
│   ├── logs/
│   │   ├── LogViewer.tsx         # Log viewer window
│   │   └── LogEntry.tsx          # Single log entry
│   │
│   └── ui/
│       ├── Button.tsx            # Reusable button
│       ├── Input.tsx             # Reusable input
│       ├── Select.tsx            # Reusable select
│       ├── Toggle.tsx            # Toggle switch
│       └── ...                   # Other UI components
│
├── hooks/
│   ├── useSettings.ts            # Settings management hook
│   ├── useBackup.ts              # Backup operations hook
│   ├── useProgress.ts            # Progress tracking hook
│   └── useTauri.ts               # Tauri helpers
│
├── store/
│   ├── settingsStore.ts          # Settings state (Zustand)
│   ├── backupStore.ts            # Backup state
│   └── uiStore.ts                # UI state
│
├── types/
│   ├── settings.ts               # Settings types
│   ├── backup.ts                 # Backup types
│   ├── events.ts                 # Event types
│   └── api.ts                    # Tauri command types
│
├── utils/
│   ├── format.ts                 # Formatting utilities
│   ├── validation.ts             # Validation helpers
│   └── tauri.ts                  # Tauri API wrappers
│
└── styles/
    └── globals.css               # Global styles
```

---

## Core Data Structures

### Settings (Rust)

```rust
#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct AppSettings {
    pub general: GeneralSettings,
    pub paths: PathSettings,
    pub triggers: TriggerSettings,
    pub advanced: AdvancedSettings,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct GeneralSettings {
    pub launch_at_login: bool,
    pub backup_prefix: String,
    pub retention_count: u32,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct PathSettings {
    pub source_path: Option<PathBuf>,
    pub target_path: Option<PathBuf>,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct TriggerSettings {
    pub volume_mount_enabled: bool,
    pub periodic_enabled: bool,
    pub periodic_interval_minutes: u32,
    pub monitored_apps: Vec<MonitoredApp>,
    pub app_monitor_mode: AppMonitorMode,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct MonitoredApp {
    pub name: String,
    pub bundle_id: String,
    pub path: PathBuf,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub enum AppMonitorMode {
    Any,  // Trigger on any app quit
    All,  // Trigger when all apps quit
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct AdvancedSettings {
    pub exclude_patterns: Vec<String>,
    pub verify_after_backup: bool,
    pub show_notifications: bool,
}
```

### Backup Metadata

```rust
#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct BackupMetadata {
    pub id: String,
    pub timestamp: DateTime<Utc>,
    pub status: BackupStatus,
    pub source_path: PathBuf,
    pub backup_path: PathBuf,
    pub previous_backup: Option<String>,
    pub statistics: BackupStatistics,
    pub error: Option<String>,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub enum BackupStatus {
    InProgress,
    Success,
    Failed,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct BackupStatistics {
    pub total_files: u64,
    pub total_size: u64,
    pub files_copied: u64,
    pub files_hardlinked: u64,
    pub bytes_copied: u64,
    pub duration_seconds: f64,
}
```

### Progress Events

```rust
#[derive(Serialize, Clone, Debug)]
pub struct ProgressEvent {
    pub phase: BackupPhase,
    pub current: u64,
    pub total: u64,
    pub message: String,
}

#[derive(Serialize, Clone, Debug)]
pub enum BackupPhase {
    Scanning,
    Comparing,
    Copying,
    Verifying,
    Cleanup,
}
```

---

## Key Algorithms

### Incremental Backup Algorithm

```rust
async fn perform_incremental_backup(
    source: &Path,
    target: &Path,
    previous_backup: Option<&Path>,
    progress_tx: Sender<ProgressEvent>,
) -> Result<BackupMetadata> {
    // 1. Scan source directory
    let source_files = scan_directory(source, progress_tx.clone()).await?;

    // 2. Load previous backup metadata (if exists)
    let previous_files = if let Some(prev) = previous_backup {
        load_backup_metadata(prev)?
    } else {
        HashMap::new()
    };

    // 3. Create new backup directory with timestamp
    let backup_dir = create_backup_directory(target)?;

    // 4. Compare and categorize files
    let (unchanged, modified, new_files) =
        compare_files(&source_files, &previous_files);

    // 5. Process files
    for file in unchanged {
        // Hardlink unchanged files from previous backup
        create_hardlink(
            &previous_backup.unwrap().join(&file.relative_path),
            &backup_dir.join(&file.relative_path)
        )?;
    }

    for file in modified.iter().chain(new_files.iter()) {
        // Copy modified and new files
        copy_file_with_metadata(
            &source.join(&file.relative_path),
            &backup_dir.join(&file.relative_path)
        )?;
    }

    // 6. Write metadata
    let metadata = BackupMetadata {
        status: BackupStatus::Success,
        statistics: calculate_statistics(&source_files),
        // ... other fields
    };

    write_metadata(&backup_dir, &metadata)?;

    Ok(metadata)
}
```

### File Comparison

```rust
fn compare_files(
    source: &HashMap<PathBuf, FileMetadata>,
    previous: &HashMap<PathBuf, FileMetadata>,
) -> (Vec<FileInfo>, Vec<FileInfo>, Vec<FileInfo>) {
    let mut unchanged = Vec::new();
    let mut modified = Vec::new();
    let mut new_files = Vec::new();

    for (path, source_meta) in source {
        match previous.get(path) {
            Some(prev_meta) => {
                // Compare modification time and size
                if source_meta.modified == prev_meta.modified
                    && source_meta.size == prev_meta.size {
                    unchanged.push(source_meta.clone());
                } else {
                    modified.push(source_meta.clone());
                }
            }
            None => {
                new_files.push(source_meta.clone());
            }
        }
    }

    (unchanged, modified, new_files)
}
```

### Retention Management

```rust
async fn apply_retention_policy(
    target: &Path,
    retention_count: u32,
) -> Result<()> {
    // 1. List all successful backups
    let mut backups = list_backups(target)?
        .into_iter()
        .filter(|b| b.status == BackupStatus::Success)
        .collect::<Vec<_>>();

    // 2. Sort by timestamp (newest first)
    backups.sort_by(|a, b| b.timestamp.cmp(&a.timestamp));

    // 3. Keep only retention_count newest
    let to_delete = backups.into_iter().skip(retention_count as usize);

    // 4. Delete old backups
    for backup in to_delete {
        remove_backup_directory(&backup.backup_path)?;
    }

    Ok(())
}
```

---

## IPC Communication (Tauri Commands)

### Settings Commands

```rust
#[tauri::command]
async fn get_settings(state: State<'_, AppState>) -> Result<AppSettings> {
    state.settings.read().await.clone()
}

#[tauri::command]
async fn update_settings(
    settings: AppSettings,
    state: State<'_, AppState>,
) -> Result<()> {
    validate_settings(&settings)?;
    state.settings.write().await = settings.clone();
    save_settings_to_disk(&settings)?;
    Ok(())
}
```

### Backup Commands

```rust
#[tauri::command]
async fn start_backup_manual(
    state: State<'_, AppState>,
    app: AppHandle,
) -> Result<()> {
    // Prevent concurrent backups
    if state.backup_in_progress.load(Ordering::SeqCst) {
        return Err("Backup already in progress".into());
    }

    state.backup_in_progress.store(true, Ordering::SeqCst);

    // Spawn backup task
    tokio::spawn(async move {
        let result = perform_backup(&state, &app).await;
        state.backup_in_progress.store(false, Ordering::SeqCst);
        result
    });

    Ok(())
}

#[tauri::command]
async fn get_backup_history(
    state: State<'_, AppState>,
) -> Result<Vec<BackupMetadata>> {
    list_backup_history(&state.settings.read().await.paths.target_path)
}
```

### System Commands

```rust
#[tauri::command]
async fn get_installed_apps() -> Result<Vec<InstalledApp>> {
    enumerate_applications()
}

#[tauri::command]
async fn get_volume_info(path: PathBuf) -> Result<VolumeInfo> {
    get_volume_information(&path)
}

#[tauri::command]
async fn set_launch_at_login(enabled: bool) -> Result<()> {
    configure_launch_agent(enabled)
}
```

---

## Event Flow Examples

### Volume Mount Trigger Flow

```
1. External drive mounted
   └─> macOS DiskArbitration callback
       └─> VolumeMonitor receives event
           └─> Check if source path on mounted volume
               └─> YES: TriggerCoordinator::trigger_backup()
                   └─> BackupEngine::start()
                       ├─> Emit ProgressEvent (frontend)
                       ├─> Perform backup
                       ├─> Send notification
                       └─> Update UI status
```

### Application Quit Trigger Flow

```
1. Monitored app quits (e.g., Lightroom)
   └─> NSWorkspace notification (macOS)
       └─> ProcessMonitor receives event
           └─> Check monitoring mode
               ├─> ANY: Trigger immediately
               └─> ALL: Check if all monitored apps quit
                   └─> YES: TriggerCoordinator::trigger_backup()
```

### Manual Backup Flow

```
1. User clicks "Backup Now"
   └─> Frontend: invoke("start_backup_manual")
       └─> Backend: start_backup_manual command
           └─> Check if backup in progress
               └─> NO: Spawn backup task
                   ├─> Scan source
                   ├─> Compare with previous
                   ├─> Copy/hardlink files
                   ├─> Emit progress events
                   ├─> Apply retention
                   └─> Complete
```

---

## Performance Considerations

### File Scanning Optimization

- Use parallel directory traversal (rayon)
- Stream results instead of collecting all in memory
- Skip hidden/system files by default
- Use file metadata cache for repeated scans

### Backup Operation Optimization

- Batch file operations
- Use sendfile/copy_file_range when available
- Throttle I/O to prevent system slowdown
- Show progress every N files (not every file)

### Memory Management

- Stream large file lists
- Use Arc/Rc for shared data
- Limit concurrent file operations
- Clean up temporary data promptly

### UI Responsiveness

- All file operations on background threads
- Debounce settings changes
- Virtual scrolling for large lists
- Lazy load log entries

---

## Security Considerations

1. **File System Access**: Request Full Disk Access permission
2. **Settings Storage**: Store in user's Application Support directory
3. **Sandboxing**: Disable if necessary for system monitoring
4. **Input Validation**: Validate all user inputs on backend
5. **Path Traversal**: Prevent access outside intended directories
6. **Error Messages**: Don't expose sensitive path information

---

## Testing Strategy

### Unit Tests (Rust)

- File comparison logic
- Hardlink creation/validation
- Settings validation
- Metadata parsing
- Retention policy logic

### Integration Tests

- Full backup workflow
- Trigger mechanisms
- Settings persistence
- Error recovery

### Manual Testing

- Various macOS versions
- Different filesystems (APFS, HFS+, exFAT)
- Large datasets (1M+ files)
- Edge cases (permissions, disk full, etc.)
- UI/UX flows

---

## Build & Distribution

### Development

```bash
npm install
npm run tauri dev
```

### Production Build

```bash
npm run tauri build
```

### Distribution

- Code sign with Apple Developer ID
- Notarize for macOS Gatekeeper
- Package as .dmg
- Set up auto-updater endpoint

---

## Future Enhancements (Post-MVP)

1. Network share support
2. Cloud storage targets (S3, Dropbox)
3. Backup encryption
4. Multiple backup profiles
5. Bandwidth throttling
6. Advanced scheduling (cron-like)
7. File versioning within backups
8. Backup verification/integrity checks
9. Windows/Linux support
10. Remote backup management

---

**Document Version**: 1.0
**Last Updated**: October 22, 2025

---

## ⭐ UPDATED: Platform Abstraction Architecture (Oct 22, 2025)

### Platform Backend Trait

The core abstraction for platform-specific operations:

```rust
/// Platform-specific operations abstraction
/// Enables macOS MVP (v1.0) with minimal changes needed for Windows port (v1.1)
pub trait PlatformBackend: Send + Sync {
    /// Monitor applications for quit events
    /// mode: QuitMode::All (MVP) - backup when ALL monitored apps quit
    /// mode: QuitMode::Any (v1.2+) - backup when ANY monitored app quits
    fn monitor_app_quit(&self, apps: Vec<PathBuf>, mode: QuitMode) -> Result<()>;
    
    /// Monitor volume mount events
    /// Critical for external SSD workflow (Lightroom use case)
    fn monitor_volume_mount(&self, volume_id: &str) -> Result<()>;
    
    /// Create hardlink (platform-specific implementation)
    /// Returns true if hardlink created, false if filesystem doesn't support
    fn create_hardlink(&self, src: &Path, dst: &Path) -> Result<bool>;
    
    /// Check if filesystem supports hardlinks
    /// Used before backup to determine strategy
    fn supports_hardlinks(&self, path: &Path) -> bool;
    
    /// Show system notification
    fn show_notification(&self, title: &str, body: &str) -> Result<()>;
    
    /// Get list of installed applications (for UI picker)
    fn list_applications(&self) -> Result<Vec<AppInfo>>;
    
    /// Get list of mounted volumes (for UI picker)
    fn list_volumes(&self) -> Result<Vec<VolumeInfo>>;
}

#[derive(Debug, Clone, Copy)]
pub enum QuitMode {
    All,  // MVP: Backup when all monitored apps quit
    Any,  // v1.2+: Backup when any monitored app quits
}
```

### macOS Implementation (v1.0)

```rust
#[cfg(target_os = "macos")]
pub struct MacOSBackend {
    // NSWorkspace for app monitoring
    workspace: NSWorkspace,
    // DiskArbitration for volume monitoring
    disk_arbitration: DiskArbitration,
}

#[cfg(target_os = "macos")]
impl PlatformBackend for MacOSBackend {
    fn monitor_app_quit(&self, apps: Vec<PathBuf>, mode: QuitMode) -> Result<()> {
        // Use NSWorkspace notifications
        // Track running state of all specified apps
        // For QuitMode::All: trigger only when all apps have quit
        // Implementation using cocoa-rs and dispatch crates
    }
    
    fn monitor_volume_mount(&self, volume_id: &str) -> Result<()> {
        // Use DiskArbitration framework
        // Monitor for DADiskDidAppear notifications
        // Match by volume name or UUID
    }
    
    fn create_hardlink(&self, src: &Path, dst: &Path) -> Result<bool> {
        // Use std::fs::hard_link on APFS/HFS+
        // Return false if filesystem doesn't support (e.g., FAT32)
    }
    
    fn supports_hardlinks(&self, path: &Path) -> bool {
        // Check filesystem type (APFS, HFS+ = true; FAT32, SMB = false)
        // Use statfs or similar
    }
    
    fn show_notification(&self, title: &str, body: &str) -> Result<()> {
        // Use macOS Notification Center
        // cocoa-rs NSUserNotification
    }
}
```

### Windows Implementation (v1.1)

```rust
#[cfg(target_os = "windows")]
pub struct WindowsBackend {
    // WMI connection for process/volume monitoring
    wmi_con: WmiConnection,
}

#[cfg(target_os = "windows")]
impl PlatformBackend for WindowsBackend {
    fn monitor_app_quit(&self, apps: Vec<PathBuf>, mode: QuitMode) -> Result<()> {
        // Use WMI Win32_Process
        // Query for process termination events
        // Track all specified apps for QuitMode::All
    }
    
    fn monitor_volume_mount(&self, volume_id: &str) -> Result<()> {
        // Use WMI Win32_Volume
        // Monitor DeviceChange events
        // Match by volume label or serial number
    }
    
    fn create_hardlink(&self, src: &Path, dst: &Path) -> Result<bool> {
        // Use CreateHardLink Win32 API
        // Works on NTFS, ReFS
        // Return false on FAT32 or network shares
    }
    
    fn supports_hardlinks(&self, path: &Path) -> bool {
        // Check filesystem (NTFS/ReFS = true; FAT32/SMB = false)
        // Use GetVolumeInformation
    }
    
    fn show_notification(&self, title: &str, body: &str) -> Result<()> {
        // Use Windows Toast Notifications
        // windows-rs or winrt crates
    }
}
```

---

## Backup Verification Strategy

### MVP (v1.0) - Basic Verification ⭐

**Scope**: File count verification
**Time**: Minimal overhead (~1-2 seconds)

```rust
pub struct BasicVerification {
    source_count: usize,
    dest_count: usize,
    errors: Vec<String>,
}

impl BasicVerification {
    pub fn verify(&self, backup: &Backup) -> Result<VerificationResult> {
        // 1. Count files in source
        let source_files = count_files(&backup.source_path)?;
        
        // 2. Count files in destination backup
        let dest_files = count_files(&backup.dest_path)?;
        
        // 3. Compare counts
        if source_files != dest_files {
            return Err(VerificationError::CountMismatch {
                source: source_files,
                dest: dest_files,
            });
        }
        
        // 4. Check for errors during backup
        if !backup.errors.is_empty() {
            return Err(VerificationError::BackupErrors(backup.errors.clone()));
        }
        
        Ok(VerificationResult::Success {
            files_backed_up: dest_files,
            duration: backup.duration,
        })
    }
}
```

### Future (v1.2+) - Incremental Checksum Verification

**Scope**: SHA-256 checksums for changed files only
**Time**: Proportional to changed files (efficient for incremental)

```rust
pub struct IncrementalVerification {
    checksum_cache: HashMap<PathBuf, String>, // Previous checksums
}

impl IncrementalVerification {
    pub fn verify(&self, backup: &Backup) -> Result<VerificationResult> {
        // First backup: Calculate checksums for ALL files
        if backup.is_first_backup() {
            return self.verify_all_files(&backup);
        }
        
        // Subsequent backups: Only verify changed/new files
        let changed_files = backup.get_changed_files();
        for file in changed_files {
            let checksum = calculate_sha256(&file)?;
            self.verify_checksum(&file, &checksum)?;
        }
        
        Ok(VerificationResult::Success {
            files_verified: changed_files.len(),
            duration: backup.duration,
        })
    }
}
```

---

## Updated Architecture Decisions

### Decision 1: ALL Quit Mode Only for MVP
**Rationale**: 
- User's primary use case is single app (Lightroom Classic)
- ALL mode is simpler to implement
- ANY mode adds complexity without immediate value
- Time saved: ~2 hours

**Implementation**:
```rust
// MVP implementation
fn check_all_apps_quit(&self, monitored_apps: &[String]) -> bool {
    monitored_apps.iter().all(|app| !is_app_running(app))
}

// v1.2+ will add ANY mode:
// fn check_any_app_quit(&self, monitored_apps: &[String]) -> bool {
//     monitored_apps.iter().any(|app| !is_app_running(app))
// }
```

### Decision 2: Basic Verification for MVP
**Rationale**:
- File count check catches most common issues (incomplete copy, errors)
- Fast and lightweight
- Advanced checksums nice-to-have but not critical for MVP
- Time saved: ~8 hours

### Decision 3: Hardlink Fallback - User Choice
**Implementation**:
```rust
pub enum HardlinkFallback {
    FullCopy,      // Proceed with full file copies
    Cancel,        // Don't proceed, let user choose different destination
}

fn handle_no_hardlink_support(&self, path: &Path) -> Result<HardlinkFallback> {
    // Show dialog to user
    let choice = show_dialog(
        "Hardlinks Not Supported",
        "The destination filesystem doesn't support hardlinks. \
         Backups will use full file copies (more storage space). \
         Continue anyway?",
        &["Continue with Full Copies", "Cancel"]
    )?;
    
    match choice {
        0 => Ok(HardlinkFallback::FullCopy),
        _ => Ok(HardlinkFallback::Cancel),
    }
}
```

---

**Status**: ✅ Architecture updated with platform abstraction and finalized decisions
