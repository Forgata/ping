# Scheduler Module

The heart of the application that manages the timing and parallel execution of target health checks.

The Scheduler is a background service that continuously polls the database for targets that are due for a probe. It ensures that checks are executed at the correct intervals and provides real-time telemetry about the engine's workload.

## Public Interface

The module exports a singleton instance of the `Scheduler` class:

- `start()`: Initializes the recursive polling loop.
- `stop()`: Gracefully halts the loop and clears active timers.
- `getStatus()`: Returns diagnostic data including `isRunning`, `lastCycleAt`, and current `checksInProgress`.

## Technical Details

- **Polling Strategy**: Uses a recursive `setTimeout` pattern with a fixed **5-second** interval between cycles to prevent stack overflow and ensure only one cycle runs at a time.
- **Execution Logic**:
  - Fetches all targets and filters them by comparing `lastCheckedAt` + `intervalSeconds` against the current timestamp.
  - Uses `Promise.allSettled` to execute due checks in parallel for maximum efficiency.
- **Concurrency Tracking**: Increments and decrements a `checksInProgress` counter to monitor the current load on the system.

## Dependencies

- **Target Module**: Depends on `getTargets` and `getActiveTargets` to determine the work queue.
- **Check Module**: Depends on `runHealthCheck` to perform the actual network probes.
- **System Module**: Provides the data source for the `/system/status` API endpoint.

## Error Handling

- **Resiliency**: If a single target check fails, it is caught within the `map` loop, allowing other concurrent checks to finish.
- **Cycle Safety**: Errors in `processTargets` are caught in the `runScheduler` loop to ensure the timer is always reset, preventing the background job from dying permanently.

## Usage Example

```typescript
import { scheduler } from "./scheduler/check.scheduler.js";

// Start the monitoring engine
await scheduler.start();

// Check engine health
const status = await scheduler.getStatus();
console.log(`Currently checking ${status.checksInProgress} targets.`);
``;
```
