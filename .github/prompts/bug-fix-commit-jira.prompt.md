---
mode: agent
model: GPT-4.1
description: Commit and release management for bug fixes.
---
# Commit and Release Management Copilot Prompt

Jira issues to commit: ${input:jiratickets: provide Jira Tickets separated by commas}

## Objective
You are a Copilot agent tasked with managing the commit process for a GitHub repository. Your workflow involves gathering all recent changes (from #changes), checking for overlaps and required code merges, generating release notes, and committing those changes to the repository.

---

## Prompt

**Step 1: Gather Changes**
- Collect and summarize all relevant code and documentation changes from the #changes channel or log.
- Group changes by type (e.g., bug fixes, new features, refactoring, documentation).

**Step 2: Check for Overlaps and Required Code Merges**
- Review the current state of the repository and all pending changes.
- Identify any overlaps, conflicts, or duplicate work between the new changes and existing code, open branches, or pull requests.
- If there are overlaps or merge conflicts:
  - Propose how to resolve conflicts or merge code.
  - Ensure a clean and correct integration of all changes before proceeding.
- Document any merges performed and how conflicts were resolved.

**Step 3: Generate Release Notes**
- Create clear, concise release notes based on the gathered changes.
- Structure release notes with sections such as:
  - Features
  - Bug Fixes
  - Improvements
  - Breaking Changes (if any)
- Include references to related issues or pull requests where appropriate.
- Ensure release notes are in Markdown format and ready for inclusion in the repository (e.g., `RELEASE_NOTES.md`).
- Append release notes in the `RELEASE_NOTES.md` file.

**Step 4: Commit the Changes**
- Stage all relevant files for commit, including code changes, test updates, and release notes.
- Write a descriptive commit message summarizing the changes and referencing significant issues or PRs.
- Push the commit to the appropriate branch in the GitHub repository.

**Step 5: (Optional) Tag the Release**
- If this is a notable release, create a new tag (e.g., `v1.2.3`) and reference it in the release notes.

**Step 6: (Optional) Update Jira Issues**
- UPDATE Jira issues ${input:jiratickets} and add comments with release notes and relevant links.
- If this is a notable release, update any relevant Jira issues to reflect the changes made in this release.

---

## Output Format

- **Change Summary:** List and categorize all changes to be committed.
- **Overlap/Conflict Review:** Description of any overlaps found and how they were resolved.
- **Release Notes:** Markdown-formatted release notes.
- **Commit Message:** Concise and descriptive message for the commit.
- **Files to Commit:** List of files included in the commit.
- **Branch and Tag Info:** Indicate the branch and tag (if applicable).
- **References:** Links to related issues or pull requests.

---

## Example

```
**Change Summary:**  
- Feature: Added user profile editing  
- Bug Fix: Fixed login crash on invalid credentials  
- Improvement: Updated database schema for performance

**Overlap/Conflict Review:**  
- Merged branch `user-profile-update` with main.  
- Resolved conflict in `src/user/profile.js` by keeping latest validation logic.  
- No duplicate work detected.

**Release Notes:**  
## v1.2.3 - 2025-08-27

### Features
- Added user profile editing (#INT-3766)

### Bug Fixes
- Fixed login crash on invalid credentials (#INT-3076)

### Improvements
- Updated database schema for performance

**Commit Message:**  
"Release v1.2.3: Profile editing, login bug fix, DB improvements (#INT-3766, #INT-3076)"

**Files to Commit:**  
- src/user/profile.js  
- src/auth/login.js  
- docs/RELEASE_NOTES.md

**Branch and Tag Info:**  
Branch: main  
Tag: v1.2.3

**References:**  
[#INT-3766](https://negroup-dev.atlassian.net/browse/INT-3766), [#INT-3076](https://negroup-dev.atlassian.net/browse/INT-3076)
```

---

## Instructions

1. Always summarize changes from #changes before generating release notes.
2. Check for overlaps and required merges with other branches or PRs before committing.
3. Document any merges performed and how conflicts were resolved.
4. Commit all related files together, including release notes.
5. Use clear, consistent formatting for release notes and commit messages.
6. Reference issues and PRs where relevant.
7. After completion of 