# Development Quick Reference

> Quick commands and references for daily development

## 🚀 Common Commands

### Development

```bash
# Start dev server (hot reload)
npm run tauri dev

# Run frontend only
npm run dev

# Run Rust tests
cd src-tauri && cargo test

# Run frontend tests
npm test

# Lint TypeScript
npm run lint

# Format Rust code
cd src-tauri && cargo fmt

# Check Rust without building
cd src-tauri && cargo check
```

### Building

```bash
# Production build
npm run tauri build

# Clean build
rm -rf src-tauri/target node_modules
npm install
npm run tauri build

# Build for specific architecture
npm run tauri build -- --target aarch64-apple-darwin  # Apple Silicon
npm run tauri build -- --target x86_64-apple-darwin   # Intel
```

### Debugging

```bash
# Open Rust documentation locally
cd src-tauri && cargo doc --open

# Verbose Tauri build
npm run tauri build -- --verbose

# Check for outdated dependencies
npm outdated
cd src-tauri && cargo outdated
```

## 📁 Project Structure Quick Map

```
backupper/
├── src/                    # Frontend (React/TS)
│   ├── components/         # React components
│   ├── hooks/             # Custom React hooks
│   ├── store/             # Zustand state stores
│   ├── types/             # TypeScript types
│   └── utils/             # Utility functions
│
├── src-tauri/             # Backend (Rust)
│   ├── src/
│   │   ├── backup/        # Backup engine
│   │   ├── triggers/      # Trigger system
│   │   ├── settings/      # Settings management
│   │   ├── system/        # macOS integration
│   │   └── commands/      # Tauri commands
│   ├── Cargo.toml         # Rust dependencies
│   └── tauri.conf.json    # Tauri configuration
│
└── docs/                  # Documentation
    ├── REQUIREMENTS.md
    ├── USER_STORIES.md
    ├── ARCHITECTURE.md
    └── ROADMAP.md
```

## 🔧 Configuration Files

### `src-tauri/tauri.conf.json`

Main Tauri configuration - window settings, permissions, bundle config

### `src-tauri/Cargo.toml`

Rust dependencies and project metadata

### `package.json`

Node dependencies and npm scripts

### `tsconfig.json`

TypeScript compiler configuration

### `tailwind.config.js`

Tailwind CSS customization

## 🎨 UI Component Patterns

### Basic Component Template

```typescript
import React from "react";

interface ComponentProps {
  // props
}

export const Component: React.FC<ComponentProps> = ({ ...props }) => {
  return <div className="...">{/* content */}</div>;
};
```

### Using Tauri Commands

```typescript
import { invoke } from "@tauri-apps/api/core";

// Call Rust command
const result = await invoke<ReturnType>("command_name", {
  arg1: value1,
  arg2: value2,
});
```

### Listening to Events

```typescript
import { listen } from "@tauri-apps/api/event";

// Listen to backend events
const unlisten = await listen<EventPayload>("event-name", (event) => {
  console.log("Received:", event.payload);
});

// Cleanup
unlisten();
```

## 🦀 Rust Patterns

### Creating a Tauri Command

```rust
#[tauri::command]
async fn command_name(
    arg1: String,
    arg2: u32,
    state: State<'_, AppState>,
) -> Result<ReturnType, String> {
    // Implementation
    Ok(result)
}

// Register in main.rs
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![command_name])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

### Emitting Events

```rust
use tauri::Manager;

pub fn emit_progress(app: &AppHandle, progress: ProgressEvent) {
    app.emit_all("backup-progress", progress).ok();
}
```

### Error Handling

```rust
use thiserror::Error;

#[derive(Error, Debug)]
pub enum BackupError {
    #[error("Source path not found: {0}")]
    SourceNotFound(String),

    #[error("Insufficient disk space")]
    InsufficientSpace,

    #[error("IO error: {0}")]
    Io(#[from] std::io::Error),
}

// Use in commands
#[tauri::command]
async fn backup() -> Result<(), String> {
    perform_backup().map_err(|e| e.to_string())
}
```

## 🗄️ State Management

### Zustand Store Template

```typescript
import { create } from "zustand";

interface StoreState {
  // state
  value: string;

  // actions
  setValue: (value: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  value: "",
  setValue: (value) => set({ value }),
}));

// Usage
const { value, setValue } = useStore();
```

## 🧪 Testing Patterns

### Rust Unit Test

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_function() {
        let result = function_to_test();
        assert_eq!(result, expected_value);
    }

    #[tokio::test]
    async fn test_async_function() {
        let result = async_function().await;
        assert!(result.is_ok());
    }
}
```

### React Component Test

```typescript
import { render, screen } from "@testing-library/react";
import { Component } from "./Component";

describe("Component", () => {
  it("renders correctly", () => {
    render(<Component />);
    expect(screen.getByText("Expected Text")).toBeInTheDocument();
  });
});
```

## 📝 Git Workflow

### Branch Naming

```bash
feature/user-story-1-1-menu-bar
fix/backup-progress-crash
refactor/settings-storage
docs/update-architecture
```

### Commit Messages

```bash
git commit -m "feat: add volume mount detection"
git commit -m "fix: prevent concurrent backups"
git commit -m "refactor: simplify file scanner logic"
git commit -m "docs: update API documentation"
git commit -m "test: add tests for retention policy"
```

### Useful Git Commands

```bash
# Undo last commit (keep changes)
git reset --soft HEAD~1

# Amend last commit
git commit --amend

# Interactive rebase (last 3 commits)
git rebase -i HEAD~3

# Stash changes
git stash
git stash pop

# Clean untracked files (dry run)
git clean -n
git clean -f  # actually clean
```

## 🐛 Debugging Tips

### Tauri Dev Tools

```javascript
// In browser dev tools console
window.__TAURI__; // Access Tauri APIs
```

### Rust Debugging

```rust
// Use dbg! macro
dbg!(&variable);

// Pretty print
println!("{:#?}", struct_instance);

// Logging
use tracing::{info, warn, error, debug};
info!("This is info");
debug!("This is debug: {:?}", value);
```

### Common Issues

**"Command not found" errors**:

```bash
# Make sure command is registered in main.rs
.invoke_handler(tauri::generate_handler![your_command])
```

**Permission errors**:

- Check `tauri.conf.json` → `tauri.allowlist`
- Grant Full Disk Access in System Settings

**Build failures**:

```bash
# Clear caches
rm -rf target node_modules
cargo clean
npm install
```

## 📊 Performance Profiling

### Rust Profiling

```bash
# Install cargo-flamegraph
cargo install flamegraph

# Profile (requires sudo on macOS)
sudo cargo flamegraph --bin app-name

# Opens flamegraph.svg
```

### Memory Profiling

```bash
# Install instruments
xcode-select --install

# Run with instruments
instruments -t "Allocations" ./target/release/app
```

## 🔐 macOS Permissions

### Required Permissions

1. **Full Disk Access**

   - System Settings → Privacy & Security → Full Disk Access
   - Add Backupper.app

2. **Notifications**

   - Requested automatically on first notification

3. **Accessibility** (for app monitoring)
   - System Settings → Privacy & Security → Accessibility
   - Add Backupper.app

### Testing Permissions

```rust
// Check permission status
#[tauri::command]
fn check_permissions() -> PermissionStatus {
    // Check each permission
}
```

## 📚 Quick References

### Tauri APIs

- Commands: `invoke('command', { args })`
- Events: `listen('event', callback)` / `emit('event', payload)`
- Dialog: `open()`, `save()`, `message()`
- Notification: `sendNotification(options)`
- Window: `getCurrent()`, `create()`, `close()`

### Useful Crates

- `serde` - Serialization
- `tokio` - Async runtime
- `anyhow` / `thiserror` - Error handling
- `walkdir` - Directory traversal
- `tracing` - Logging
- `chrono` - Date/time

### Useful npm Packages

- `@tauri-apps/api` - Tauri frontend APIs
- `zustand` - State management
- `react-hook-form` - Form handling
- `zod` - Schema validation
- `clsx` - Class names utility

## 🎯 Current Sprint Tasks

Track current focus (update as you progress):

**Current Sprint**: Sprint 1 - Foundation
**Current Task**: 1.1.1 - Initialize Tauri v2 project
**Next Task**: 1.1.2 - Configure Tauri permissions

### Quick Task Checklist

```markdown
- [ ] Task 1.1.1: Initialize Tauri v2 project
- [ ] Task 1.1.2: Configure Tauri permissions
- [ ] Task 1.1.3: Set up React with TypeScript
- [ ] Task 1.1.4: Configure Tailwind CSS
- [ ] Task 1.1.5: Create folder structure
- [ ] Task 1.1.6: Set up ESLint and Prettier
- [ ] Task 1.1.7: Test dev server
```

## 🔗 Useful Links

- [Tauri Docs](https://v2.tauri.app/)
- [Rust Book](https://doc.rust-lang.org/book/)
- [React Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand](https://docs.pmnd.rs/zustand/)

---

**Pro Tip**: Bookmark this file for quick access during development!
