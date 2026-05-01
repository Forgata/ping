# System Module

Provides high-level diagnostics and operational status of the Ping application's core engine.

The System module acts as a monitoring window into the application itself. It communicates directly with the internal scheduler to report on the health and activity of the background workers responsible for monitoring targets.

This module is implemented in the `src/modules/system` directory.

## API Routes

- **GET** `/system/status`: Returns the current operational state of the background scheduler (e.g., active tasks, uptime, or queue health).

## Public Service Interface

The `system.service.ts` serves as a bridge between the API and the internal engine:

- `getSystemStatus()`: Interfaces with the `check.scheduler.js` instance to retrieve its internal metrics.

## Technical Details

- **State Retrieval**: Unlike other modules that query MongoDB, this module queries the **in-memory state** of the `scheduler` object.
- **Singleton Pattern**: Relies on a shared `scheduler` instance exported from the `scheduler` module to ensure it reports on the actual running processes.

## Dependencies

- **Internal**: `scheduler/check.scheduler.ts` (The source of the status data).
- **Consumers**: Frontend dashboards or external uptime monitors checking the health of the Ping service itself.

## Error Handling

- **Service Unavailability**: If the scheduler is not initialized or fails to respond, the service catches the error and passes it to the global Express error handler via `next(err)`.

## Usage Example

```typescript
import { getSystemStatus } from "./system.service.js";

// Check if the background worker is running correctly
const status = await getSystemStatus();
console.log(`Scheduler State: ${status.state}`);
``;
```
