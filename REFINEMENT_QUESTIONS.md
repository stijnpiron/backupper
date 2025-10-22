# Requirements Refinement Questions

Now that we've updated the documentation for cross-platform support (macOS + Windows), let's refine the requirements with some important questions.

---

## 1. Platform Development Strategy

### Q1.1: Development Order

**Question**: Should we develop both platforms simultaneously or sequentially?

**Option A - Sequential** (Recommended):

- ✅ Develop macOS version first (weeks 1-8)
- ✅ Get it fully working and tested
- ✅ Then port to Windows (weeks 9-11)
- ✅ Clearer path, less context switching
- ❌ Windows users wait longer

**Option B - Parallel**:

- ✅ Both platforms progress together
- ✅ Windows users get features sooner
- ❌ More complex, more context switching
- ❌ Requires testing infrastructure for both from day 1

**Your preference?** \***\*\_\_\_\*\***

### Q1.2: MVP Platform Scope

**Question**: Should the MVP (first release) include both platforms or just one?

**Option A - Single Platform MVP**:

- Release macOS first, Windows later (or vice versa)
- Faster time to first release
- Learn from real usage before second platform

**Option B - Dual Platform MVP**:

- Release both together
- Longer development but feature parity from start
- May delay valuable user feedback

**Your preference?** \***\*\_\_\_\*\***

---

## 2. Feature Priority & Scope

### Q2.1: Core vs Nice-to-Have Features

Rate these features by priority for the MVP (1=Must Have, 2=Should Have, 3=Nice to Have):

| Feature                    | Priority (1-3) | Notes                               |
| -------------------------- | -------------- | ----------------------------------- |
| Manual backup              | \_\_           | Always available                    |
| Incremental with hardlinks | \_\_           | Core space-saving feature           |
| Volume mount trigger       | \_\_           | Auto-backup on external drive mount |
| Periodic backup trigger    | \_\_           | Time-based auto-backup              |
| App quit trigger           | \_\_           | Your Lightroom use case             |
| Retention management       | \_\_           | Auto-delete old backups             |
| Progress display           | \_\_           | Visual feedback during backup       |
| Notifications              | \_\_           | Backup complete/failed alerts       |
| Launch at login            | \_\_           | Convenience feature                 |
| Log viewer UI              | \_\_           | Troubleshooting                     |
| Exclude patterns           | \_\_           | Skip certain files/folders          |
| Backup verification        | \_\_           | Check backup integrity              |

### Q2.2: Trigger Complexity

**Question**: For the application quit trigger, how important is the "ALL quit" mode (trigger only when ALL monitored apps have quit)?

**Option A - ANY mode only** (Simpler):

- Trigger when any monitored app quits
- Simpler logic, easier to implement
- Covers most use cases

**Option B - Both ANY and ALL modes**:

- More flexible
- Handles complex workflows (e.g., quit Photoshop AND Lightroom)
- More complex state tracking

**Your preference?** \***\*\_\_\_\*\***

### Q2.3: Multiple Backup Profiles

**Question**: The current design supports one source → one target configuration. Do you need multiple backup "profiles"?

**Example scenarios**:

- Profile 1: Photos (external SSD) → Backup Drive A
- Profile 2: Documents (internal) → Backup Drive B
- Profile 3: Projects → Cloud mapped drive

**Your need**:

- [ ] Single profile is enough for MVP
- [ ] Multiple profiles would be valuable
- [ ] Not needed, can run multiple instances instead

---

## 3. User Experience & Workflow

### Q3.1: First-Run Experience

**Question**: How much guidance should the first-run setup provide?

**Option A - Minimal**:

- App starts, icon appears in tray
- User opens settings and configures
- Simple, assumes tech-savvy users

**Option B - Wizard**:

- Welcome screen explains app
- Step-by-step: Select source → Select target → Configure triggers
- Better for less technical users
- Takes more development time

**Your preference?** \***\*\_\_\_\*\***

### Q3.2: Backup Confirmation

**Question**: Should manual "Backup Now" require confirmation?

**Option A - No confirmation** (Faster):

- Click "Backup Now" → immediately starts
- No interruption
- Risk: Accidental clicks

**Option B - Quick confirmation**:

- Click "Backup Now" → Small popup: "Start backup now? [Yes] [Cancel]"
- Prevents accidents
- One extra click

**Your preference?** \***\*\_\_\_\*\***

### Q3.3: In-Progress Backup Cancellation

**Question**: Should users be able to cancel a backup in progress?

**Implications**:

- ✅ User control
- ✅ Can stop if started by mistake
- ❌ Need to handle partial backups (current design discards them)
- ❌ Complexity in cleanup

**Your preference**:

- [ ] Yes, allow cancellation (recommended)
- [ ] No, backups must complete or fail

---

## 4. Technical Details

### Q4.1: Hardlink Fallback Strategy

**Question**: What should happen if the target filesystem doesn't support hardlinks?

**Scenarios**:

- User selects FAT32 external drive as target (no hardlink support)
- User selects network share (may not support hardlinks)

**Options**:

- **Option A**: Block backup, show error: "Target must be NTFS/APFS"
- **Option B**: Warn user, then do full copy (no space savings)
- **Option C**: Detect and warn during setup, but allow

**Your preference?** \***\*\_\_\_\*\***

### Q4.2: Symbolic Links in Source

**Question**: How should the backup handle symbolic links (symlinks) in the source folder?

**Options**:

- **Option A**: Follow symlinks (backup what they point to)
- **Option B**: Copy the symlink itself (preserve link)
- **Option C**: Skip symlinks entirely
- **Option D**: Make it configurable

**Your preference?** \***\*\_\_\_\*\***

### Q4.3: Handling Large Files

**Question**: Should there be special handling for very large files (e.g., video files >10GB)?

**Considerations**:

- Large files take time to copy
- May want to show progress per file
- May want to skip large files in quick backups

**Options**:

- **Option A**: Treat all files the same
- **Option B**: Add option to skip files above certain size
- **Option C**: Show per-file progress for large files (>1GB)

**Your preference?** \***\*\_\_\_\*\***

### Q4.4: Concurrent Operations

**Question**: Should the app allow backup while browsing settings or logs?

**Current design**: Single backup at a time, but UI remains interactive

**Question**: Should changing settings mid-backup:

- **Option A**: Be blocked ("Cannot change settings during backup")
- **Option B**: Be allowed but not affect current backup
- **Option C**: Prompt to cancel current backup

**Your preference?** \***\*\_\_\_\*\***

---

## 5. Windows-Specific Questions

### Q5.1: Administrator Rights

**Question**: Some Windows features (WMI process monitoring, volume detection) may work better with admin rights.

**Options**:

- **Option A**: Always request admin (UAC prompt on launch)
  - ✅ Full functionality
  - ❌ Annoying UAC prompt every time
- **Option B**: Run as normal user, request elevation only when needed
  - ✅ Better UX
  - ❌ Some features may not work
- **Option C**: Run as normal user, detect and gracefully degrade
  - ✅ Works for most users
  - ✅ Power users can run as admin if needed
  - ❌ Need fallback implementations

**Your preference?** \***\*\_\_\_\*\***

### Q5.2: Windows Defender Interaction

**Question**: Windows Defender may slow down file operations. Should we:

**Options**:

- **Option A**: Do nothing, let users handle it
- **Option B**: Detect slowdown and suggest adding exclusion
- **Option C**: Provide instructions for adding exclusion
- **Option D**: Attempt to add exclusion automatically (requires admin)

**Your preference?** \***\*\_\_\_\*\***

### Q5.3: Long Path Support

**Question**: Windows has a 260-character path limit (can be extended). Should we:

**Options**:

- **Option A**: Always use `\\?\` prefix (handles long paths)
  - ✅ Works with any path length
  - ❌ Some APIs don't support it
- **Option B**: Use `\\?\` only when needed (path >260 chars)
  - ✅ Maximum compatibility
  - ❌ More complex logic
- **Option C**: Block paths >260 chars, warn user
  - ✅ Simpler
  - ❌ Limits functionality

**Your preference?** \***\*\_\_\_\*\***

---

## 6. Performance & Resource Usage

### Q6.1: Background Processing

**Question**: How should the app behave when system is under heavy load?

**Options**:

- **Option A**: Continue backup at full speed
- **Option B**: Detect high CPU/disk usage, throttle backup
- **Option C**: Pause backup, resume when idle
- **Option D**: Make throttling configurable

**Your preference?** \***\*\_\_\_\*\***

### Q6.2: Large Directory Optimization

**Question**: For very large directories (100k+ files), scanning can be slow. Should we:

**Options**:

- **Option A**: Always scan everything (simple, thorough)
- **Option B**: Cache directory tree, only check changed folders
- **Option C**: Use filesystem change notifications (FSEvents/FileSystemWatcher)
- **Option D**: Make it configurable

**Your preference?** \***\*\_\_\_\*\***

### Q6.3: Memory Usage for Large Backups

**Question**: For backups with millions of files, holding file lists in memory can be expensive.

**Options**:

- **Option A**: Load everything in memory (simple, fast)
- **Option B**: Stream file lists, process in batches
- **Option C**: Use a temporary SQLite database for file tracking
- **Option D**: Limit support to reasonable file counts (< 1M files)

**Your preference?** \***\*\_\_\_\*\***

---

## 7. Error Handling & Recovery

### Q7.1: Partial Backup Failure

**Question**: If 99% of files copy successfully but 1% fail (permissions, open files, etc.), should backup be:

**Options**:

- **Option A**: Marked as failed, entire backup discarded
- **Option B**: Marked as "partial success", kept, missing files logged
- **Option C**: Prompt user to decide
- **Option D**: Configurable threshold (e.g., fail if >5% errors)

**Your preference?** \***\*\_\_\_\*\***

### Q7.2: Open Files (Windows)

**Question**: Windows often locks files that are open. How should we handle files that can't be copied?

**Options**:

- **Option A**: Skip file, log error, continue
- **Option B**: Retry a few times with delay
- **Option C**: Use Volume Shadow Copy (VSS) to backup open files (complex)
- **Option D**: Mark backup as failed

**Your preference?** \***\*\_\_\_\*\***

### Q7.3: Insufficient Disk Space

**Question**: What if target disk fills up mid-backup?

**Current design**: Pre-check space before starting

**Additional question**: What if pre-check passes but space runs out during backup?

**Options**:

- **Option A**: Abort, discard incomplete backup
- **Option B**: Keep partial backup, mark as failed
- **Option C**: Prompt to free space, retry
- **Option D**: Try to delete oldest backup to make room

**Your preference?** \***\*\_\_\_\*\***

---

## 8. Security & Privacy

### Q8.1: Backup Encryption

**Question**: Should backups be encrypted?

**Current scope**: Out of scope for MVP

**Confirm**:

- [ ] Correct, not needed for MVP
- [ ] Actually important, should include

If important, which approach:

- **Option A**: Encrypt individual files
- **Option B**: Encrypted container/volume
- **Option C**: Use OS-level encryption (BitLocker/FileVault)

**Your preference?** \***\*\_\_\_\*\***

### Q8.2: Settings Storage Security

**Question**: Settings file contains source/target paths. Should it be:

**Options**:

- **Option A**: Plain JSON (easy to read/edit)
- **Option B**: Encrypted (more secure)
- **Option C**: Protected by OS permissions only

**Your preference?** \***\*\_\_\_\*\***

---

## 9. Monitoring & Observability

### Q9.1: Telemetry/Analytics

**Question**: Should the app collect any usage data?

**Examples**:

- Crash reports
- Feature usage statistics
- Performance metrics

**Options**:

- **Option A**: No telemetry (privacy-first)
- **Option B**: Optional opt-in telemetry
- **Option C**: Anonymous basic metrics (with opt-out)

**Your preference?** \***\*\_\_\_\*\***

### Q9.2: Update Mechanism

**Question**: How should updates be handled?

**Options**:

- **Option A**: Manual download from GitHub/website
- **Option B**: In-app notification of new version (manual download)
- **Option C**: Auto-update with user approval (Tauri updater)
- **Option D**: Silent auto-update (install on next launch)

**Your preference?** \***\*\_\_\_\*\***

---

## 10. Naming & Branding

### Q10.1: Application Name

**Current**: "Backupper"

**Questions**:

- Is this final or placeholder?
- Any trademark concerns?
- Should it be more descriptive? (e.g., "Incremental Backupper", "SnapshotBackup")

**Your preference?** \***\*\_\_\_\*\***

### Q10.2: Backup Naming Convention

**Current**: `{prefix}_{YYYY-MM-DD}_{HHMMSS}`

**Example**: `backup_2025-10-22_143015`

**Alternatives**:

- `{prefix}_{YYYYMMDD}_{HHMMSS}` (no hyphens)
- `{prefix}_{YYYY-MM-DD_HH-MM-SS}` (hyphens in time)
- `{prefix}_{Unix_Timestamp}` (sortable, not human-readable)

**Your preference?** \***\*\_\_\_\*\***

---

## 11. Testing & Quality Assurance

### Q11.1: Automated Testing Priority

**Question**: How much automated testing should we target?

**Options**:

- **Option A**: Basic unit tests for core logic (~40% coverage)
- **Option B**: Comprehensive tests (~80% coverage) - adds ~10-15 hours
- **Option C**: Critical paths only (~60% coverage) - adds ~5 hours

**Your preference?** \***\*\_\_\_\*\***

### Q11.2: Beta Testing

**Question**: Would you like a beta testing phase before v1.0 release?

**Options**:

- **Option A**: No beta, test yourself
- **Option B**: Small closed beta (5-10 users)
- **Option C**: Public beta with feedback mechanism

**Your preference?** \***\*\_\_\_\*\***

---

## 12. Documentation & Support

### Q12.1: User Documentation

**Question**: What level of user documentation should we create?

**Options**:

- **Option A**: Basic README with setup instructions
- **Option B**: Full user manual with screenshots
- **Option C**: Video tutorials
- **Option D**: Interactive in-app help

**Your preference?** \***\*\_\_\_\*\***

### Q12.2: Troubleshooting Support

**Question**: How should users get help?

**Options**:

- **Option A**: GitHub Issues only
- **Option B**: FAQ document
- **Option C**: Discord/Slack community
- **Option D**: Email support

**Your preference?** \***\*\_\_\_\*\***

---

## 13. Budget & Timeline Confirmation

### Q13.1: Time Investment

**Updated estimate**: 145-150 hours for full cross-platform support

**Breakdown**:

- Core functionality: ~80 hours
- macOS-specific: ~25 hours
- Windows-specific: ~25 hours
- Testing & polish: ~15-20 hours

**Questions**:

- Is this timeline acceptable?
- Would you prefer to reduce scope to hit a shorter timeline?
- Any hard deadlines we should know about?

**Your response**: \***\*\_\_\_\*\***

### Q13.2: Budget for Tools/Services

**Question**: Are you planning to pay for any development tools or services?

**Potential costs**:

- **Code signing**:
  - macOS: Apple Developer account ($99/year)
  - Windows: Code signing certificate ($50-300/year)
- **CI/CD**: GitHub Actions (free for public repos, ~$3-10/month for private)
- **Crash reporting**: Sentry or similar (free tier available)
- **Cloud storage**: For update hosting (free options available)

**Your budget/preference?** \***\*\_\_\_\*\***

---

## 14. Open Questions & Edge Cases

### Q14.1: Network Share Support

**Current scope**: Explicitly out of scope (network shares not supported as source)

**Confirm**: Is this acceptable? Network shares often have issues with:

- Hardlink support
- Performance
- Connection reliability
- Permission complexity

**Your confirmation**:

- [ ] Agreed, no network shares for MVP
- [ ] Actually need network share support

### Q14.2: Multiple Users (Same Machine)

**Question**: If multiple Windows/macOS users on same machine run the app:

**Options**:

- **Option A**: Separate settings per user (each configures own backups)
- **Option B**: Shared settings (one config for all users)
- **Option C**: Don't support multiple users

**Your preference?** \***\*\_\_\_\*\***

### Q14.3: Portable Mode

**Question**: Should there be a "portable" mode where settings are stored in app folder instead of user directory?

**Use case**: Run from USB drive without leaving traces

**Your need**:

- [ ] Not needed
- [ ] Nice to have
- [ ] Essential

---

## Summary of Key Decisions Needed

**High Priority** (affects architecture):

1. Development order: Sequential or parallel? (Q1.1)
2. MVP platform scope: One or both? (Q1.2)
3. Hardlink fallback strategy (Q4.1)
4. Windows admin rights approach (Q5.1)
5. Multiple backup profiles? (Q2.3)

**Medium Priority** (affects features): 6. "ALL quit" mode necessary? (Q2.2) 7. First-run wizard or minimal setup? (Q3.1) 8. Backup cancellation support? (Q3.3) 9. Partial backup failure handling (Q7.1) 10. Update mechanism (Q9.2)

**Low Priority** (nice to refine): 11. Feature priority ratings (Q2.1) 12. Various UX preferences 13. Documentation level 14. Testing coverage target

---

## How to Respond

Please go through these questions and provide your preferences. You can:

1. **Fill in the blanks** directly in this document
2. **Reply with a list** of question numbers and answers (e.g., "Q1.1: Option A", "Q2.1: Manual=1, Hardlinks=1, ...")
3. **Schedule a discussion** to go through questions together
4. **Mark sections** where you need more clarification

Once I have your answers, I'll update all documentation to reflect your decisions and provide a refined, final project plan.

---

## ✅ ALL QUESTIONS ANSWERED - FINALIZED

### Final Decisions Summary

**Q1.1 - Development Order**: Sequential (macOS first with platform abstraction)
**Q1.2 - MVP Platform**: macOS only (v1.0), Windows in v1.1
**Q2.1 - Feature Priorities**:

- Priority 1: Incremental+hardlinks, Volume mount, App quit (ALL), Manual trigger, Retention, Basic progress, Notifications, Launch at login, Basic verification
- Priority 2: Periodic trigger
- Priority 3: Detailed progress, Log viewer, Exclude patterns

**Q2.2 - Manual Backup Priority**: Priority 1 (Must Have) - Essential for testing
**Q2.3 - Backup Verification**: Basic (Option A) for MVP, Incremental checksums (Option C) in v1.2+
**Q3.1 - App Quit Mode**: ALL mode for MVP, ANY mode deferred
**Q4.1 - Hardlink Fallback**: Option C (inform user, let them decide)
**Q5.1 - Windows Admin**: Option B (elevate when needed)
**Q6.1 - First Run**: Minimal for MVP, wizard later
**Q7.1 - Cancellation**: Yes, mark as failed and cleanup
**Q8.1 - Partial Failures**: Option B (keep partial, add missed to next)

**Status**: ✅ **Ready for implementation** - All documentation updated

---

**🚀 Ready to begin Sprint 1!**
