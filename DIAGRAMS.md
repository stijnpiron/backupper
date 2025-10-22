# System Architecture Diagrams

This document contains visual diagrams of the Backupper system architecture using Mermaid syntax.

## High-Level System Architecture

```mermaid
graph TB
    subgraph "macOS System"
        VS[Volume System]
        AS[Application System]
        NS[Notification System]
    end

    subgraph "Tauri Backend (Rust)"
        subgraph "Core Backup Engine"
            FS[File Scanner]
            BE[Backup Engine]
            RM[Retention Manager]
            FS --> BE --> RM
        end

        subgraph "Trigger Subsystem"
            VM[Volume Monitor]
            PS[Periodic Scheduler]
            PM[Process Monitor]
        end

        subgraph "State Management"
            SM[Settings Manager]
            BS[Backup State]
            LG[Logger]
        end

        IPC[Tauri IPC Layer]
    end

    subgraph "Frontend (React/TypeScript)"
        ST[System Tray]
        SW[Settings Window]
        PD[Progress Display]
        LV[Log Viewer]

        STATE[State Management<br/>Zustand]
    end

    VS -->|Mount Events| VM
    AS -->|Quit Events| PM

    VM --> BE
    PS --> BE
    PM --> BE

    BE --> NS
    BE --> IPC

    IPC --> STATE
    STATE --> ST
    STATE --> SW
    STATE --> PD
    STATE --> LV
```

## Backup Workflow

```mermaid
sequenceDiagram
    participant User
    participant UI as Frontend UI
    participant IPC as Tauri IPC
    participant Engine as Backup Engine
    participant Scanner as File Scanner
    participant FS as File System

    User->>UI: Click "Backup Now"
    UI->>IPC: invoke('start_backup')
    IPC->>Engine: Start backup process

    Engine->>Scanner: Scan source directory
    Scanner->>FS: Read directory tree
    FS-->>Scanner: File list with metadata
    Scanner-->>Engine: Source files (10,000 files)

    Engine->>IPC: emit('progress', {phase: 'scanning'})
    IPC-->>UI: Progress event
    UI-->>User: Show "Scanning: 10000 files"

    Engine->>FS: Load previous backup metadata
    FS-->>Engine: Previous backup info

    Engine->>Engine: Compare files<br/>(unchanged: 9500, changed: 500)

    Engine->>IPC: emit('progress', {phase: 'copying'})
    IPC-->>UI: Progress event

    loop For each unchanged file
        Engine->>FS: Create hardlink
    end

    loop For each changed file
        Engine->>FS: Copy file
        Engine->>IPC: emit('progress', {current: N})
        IPC-->>UI: Update progress bar
    end

    Engine->>FS: Write backup metadata
    Engine->>Engine: Apply retention policy
    Engine->>FS: Delete old backups

    Engine->>IPC: emit('backup-complete', {stats})
    IPC-->>UI: Completion event
    UI-->>User: Notification: "Backup Complete!"
```

## Trigger Flow

```mermaid
flowchart TD
    Start([System Events])

    Start --> VM{Volume<br/>Mounted?}
    Start --> AQ{App<br/>Quit?}
    Start --> TI{Timer<br/>Elapsed?}

    VM -->|Yes| VMC[Volume Monitor<br/>Check if source volume]
    VMC -->|Match| TC[Trigger Coordinator]

    AQ -->|Yes| PMC[Process Monitor<br/>Check monitored apps]
    PMC -->|Match| AMC{Monitor<br/>Mode?}
    AMC -->|ANY| TC
    AMC -->|ALL| AAQ{All apps<br/>quit?}
    AAQ -->|Yes| TC
    AAQ -->|No| Wait[Wait for more quits]

    TI -->|Yes| PER[Periodic Scheduler<br/>Check if enabled]
    PER -->|Enabled| TC

    TC --> Lock{Backup<br/>in progress?}
    Lock -->|No| StartBackup[Start Backup Engine]
    Lock -->|Yes| Skip[Skip - Already running]

    StartBackup --> Notify[Send Notification<br/>"Backup Starting"]
    Notify --> Execute[Execute Backup]
    Execute --> Complete[Send Notification<br/>"Backup Complete"]
```

## File Comparison Algorithm

```mermaid
flowchart TD
    Start([Start Comparison])

    Start --> LoadSource[Load Source File List]
    Start --> LoadPrevious[Load Previous Backup List]

    LoadSource --> Source[Source Files<br/>HashMap]
    LoadPrevious --> Previous[Previous Files<br/>HashMap]

    Source --> Iterate[Iterate Source Files]
    Previous --> Iterate

    Iterate --> CheckFile{File exists<br/>in previous?}

    CheckFile -->|No| NewFile[Add to New Files List]
    CheckFile -->|Yes| CompareMetadata{Same size<br/>and mtime?}

    CompareMetadata -->|Yes| Unchanged[Add to Unchanged List]
    CompareMetadata -->|No| Modified[Add to Modified List]

    NewFile --> More{More files?}
    Unchanged --> More
    Modified --> More

    More -->|Yes| Iterate
    More -->|No| Return([Return<br/>Unchanged, Modified, New])
```

## Settings Data Flow

```mermaid
flowchart LR
    subgraph "Frontend"
        UI[Settings UI]
        Store[Zustand Store]
    end

    subgraph "IPC"
        GetCmd[get_settings command]
        SetCmd[update_settings command]
    end

    subgraph "Backend"
        Valid[Validator]
        Memory[In-Memory State]
        Disk[Disk Storage<br/>settings.json]
    end

    UI -->|User edits| Store
    Store -->|invoke| SetCmd
    SetCmd --> Valid
    Valid -->|Valid| Memory
    Valid -->|Invalid| Error[Return Error]
    Error -->|emit| UI
    Memory --> Disk

    UI -->|Load on open| GetCmd
    GetCmd --> Memory
    Memory -->|read| Disk
    Disk -->|return| Memory
    Memory -->|return| GetCmd
    GetCmd -->|emit| Store
    Store -->|update| UI
```

## Sprint Timeline Gantt Chart

```mermaid
gantt
    title Backupper Development Timeline
    dateFormat YYYY-MM-DD
    section Foundation
    Sprint 1: Project Setup        :s1, 2025-10-22, 2d
    section UI
    Sprint 2: Basic UI             :s2, after s1, 3d
    section Backup
    Sprint 3: Basic Backup         :s3, after s2, 3d
    Sprint 4: Incremental Backup   :s4, after s3, 4d
    section UI Enhancement
    Sprint 5: Advanced UI          :s5, after s4, 2d
    section Triggers
    Sprint 6: Backup Triggers      :s6, after s5, 4d
    section Integration
    Sprint 7: System Integration   :s7, after s6, 3d
    section Quality
    Sprint 8: Polish & Testing     :s8, after s7, 5d
    Sprint 9: Distribution         :s9, after s8, 2d
```

## State Machine: Backup States

```mermaid
stateDiagram-v2
    [*] --> Idle

    Idle --> Validating: Trigger (volume/app/periodic/manual)

    Validating --> Idle: Invalid Settings
    Validating --> Scanning: Valid

    Scanning --> Comparing: Scan Complete
    Scanning --> Failed: Scan Error

    Comparing --> Copying: Comparison Done
    Comparing --> Failed: Compare Error

    Copying --> Verifying: Copy Complete
    Copying --> Failed: Copy Error

    Verifying --> Cleanup: Verify Success
    Verifying --> Failed: Verify Failed

    Cleanup --> Complete: Cleanup Done
    Cleanup --> Failed: Cleanup Error

    Complete --> Idle: Notify User
    Failed --> Idle: Notify User (Error)
```

## Component Hierarchy: Settings Window

```mermaid
graph TD
    SW[Settings Window]

    SW --> Tabs[Tab Navigation]

    Tabs --> GT[General Tab]
    Tabs --> STT[Source/Target Tab]
    Tabs --> TT[Triggers Tab]
    Tabs --> AT[Advanced Tab]

    GT --> LAL[Launch at Login Toggle]
    GT --> BNP[Backup Name Prefix Input]
    GT --> RET[Retention Count Input]

    STT --> SFP[Source Folder Picker]
    STT --> TFP[Target Folder Picker]
    STT --> VIN[Volume Info Display]

    TT --> VMT[Volume Mount Toggle]
    TT --> PER[Periodic Backup Config]
    TT --> APM[App Monitor Config]
    TT --> MOD[Monitor Mode Radio]

    AT --> EXC[Exclude Patterns]
    AT --> VER[Verify Toggle]
    AT --> NOT[Notifications Toggle]
```

## Technology Stack Layers

```mermaid
graph TD
    subgraph "UI Layer"
        React[React 18]
        TS[TypeScript 5]
        Tailwind[Tailwind CSS]
        Radix[Radix UI]
    end

    subgraph "State Layer"
        Zustand[Zustand Store]
        Hooks[React Hooks]
    end

    subgraph "Communication Layer"
        TauriAPI[Tauri API]
        IPC[IPC Commands]
        Events[Event System]
    end

    subgraph "Backend Layer"
        Rust[Rust Core]
        Tokio[Tokio Async]
        Serde[Serde JSON]
    end

    subgraph "System Layer"
        macOS[macOS APIs]
        DiskArb[DiskArbitration]
        NSWork[NSWorkspace]
        CoreFound[CoreFoundation]
    end

    React --> Zustand
    Zustand --> TauriAPI
    TauriAPI --> IPC
    IPC --> Rust
    Rust --> macOS
    macOS --> DiskArb
    macOS --> NSWork
    macOS --> CoreFound
```

## Error Handling Flow

```mermaid
flowchart TD
    Op[Operation]

    Op --> Try{Try}

    Try -->|Success| Return[Return Result]
    Try -->|Error| Catch[Catch Error]

    Catch --> Log[Log Error Details]
    Log --> Classify{Error Type}

    Classify -->|Recoverable| Retry{Retry?}
    Classify -->|Fatal| Fail[Fail Operation]

    Retry -->|Yes| Wait[Wait & Retry]
    Retry -->|No| Fail

    Wait --> Try

    Fail --> Cleanup[Cleanup Resources]
    Cleanup --> Notify[Notify User]
    Notify --> UpdateState[Update State to Error]

    Return --> Success[Update State to Success]
```

## File System Structure

```mermaid
graph TD
    Root[target/]

    Root --> B1[backup_2025-10-22_100000/]
    Root --> B2[backup_2025-10-23_100000/]
    Root --> B3[backup_2025-10-24_100000/]

    B3 --> Meta3[.backup_meta.json]
    B3 --> Files3[files/]

    Files3 --> F1[file1.txt]
    Files3 --> F2[file2.txt]
    Files3 --> F3[file3.txt]

    F1 -.->|hardlink| F1old[file1.txt in B2]
    F2 -->|copied| F2new[New content]
    F3 -.->|hardlink| F3old[file3.txt in B2]

    Meta3 --> MFields{Metadata}
    MFields --> ID[id: uuid]
    MFields --> TS[timestamp: DateTime]
    MFields --> ST[status: Success]
    MFields --> Stats[statistics: Stats]
```

## Development Workflow

```mermaid
flowchart LR
    subgraph "Development"
        Code[Write Code]
        Test[Test Locally]
        Commit[Git Commit]
    end

    subgraph "Review"
        Review[Code Review]
        Feedback[Feedback]
    end

    subgraph "Integration"
        Merge[Merge to Main]
        Build[Build]
        Deploy[Deploy/Release]
    end

    Code --> Test
    Test --> Commit
    Commit --> Review
    Review --> Feedback
    Feedback -->|Changes| Code
    Feedback -->|Approved| Merge
    Merge --> Build
    Build --> Deploy
```

---

## How to View These Diagrams

### In GitHub

These Mermaid diagrams will render automatically when viewing this file on GitHub.

### In VS Code

1. Install the "Markdown Preview Mermaid Support" extension
2. Open this file and press `Cmd+Shift+V` (or `Ctrl+Shift+V`)
3. Diagrams will render in the preview pane

### Export as Images

1. Use [Mermaid Live Editor](https://mermaid.live/)
2. Copy the diagram code
3. Export as PNG/SVG

---

**Note**: These diagrams complement the detailed text documentation in ARCHITECTURE.md and REQUIREMENTS.md. Refer to those documents for complete technical specifications.
