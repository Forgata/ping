# Summary Module

Aggregates real-time probe data into health metrics for each target.

The Summary module acts as a stateful aggregator. Instead of recalculating statistics from raw logs every time, it maintains a persistent "snapshot" of a target's performance, including uptime percentages, average latency, and current health status.

This module is implemented in the `src/modules/summary` directory.

## API Routes

- **GET** `/targets/:id/summary`: Retrieves the calculated metrics for a specific target (Validated by `summarySchema`).

## Public Service Interface

The `summary.service.js` provides read access to the aggregated data:

- `getSummary(id)`: Finds the summary document associated with a target ID. Returns null or a warning if no checks have been performed yet.

## Data Model & Schema

- **Collection**: `summaries`
- **Key Metrics**:
  - `totalCheckCount`: Total number of probes executed.
  - `successCount` / `failureCount`: Counters used to calculate uptime.
  - `uptime`: Percentage of successful checks.
  - `avgLatency`: Rolling average of response times.
  - `consecutiveFailureCount`: Current streak of failed checks (critical for the Alert module).
  - `lastStatus`: Current state enum (`HEALTHY` | `DOWN`).

## Technical Constraints

- **Persistence**: Summary data is persistent and represents the entire history of the target.
- **Write Logic**: Though managed in this document, the actual updates to this model are performed by the `Check` service using atomic MongoDB operators like `$inc` and `$set`.
- **Validation**: Target IDs must be exactly 24 characters (standard MongoDB ObjectID).

## Dependencies

- **Inbound**: Queried by the `Alert` module to determine if thresholds are met.
- **Inbound (Writes)**: Updated by the `Check` module after every successful or failed probe.
- **Database**: Mongoose / MongoDB.

## Error Handling

- **Missing Records**: If a target exists but hasn't been checked, the service logs a warning rather than throwing an error, allowing the UI to handle an "empty" state.
- **Data Integrity**: Relies on the `Check` module to ensure `consecutiveFailureCount` never drops below zero using a secondary `$set` correction.

## Usage Example

```typescript
import { getSummary } from "./summary.service.js";

// Fetch health snapshot for a target
const stats = await getSummary("target-object-id");

if (stats) {
  console.log(`Current Status: ${stats.lastStatus}`);
  console.log(`Uptime: ${stats.uptime}%`);
}
```
