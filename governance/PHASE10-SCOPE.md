# Phase 10 — Scope Pre-Flight

**Status:** Pre-flight (pending operator acceptance)
**Branch:** `copilot/phase-10-scope`
**Predecessor:** Phase 9.1 (observability layer, merged SHA `41017dc28351fd8979cd5ed84f35843883c18340`)

---

## Mission

Extend governance signals into the contributor workflow. Phase 10 focuses on UX and visibility: making the governance posture actionable and surfaced at the point of contribution, without introducing new enforcement logic or altering existing guardrails.

---

## Preconditions

All preconditions must be satisfied before Phase 10 activation begins.

| Precondition | Status |
|---|---|
| Phase 9 lattice stable (4 invariants enforced) | ✅ Met |
| Phase 9.1 observability live (`governance/INDEX.md` present, README badge and governance section active) | ✅ Met |
| CI green on `main` (all workflow checks passing) | ✅ Met — verified on merge SHA `41017dc28351fd8979cd5ed84f35843883c18340` |
| No pending PRs modifying guardrail scripts or CI workflows | Operator to confirm before activation |

---

## Risk Envelope

- **Risk level:** Low
- **Focus:** UX / visibility only
- **Blast radius:** Minimal — changes are limited to documentation and contributor-facing surfaces (README updates, CONTRIBUTING guidance, optional PR template notes)
- **Enforcement changes:** None
- **Workflow changes:** None
- **Guardrail changes:** None

Phase 10 does not alter any enforcement logic. If any Phase 10 artifact inadvertently touches a guardrail, CI will catch it and block the merge.

---

## Activation Sequence

Steps must be executed in order. Each step is a separate, reviewable PR unless noted.

1. **Scope acceptance** — Operator approves this document and the Phase 10 mission definition. No code changes.
2. **Contributor-facing status surfacing** — Add or improve the README badge link (e.g., link badge to latest workflow run URL); ensure the governance section is contributor-navigable.
3. **Guidance updates** — Add a short governance note to `CONTRIBUTING.md` (or create the file if absent): where the invariants live, how to run guardrails locally, what to expect from CI.
4. **Optional: notifications or dashboard** — If repository tooling permits, add a lightweight status surface (e.g., a GitHub Actions summary step emitting a governance status table). This step is optional and can be deferred.
5. **Dry-run** — Open a short-lived validation branch, trigger CI, confirm all checks green and no regressions.

---

## Expected Artifacts

| Artifact | Description |
|---|---|
| `governance/LOG.md` | Phase 9.1 completion entry (this PR) |
| `governance/PHASE10-SCOPE.md` | This document (this PR) |
| Updated `CONTRIBUTING.md` | Governance note for contributors (Phase 10 implementation PR) |
| README badge/link update (if needed) | Improved contributor navigation (Phase 10 implementation PR) |
| Optional: Actions summary step | Governance status table in CI run summary (Phase 10 optional PR) |

---

## Success Metrics

Phase 10 is complete when:

- A contributor opening a PR can find the invariant map, CI workflow, and local guardrail commands without operator assistance.
- `CONTRIBUTING.md` contains a governance section with accurate pointers.
- CI remains fully green with no new failures introduced.
- No enforcement logic has been modified.

---

## Non-Goals

Phase 10 explicitly does not:

- Modify any guardrail scripts (`scripts/check-*.sh`)
- Modify any CI workflows (`.github/workflows/`)
- Add new invariants or enforcement rules
- Change merge requirements or branch protection rules
- Introduce new dependencies

---

## Operator Actions

Before activating Phase 10:

1. Review and approve this scope document.
2. Confirm no concurrent PRs are open that modify `scripts/` or `.github/workflows/`.
3. Confirm `main` is green.
4. Greenlight the Phase 10 implementation branch.

---

## Dependencies and References

| Resource | Path |
|---|---|
| Governance CI workflow | [`.github/workflows/governance-phase9.yml`](../.github/workflows/governance-phase9.yml) |
| Guardrail scripts | [`scripts/check-coding-conventions.sh`](../scripts/check-coding-conventions.sh), [`scripts/check-repo-layout.sh`](../scripts/check-repo-layout.sh), [`scripts/check-security-baseline.sh`](../scripts/check-security-baseline.sh), [`scripts/check-final-output-block.sh`](../scripts/check-final-output-block.sh) |
| Governance lattice index | [`governance/INDEX.md`](INDEX.md) |
| Phase 9.1 completion log | [`governance/LOG.md`](LOG.md) |
| Guardrails workflow | [`.github/workflows/governance-guardrails.yml`](../.github/workflows/governance-guardrails.yml) |
