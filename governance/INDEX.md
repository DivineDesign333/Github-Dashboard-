# Governance Lattice Index

_Canonical location: `governance/INDEX.md`_

This file is the authoritative lattice map of all governance invariants enforced in the `DivineDesign333/Github-Dashboard-` repository. Each row identifies one invariant, the rule it encodes, how CI signals a failure, and what happens when the invariant is violated.

## Invariant Map

| Invariant | Rule | Enforcement Signal | Failure Mode |
|---|---|---|---|
| **Coding Conventions** | `.prettierrc` is the single canonical formatter/linter config and must live at the repo root. No other formatter or linter config file (`.eslintrc*`, `.editorconfig*`, `.stylelintrc*`, etc.) may exist anywhere in the tree. | [`scripts/check-coding-conventions.sh`](../scripts/check-coding-conventions.sh) run by [`governance-phase9.yml`](../.github/workflows/governance-phase9.yml) | CI fails with `ERROR: Non-canonical formatter/linter config found`; PR cannot merge until the extra file is removed. |
| **Repo Layout** | Only governance-approved directories and files may exist at the repository root. Canonical directories: `governance/`, `src/`, `docs/`, `scripts/`, `ci/`, `.github/`. Canonical root files: `README.md`, `LICENSE`, `CONTRIBUTING.md`, `.gitignore`. Pre-existing baseline items are also permitted until a clean-up PR removes them. | [`scripts/check-repo-layout.sh`](../scripts/check-repo-layout.sh) run by [`governance-phase9.yml`](../.github/workflows/governance-phase9.yml) | CI fails with `ERROR: Non-canonical top-level directory/file`; the offending item must be relocated or removed before the PR can merge. |
| **Security Baseline** | `governance/SECURITY.md` is the sole canonical security policy. `README.md` must contain a link to it. No `SECURITY*.md` files may exist outside `governance/`. | [`scripts/check-security-baseline.sh`](../scripts/check-security-baseline.sh) run by [`governance-phase9.yml`](../.github/workflows/governance-phase9.yml) | CI fails with `ERROR: Canonical security policy not found` or `ERROR: README.md does not contain a link` or `ERROR: SECURITY*.md found outside governance/`; PR is blocked until the baseline is restored. |
| **Final Output Block** | The Final Output Block standard must live exclusively in `governance/final-output-block.md`. No copy or variant of `final-output-block*.md` may exist outside `governance/`. Automated agents must emit conformant output blocks as defined in that document. | [`scripts/check-final-output-block.sh`](../scripts/check-final-output-block.sh) run by [`governance-guardrails.yml`](../.github/workflows/governance-guardrails.yml) | CI fails with `ERROR: Duplicate Final Output Block standard found outside governance/`; the duplicate must be removed before the PR can merge. |

## Observability & CI signals {#observability}
- Badges: README governance badge links here (single source of truth).
- Docs-only PRs: guardrail checks run (coding conventions, repo layout, security baseline, Final Output Block) and should stay green when scope is docs-only.
- Code-touching PRs: same checks; if a job fails, follow the job link to the canonical governance file and resolve the drift.
- Final Output Block: edit only in governance/final-output-block.md; duplication elsewhere fails CI.
- If a check fails twice and you need help, link the job URL in your PR and ask for guidance.
