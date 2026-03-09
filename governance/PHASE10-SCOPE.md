# Phase 10 — Scope and Pre-Flight

_Canonical location: `governance/PHASE10-SCOPE.md`_

---

## Mission

Extend governance signals into the contributor workflow. Phase 9 enforces; Phase 9.1 surfaces. Phase 10 integrates: contributors should be able to see governance status, understand expectations, and receive lightweight guidance without reading raw CI logs.

Focus is on visibility and UX. No enforcement logic changes.

---

## Preconditions

- Phase 9 lattice stable: all four invariants enforced and green on `main`. ✅
- Phase 9.1 observability live: badge, README governance section, and `governance/INDEX.md` merged. ✅
- CI green on `main` with no pending PRs that alter guardrail scripts or governance workflows. ✅

All preconditions must be confirmed before activating Phase 10.

---

## Risk Envelope

**Low.** Phase 10 touches docs, UI surfaces, and optional automation only. No enforcement scripts are modified. No workflow logic changes. Blast radius is contained to:

- Documentation files
- Optional PR template additions
- Optional README or badge updates

If any item in the activation sequence requires touching a guardrail script or workflow, it must be deferred to a separate phase.

---

## Activation Sequence

1. **Draft and accept scope** — finalize this document; confirm non-goals and success metrics with operator before writing any code or docs.
2. **Contributor-facing status surfacing** — add a link from the README badge or a dedicated status line to the latest governance CI run, so contributors can reach pass/fail detail in one click.
3. **Guidance updates** — add a brief governance note to `CONTRIBUTING.md` (or create it if absent) pointing to `governance/INDEX.md` and the invariants overview.
4. **Optional: notifications or dashboard** — if repo tooling permits (e.g., GitHub Actions summary, PR template checkbox), surface governance state at PR open time. Evaluate feasibility; skip if it requires enforcement-layer changes.
5. **Dry-run validation** — open a short-lived branch, run all guardrail scripts locally (expected: exit 0), confirm CI passes, then close or merge.

Steps 1–3 are required. Steps 4–5 are conditional.

---

## Expected Artifacts

- Updated `CONTRIBUTING.md` with governance pointer.
- README status link or badge annotation (if not already present from Phase 9.1).
- Optional: PR template tweak (`.github/PULL_REQUEST_TEMPLATE.md`).
- Phase 10 completion log entry in `governance/LOG.md`.

---

## Success Metrics

- A first-time contributor can locate the invariants list and understand CI expectations from the README alone, without reading workflow YAML.
- `governance/INDEX.md` is reachable within two clicks from the README.
- All guardrail scripts exit 0 after Phase 10 changes merge.
- No increase in CI failure rate on `main`.

---

## Non-Goals

- Changes to enforcement logic (`scripts/check-*.sh`).
- Changes to governance workflow files (`.github/workflows/governance-*.yml`).
- New invariants or rule additions (deferred to Phase 11+).
- Automated merge blocking based on new signals.

---

## Operator Actions

1. Review and approve this scope document before implementation begins.
2. Confirm no concurrent PRs are open that modify guardrail scripts or governance workflows.
3. Greenlight the implementation branch once preconditions are verified.
4. Sign off on the dry-run results before merging Phase 10.

---

## Dependencies / References

- Governance workflow: [`.github/workflows/governance-phase9.yml`](../.github/workflows/governance-phase9.yml)
- Guardrail scripts: [`scripts/check-coding-conventions.sh`](../scripts/check-coding-conventions.sh), [`scripts/check-repo-layout.sh`](../scripts/check-repo-layout.sh), [`scripts/check-security-baseline.sh`](../scripts/check-security-baseline.sh), [`scripts/check-final-output-block.sh`](../scripts/check-final-output-block.sh)
- Lattice map: [`governance/INDEX.md`](INDEX.md)
- Phase log: [`governance/LOG.md`](LOG.md)
