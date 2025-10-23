# Test Tracking Guide

This document explains how we track and manage testing in the Backupper project using GitHub issues and workflows.

## Overview

Since GitHub doesn't have built-in test plans like Azure DevOps, we use a combination of:
- **Issue Templates** for test cases and test plans
- **Labels** for categorization and filtering
- **GitHub Actions** for automated test reporting
- **Issue Links** to connect tests to features

## Test Case Management

### Creating a Test Case

1. Go to Issues → New Issue
2. Select **"🧪 Test Case"** template
3. Fill in the details:
   - **Test ID**: Unique identifier (e.g., `TC-001`, `E2E-BackupList-001`)
   - **Test Type**: Unit, Integration, E2E, Manual, etc.
   - **Test Level**: Frontend, Backend, Full Stack, API, UI/UX
   - **Automation Status**: Automated, Manual, or To Be Automated
   - **Priority**: P0 (Critical) to P3 (Low)
   - **Test Steps**: Detailed execution steps
   - **Expected Result**: What should happen when test passes
   - **Related Feature**: Link to user story or feature (e.g., `#222`)

### Test Case Labels

- `test-case` - All test cases
- `automated` - Automated tests
- `manual` - Manual tests
- `p0`, `p1`, `p2`, `p3` - Priority levels
- `frontend`, `backend` - Component being tested

### Example Test Case Structure

```markdown
**Test ID**: TC-001
**Test Type**: End-to-End Test
**Test Level**: Full Stack
**Automation Status**: Automated
**Priority**: P0 - Critical

**Objective**: Verify that users can create a new backup configuration

**Preconditions**:
- Application is running
- User has necessary permissions

**Test Steps**:
1. Launch the application
2. Navigate to "New Backup"
3. Enter configuration details
4. Click "Save"

**Expected Result**:
- Backup is created successfully
- Success notification appears
- Backup appears in the list
```

## Test Plan Management

### Creating a Test Plan

1. Go to Issues → New Issue
2. Select **"📋 Test Plan"** template
3. Fill in the details:
   - **Plan ID**: Unique identifier (e.g., `TP-001`, `SPRINT-01-TESTS`)
   - **Plan Type**: Feature, Sprint, Release, Regression, or Smoke
   - **Related To**: Link to epic or user story
   - **Test Cases**: List of linked test case issues
   - **Entry/Exit Criteria**: When to start/stop testing

### Test Plan Structure

A test plan acts as a container for multiple test cases. Use it to:
- Track testing progress for a feature or release
- Define test scope and objectives
- List entry and exit criteria
- Document test environment requirements
- Track risks and mitigation strategies

### Example Test Plan

```markdown
**Test Plan ID**: TP-001-ProjectSetup
**Type**: Feature Test Plan
**Related To**: User Story #222

**Objective**: Validate all project setup functionality

**Test Cases**:
- [ ] #xxx - TC-001: Verify Tauri app launches
- [ ] #xxx - TC-002: Verify React dev server starts
- [ ] #xxx - TC-003: Verify production build succeeds

**Entry Criteria**:
- All development tasks completed
- Code merged to test branch

**Exit Criteria**:
- All P0 and P1 tests passed
- No critical bugs open
```

## Automated Test Reporting

### CI/CD Test Integration

Our CI workflows automatically:
1. **Run Tests**: Execute tests on every PR and push
2. **Generate Reports**: Create test result summaries
3. **Upload Artifacts**: Store test results and coverage reports
4. **Comment on PRs**: Add test summaries to pull requests
5. **Block Merges**: Prevent merging if critical tests fail

### Frontend Tests

When you add frontend tests (using Vitest), the CI will:
- Run `pnpm test --run --coverage`
- Generate coverage reports
- Post coverage summary to PR comments
- Upload coverage artifacts

### Rust Tests

The CI automatically:
- Runs `cargo nextest run` for faster test execution
- Generates test output summaries
- Uploads test result artifacts
- Posts results to GitHub Actions summary

### Viewing Test Results

**In Pull Requests:**
- Test status appears as checks at the bottom
- Coverage report posted as PR comment
- Failed tests shown in check details

**In GitHub Actions:**
- View full test output in workflow logs
- Download test artifacts from workflow run
- See test summary in Actions summary page

## Test Tracking Workflow

### 1. Planning Phase
```
Create Test Plan → Link to User Story/Epic → Define Scope
```

### 2. Test Creation Phase
```
Create Test Cases → Link to Test Plan → Assign Priorities
```

### 3. Implementation Phase
```
Implement Automated Tests → Update Test Case Status → Link to PR
```

### 4. Execution Phase
```
Manual Tests: Execute → Update Status → Report Issues
Automated Tests: Run via CI → Review Results → Fix Failures
```

### 5. Tracking Phase
```
Update Test Plan Checklist → Monitor Coverage → Report to Stakeholders
```

## Test Organization

### By Priority
- **P0 (Critical)**: Must pass before any release, block deployments
- **P1 (High)**: Should pass, reviewed before release
- **P2 (Medium)**: Important but not blocking
- **P3 (Low)**: Nice to have, run when time permits

### By Type
- **Unit Tests**: Test individual functions/components
- **Integration Tests**: Test component interactions
- **E2E Tests**: Test full user workflows
- **Manual Tests**: Tests requiring human interaction
- **Smoke Tests**: Quick sanity checks after deployment
- **Regression Tests**: Verify old functionality still works

### By Automation Status
- **Automated**: Runs in CI/CD automatically
- **Manual**: Requires human execution
- **To Be Automated**: Planned for automation

## Linking Tests to Features

Always link test cases to the feature they validate:

```markdown
**Related Feature**: #222 (User Story: Project Setup)
```

This allows you to:
- Track test coverage per feature
- Ensure all features have tests
- See which tests are affected by code changes
- Generate test reports per feature

## Test Coverage Tracking

### Current Status

You can view test coverage:
1. **By Label**: Filter issues by `test-case` + `automated` to see automated tests
2. **By Test Plan**: Open a test plan issue to see linked test cases
3. **By Feature**: View issues linked to a user story
4. **In CI**: View coverage reports in PR comments and artifacts

### Coverage Goals

- **Unit Tests**: Target 80%+ code coverage
- **Integration Tests**: Cover all critical paths
- **E2E Tests**: Cover primary user workflows
- **Manual Tests**: Cover UI/UX that can't be automated

## Best Practices

### Test Case Best Practices
1. **One Test, One Purpose**: Each test case should verify one thing
2. **Clear Steps**: Write steps that anyone can follow
3. **Specific Results**: Define exact expected outcomes
4. **Link Everything**: Always link tests to features
5. **Update Status**: Keep test case status current

### Test Plan Best Practices
1. **Clear Scope**: Define what's in/out of scope
2. **Priority-Based**: Focus on P0/P1 tests first
3. **Exit Criteria**: Define when testing is complete
4. **Track Progress**: Update checklist as tests complete
5. **Document Risks**: Note potential issues upfront

### Automation Best Practices
1. **Automate Early**: Write tests as you develop
2. **Fast Tests**: Keep unit tests under 1 second
3. **Independent**: Tests shouldn't depend on each other
4. **Reliable**: Fix flaky tests immediately
5. **Maintainable**: Keep test code clean and documented

## Finding and Filtering Tests

### Using Labels
```
# All test cases
label:test-case

# Automated tests
label:test-case label:automated

# Critical tests
label:test-case label:p0

# Frontend tests
label:test-case label:frontend

# Manual tests that should be automated
label:test-case label:manual "To Be Automated"
```

### Using Search
```
# Test cases for a specific feature
is:issue label:test-case "User Story #222"

# Open test plans
is:issue is:open label:test-plan

# Failed automated tests
is:issue label:test-case label:automated label:bug
```

## Reporting Test Status

### For Stakeholders

Create a test summary issue or comment:

```markdown
## Test Status Report - Sprint X

**Test Plan**: #xxx

### Summary
- Total Test Cases: 25
- Automated: 18 (72%)
- Manual: 7 (28%)
- Passed: 22 (88%)
- Failed: 2 (8%)
- Blocked: 1 (4%)

### P0 Tests: ✅ All Passing
### P1 Tests: ⚠️ 2 Failed
- #xxx - TC-015: Database connection timeout
- #xxx - TC-018: File upload validation

### Coverage
- Unit Tests: 85%
- Integration Tests: 70%
- E2E Tests: 60%

### Next Steps
- Fix failing P1 tests
- Automate 3 manual tests
- Add E2E tests for new features
```

## Example Workflow

Here's a complete example of tracking tests for a feature:

1. **Create User Story**: `#222 - Project Setup`

2. **Create Test Plan**: 
   ```
   Issue #300 - [TEST PLAN] Project Setup Testing
   Links to: #222
   ```

3. **Create Test Cases**:
   ```
   Issue #301 - [TEST] TC-001: Verify Tauri initialization
   Issue #302 - [TEST] TC-002: Verify React dev server
   Issue #303 - [TEST] TC-003: Verify production build
   ```

4. **Link Test Cases to Test Plan**:
   Update #300 checklist:
   ```markdown
   - [ ] #301 - TC-001: Verify Tauri initialization
   - [ ] #302 - TC-002: Verify React dev server  
   - [ ] #303 - TC-003: Verify production build
   ```

5. **Implement Tests**:
   Create PR with automated tests, link to test cases

6. **Execute Tests**:
   - Automated: Run via CI
   - Manual: Execute and update status

7. **Track Progress**:
   Check off completed tests in test plan

8. **Report Status**:
   Add comment to user story with test summary

## Tools and Resources

### GitHub CLI Commands
```bash
# Create test case
gh issue create --template test_case.yml

# Create test plan
gh issue create --template test_plan.yml

# List all test cases
gh issue list --label test-case

# List failing tests
gh issue list --label test-case --label bug

# View test plan
gh issue view <test-plan-number>
```

### Useful Queries
- [All Test Cases](../../issues?q=is%3Aissue+label%3Atest-case)
- [All Test Plans](../../issues?q=is%3Aissue+label%3Atest-plan)
- [Automated Tests](../../issues?q=is%3Aissue+label%3Atest-case+label%3Aautomated)
- [Manual Tests](../../issues?q=is%3Aissue+label%3Atest-case+label%3Amanual)
- [Critical Tests](../../issues?q=is%3Aissue+label%3Atest-case+label%3Ap0)

---

**Questions?** Open a discussion or check the [project documentation](../docs/).
