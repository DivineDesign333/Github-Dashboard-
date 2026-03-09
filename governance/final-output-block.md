# Final Output Block Standard

_Canonical location: `governance/final-output-block.md`_

## Purpose

This document defines the **Final Output Block** standard for the `DivineDesign333/Github-Dashboard-` repository. It serves as the single source of truth for how automated agents, Copilot workflows, and contributors should format and delimit final outputs in pull requests, commit messages, and automation logs.

---

## Standard Definition

A **Final Output Block** is a clearly delimited section that appears at the end of any automated or agent-generated artifact (PR body, commit description, review comment, or log entry). It summarizes the actions taken and the resulting state in a machine-readable and human-readable format.

### Required Fields

| Field | Description | Example |
|-------|-------------|---------|
| `status` | Final status of the operation | `success`, `failure`, `partial` |
| `summary` | One-sentence description of what was done | `"Renamed missing-final-output-block.md to governance/final-output-block.md"` |
| `artifacts` | List of files created, modified, or deleted | See example below |
| `timestamp` | ISO 8601 UTC timestamp of completion | `2026-03-09T01:43:55Z` |

### Optional Fields

| Field | Description |
|-------|-------------|
| `warnings` | Non-fatal issues encountered |
| `next_steps` | Recommended follow-up actions |

---

## Format

Final Output Blocks must be wrapped in a fenced code block with the language identifier `final-output`:

~~~markdown
```final-output
status: success
summary: "Brief description of the completed action"
artifacts:
  - created: governance/final-output-block.md
  - deleted: docs/reports/missing-final-output-block.md
timestamp: 2026-03-09T01:43:55Z
```
~~~

---

## Governance Rules

1. **Single source of truth**: This file (`governance/final-output-block.md`) is the only authoritative definition. Do not duplicate it elsewhere in the repository.
2. **Versioning**: Changes to this standard must be made via pull request and reviewed before merging.
3. **Compliance**: All automated agents and Copilot workflows operating on this repository should emit a Final Output Block conforming to this standard.
4. **Deprecation**: Any previous copies of this standard (e.g., `docs/reports/missing-final-output-block.md`) are deprecated and must be removed.

---

## Example

```final-output
status: success
summary: "Canonicalized Final Output Block standard under governance/"
artifacts:
  - created: governance/final-output-block.md
  - deleted: docs/reports/missing-final-output-block.md
timestamp: 2026-03-09T01:43:55Z
```
