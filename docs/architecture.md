# Architecture Overview

**Context (updated 2026-03-09):** Github Dashboard- aggregates GitHub project signals (issues, PRs, CI, metrics) into a single cockpit for rapid situational awareness.

## High-Level Components
- **Web UI (index.html/js/styles):** Presents cockpit/HUD views and interactive filters.
- **Data Ingestion:** Periodic fetchers pull GitHub API data and cache normalized entities (repos, issues, PRs, CI runs).
- **Processing Layer:** Transforms raw events into aggregates (throughput, MTTR, review velocity) and emits timeline + graph edges.
- **Storage:** Currently file/JSON-backed; future: pluggable store (SQLite/Postgres) behind a repository interface.
- **Auth & Config:** Uses config.js for API tokens/base repos; plan: move to env-based secrets.

## Data Flows
1) GitHub API -> ingestion fetchers -> normalized documents.
2) Processor computes KPIs and event streams -> persisted snapshots.
3) UI loads snapshots to render cockpit panels, HUD, graphs, and timelines.

## Extension Points
- **Adapters:** Add new source adapters (e.g., build systems, incident tools) without touching processors.
- **Widgets:** Cockpit panels/HUD tiles are modular; new tiles should consume the normalized schema.
- **Pipelines:** Add processing stages via a registry; each stage reads/writes well-defined records.

## Reliability & Ops
- **Observability:** Emit structured logs (see .ci/log-format.md) with correlation ids per fetch/processing run.
- **Kill-switch:** None present (string absent as of 2026-03-09); if added later, gate high-risk actions.
- **Cool-down:** None present (string absent as of 2026-03-09); schedule throttle windows in processors if needed.

## Roadmap Notes
- Migrate config to environment-based settings.
- Add persistence abstraction and background scheduler.
- Add test fixtures for ingestion and processing stages.