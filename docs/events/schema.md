# Event Schema

Purpose: Define the canonical fields and constraints for all event documents flowing through the cockpit stack (ticker, influence graph, fusion timeline, CI events, operator actions).

## Core fields
- id: string (UUIDv4)
- type: string (class name; see docs/events/classes/)
- source: string (system | market | operator | ci | external)
- severity: string (info | warn | error | critical)
- timestamp: RFC3339 UTC
- payload: object (type-specific body)
- tags: array<string>

## Optional fields
- correlation_id: string (links related events)
- stream: string (see docs/events/streams/)
- expires_at: RFC3339 UTC

## Validation
- All events MUST include id, type, source, severity, timestamp, payload.
- Timestamps MUST be RFC3339 in UTC.
- Severity MUST be one of the enumerated values above.
