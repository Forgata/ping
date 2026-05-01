# Alert Module

Manages the lifecycle of incident alerting based on target health trends.

The Alert module monitors the failure counts reported by the `Summary` module. It is responsible for opening "active" incidents when a service is persistently down and closing them once the service returns to a healthy state.

This module is implemented in the `src/modules/alerts` directory

## API Routes

- **GET** `/alerts`: Retrieves all currently "active" alerts. Used for dashboarding and real-time monitoring.

## Public Service Interface

The `alert.service.ts` contains the state machine logic for incidents:

- `createAlert(id)`: The core engine. It checks the current `consecutiveFailureCount` for a target and decides whether to create a new alert, update an existing one, or resolve it.
- `getAlerts()`: Fetches all alerts with a status of `active`.

## Data Model & Schema

- **Collection**: `alerts`
- **Schema Highlights**:
  - `targetId`: Indexed reference to the monitored target.
  - `status`: Enum of `active` or `resolved`.
  - `failureCount`: Synchronized with the Summary module to show the severity of the outage.
  - `startedAt` / `resolvedAt`: Timestamps for incident duration tracking.

## Technical Constraints

- **Threshold**: An alert is only created when `consecutiveFailureCount > 3` and the last status is `DOWN`.
- **Resolution**: An active alert is marked as `resolved` only when the failure count returns to `0` and the status is `HEALTHY`.
- **Deduplication**: The service checks for an existing `active` alert before creating a new one to prevent spamming the database.

## Dependencies

- **Inbound**: Triggered by the `Check` or `Summary` modules after a probe is processed.
- **Internal Data**: Depends on `Summary` module records to read failure history.
- **Database**: Mongoose / MongoDB.

## Error Handling

- **Missing Data**: Throws "Summary not found" if an alert check is triggered for a target without a processed result.
- **Database Failures**: Catches and logs internal Mongoose errors, re-throwing a standard "Failed to create/update alert" to prevent silent failures in the execution pipeline.

## Usage Example

```typescript
import { createAlert } from "./alert.service.js";

// Usually called within the health check execution flow
await createAlert("target-object-id");
```
