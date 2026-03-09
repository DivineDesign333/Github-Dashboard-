# CI Log Format (proposed)

- Envelope: JSON lines (one object per line)
- Required fields: timestamp (ISO8601), level (DEBUG|INFO|WARN|ERROR), run_id, step, correlation_id, component, message
- Optional fields: repo, branch, sha, actor, duration_ms, status, http_status, retries
- Correlation: reuse correlation_id across ingestion/processing/UI publish steps; run_id follows CI provider build id
- Emission points:
  - fetch: start/end of GitHub API pulls, per resource type
  - process: metric aggregation, timeline generation, graph computation
  - publish: writing snapshots / assets consumed by UI
- Example
  {
    "timestamp": "2026-03-09T00:00:00Z",
    "level": "INFO",
    "run_id": "ci-12345",
    "step": "process",
    "correlation_id": "c2f9d1",
    "component": "processor.timeline",
    "message": "emit timeline slice",
    "duration_ms": 142,
    "status": "ok"
  }
- Retention: keep 30 days; future: ship to central log aggregator
- Alerting hooks: WARN/ERROR on retries > 3, HTTP 5xx, or processing duration p95 > 2s