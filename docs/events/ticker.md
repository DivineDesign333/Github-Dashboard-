# Event Ticker

Live rollup of notable system events (UTC). Last updated: 2026-03-09.

| Timestamp (UTC) | Event | Severity | Owner | Status |
| --- | --- | --- | --- | --- |
| 2026-03-09 00:05 | Backtest batch queued (smoke) | Low | data-pipeline | in-queue |
| 2026-03-09 00:08 | Ingestion lag > 2m on source:alpha | Medium | data-pipeline | watching |
| 2026-03-09 00:10 | HUD build artifacts published | Low | ui | complete |
| 2026-03-09 00:12 | Anomaly: pnl drift tolerance breached (smoke) | High | risk | investigating |

**Playbook links** (to be wired to runbooks):
- ingestion-lag: /runbooks/ingestion-lag
- anomaly-drift: /runbooks/anomaly-drift
