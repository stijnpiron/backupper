# GitHub Actions Workflows

This directory contains CI/CD workflows for the Backupper project.

## Workflows

### CI Pipeline (`ci.yml`)

Runs on every pull request and push to main branch.

**Jobs:**

1. **Frontend Lint & Type Check**
   - TypeScript compilation check
   - ESLint validation
   - Runs on: Ubuntu Latest

2. **Frontend Build**
   - Builds the React frontend
   - Verifies Vite build succeeds
   - Runs on: Ubuntu Latest

3. **Rust Check & Clippy**
   - Cargo check for compilation errors
   - Clippy lints for code quality
   - Rustfmt for code formatting
   - Runs on: Ubuntu Latest

4. **Rust Tests**
   - Runs all Rust unit tests
   - Runs on: Ubuntu Latest

5. **Tauri Build (Linux)**
   - Full Tauri app build
   - Verifies the complete build process
   - Runs on: Ubuntu Latest
   - Runs on: Every PR

6. **Tauri Build (macOS)**
   - Full Tauri app build for macOS
   - Runs on: macOS Latest
   - Runs on: Only main branch pushes (to save CI minutes)

**Required Secrets:**

- `TAURI_PRIVATE_KEY` - For app signing (optional for debug builds)
- `TAURI_KEY_PASSWORD` - For key password (optional for debug builds)

### Security Scanning (`security.yml`)

Runs on every push/PR to main and weekly on Mondays.

**Jobs:**

1. **CodeQL Analysis**
   - Scans JavaScript/TypeScript code for security vulnerabilities
   - Uses extended security and quality queries
   - Results appear in Security tab

2. **Rust Security Audit**
   - Runs `cargo audit` on Rust dependencies
   - Checks for known vulnerabilities in crates
   - Fails on warnings in production

### Dependency Review (`dependency-review.yml`)

Runs on every pull request.

**Features:**

- Reviews dependency changes in PRs
- Blocks PRs with moderate+ severity vulnerabilities
- Comments security summary on PR
- Helps prevent supply chain attacks

### Auto Labeling (`label.yml`)

Runs when PRs are opened or updated.

**Features:**

1. **File-based Labels** - Auto-applies labels based on changed files:
   - `frontend` - Changes to src/, Vite, package.json
   - `backend` - Changes to src-tauri/
   - `documentation` - Changes to docs/ or .md files
   - `ci` - Changes to workflows
   - `dependencies` - Changes to package.json, Cargo.toml
   - `config` - Changes to config files

2. **Size Labels** - Auto-applies based on lines changed:
   - `size/xs` - < 10 lines
   - `size/s` - 10-100 lines
   - `size/m` - 100-500 lines
   - `size/l` - 500-1000 lines
   - `size/xl` - > 1000 lines (with warning comment)

### Release Automation (`release.yml`) - DISABLED

⚠️ **Currently disabled** - Ready to use but requires manual activation.

**To enable:**

1. Uncomment the `on: push: tags:` trigger in the workflow file
2. Set up GitHub secrets: `TAURI_PRIVATE_KEY`, `TAURI_KEY_PASSWORD`
3. Create and push a version tag: `git tag v0.1.0 && git push origin v0.1.0`

**Features when enabled:**

- Automatically creates GitHub releases from version tags
- Builds for macOS, Linux, and Windows
- Uploads platform-specific binaries (.dmg, .msi, .exe)
- Creates draft release with template for release notes
- Auto-publishes release after all builds complete

## Dependabot Configuration

Automated dependency updates configured in `dependabot.yml`:

- **Frontend (npm)**: Weekly updates on Mondays
- **Backend (Cargo)**: Weekly updates on Mondays
- **GitHub Actions**: Monthly updates

Dependencies are grouped for easier management:

- Tauri packages
- React packages
- Dev dependencies

## Pull Request Template

Located at `.github/pull_request_template.md`

Ensures all PRs include:

- Summary and description
- Related issue links
- Type of change
- Testing information
- Checklist for code quality

## Issue Templates

### Bug Report (`bug_report.yml`)

Structured template for reporting bugs with:

- Bug description
- Reproduction steps
- Expected vs actual behavior
- OS and version information
- Log output

### Feature Request (`feature_request.yml`)

Template for suggesting new features with:

- Problem statement
- Proposed solution
- Alternatives considered
- Priority level
- Target platform

## Local Development

### Run Linting Locally

```bash
# Frontend
pnpm lint
pnpm format:check

# Backend
cargo clippy --manifest-path=./src-tauri/Cargo.toml
cargo fmt --manifest-path=./src-tauri/Cargo.toml --check
```

### Fix Issues

```bash
# Frontend
pnpm lint:fix
pnpm format

# Backend
cargo fmt --manifest-path=./src-tauri/Cargo.toml
```

### Run Tests

```bash
# Rust tests
cargo test --manifest-path=./src-tauri/Cargo.toml

# Full build
pnpm tauri build --debug
```

## Branch Protection Rules

Recommended settings for main branch:

1. ✅ Require pull request before merging
2. ✅ Require status checks to pass before merging
   - frontend-lint
   - frontend-build
   - rust-check
   - rust-test
   - tauri-build-linux
3. ✅ Require conversation resolution before merging
4. ✅ Require linear history
5. ✅ Include administrators

## CI Performance Tips

1. **Caching**: All workflows use caching for dependencies
   - pnpm store cache
   - Rust cargo cache

2. **Parallel Jobs**: Jobs run in parallel when possible

3. **Conditional Execution**: macOS builds only on main to save minutes

4. **Frozen Lockfile**: Uses `--frozen-lockfile` to ensure reproducible builds

## Troubleshooting

### CI Fails on Rust Checks

Make sure to run locally before pushing:

```bash
cargo clippy --manifest-path=./src-tauri/Cargo.toml -- -D warnings
cargo fmt --manifest-path=./src-tauri/Cargo.toml --check
```

### CI Fails on TypeScript

```bash
pnpm exec tsc --noEmit
```

### CI Fails on ESLint

```bash
pnpm lint
# Fix automatically:
pnpm lint:fix
```

## Future Enhancements

- [ ] Add frontend unit tests (Vitest)
- [ ] Add E2E tests (Playwright/Cypress)
- [ ] Add code coverage reporting
- [ ] Add automatic release workflow
- [ ] Add security scanning (Dependabot Security)
- [ ] Add performance benchmarking
