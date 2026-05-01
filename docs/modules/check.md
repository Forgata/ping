# Check Module

The execution engine of the application responsible for performing network probes and recording raw results.

The Check module acts as the "worker" layer. It executes HTTP requests against targets, handles retry logic, measures latency, and triggers the subsequent update of summaries and alerts.

This module is implemented in the `src/modules/target` directory.

## API Routes

- **GET** `/targets/:id/checks`: Retrieves the history of raw check results for a specific target, sorted by the most recent first.

## Public Service Interface

The `check.service.js` handles the heavy lifting of network I/O:

- `runHealthCheck(id)`: The core logic. Performs up to 3 attempts (initial + 2 retries) to fetch a URL, calculates latency, saves the raw result, and updates the target's `lastCheckedAt`.
- `getChecks(id)`: Queries the database for all historical probes associated with a specific target ID.

## Data Model & Schema

- **Collection**: `checks`
- **Schema Highlights**:
  - `targetId`: Indexed reference to the monitored target.
  - `latencyMs`: High-resolution measurement of the request duration.
  - `checkedAt`: Timestamp of the probe.
  - **TTL Index**: The `checkedAt` field has a `10m` expiry, meaning raw check records are automatically purged from the database after 10 minutes to save space.

## Technical Constraints

- **Retry Logic**: Implements a maximum of 2 retries with a 1-second delay between attempts if a request fails or returns a non-2xx status.
- **State Management**: Upon completion, it increments the `consecutiveFailureCount` in the **Summary** module on failure, or resets it (via a -999 increment logic) on success.
- **Latency**: Measured using `performance.now()` for millisecond precision.

## Dependencies

- **Inbound**: Usually triggered by a scheduler/cron job (internal) or manual trigger.
- **Outbound**:
  - `Target`: Updates the last checked timestamp.
  - `Summary`: Updates health status and failure counts.
  - `Alert`: Triggers the alert evaluation logic (`createAlert`).
- **External**: Uses the global `fetch` API for network requests.

## Error Handling

- **Target Missing**: Throws "Target not found" if the provided ID does not exist in the database.
- **Network Failure**: Catches request errors (DNS issues, timeouts) and records them as a `success: false` result with a `statusCode: 0`.
- **Pipeline Safety**: Wraps the entire execution in a try-catch to ensure that if one probe fails, it doesn't crash the entire worker process.

## Usage Example

```typescript
import { runHealthCheck } from "./check.service.js"; // usually called within the scheduler

// Execute a probe for a specific target
const result = await runHealthCheck("65a1234567890abcdef12345");
console.log(`Check completed. Success: ${result.success}`);
```
