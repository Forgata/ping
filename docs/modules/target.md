# Target Module

The target module is the core of the **Ping**. It handles the external APIs to be monitored. An API that is registered with this module is called a **Target**. Every Target has a unique URL and a configurable interval between checks. The entire **Ping** engine is built around the concept of a **Target**.

This module is responsible for registering new targets, retrieving information about existing targets, and deleting existing targets.

This module is implemented in the `src/modules/target` directory.

# Key Functions

- `createTarget`: Registers a new API ('Target') for monitoring.
- `getTargets`: Retrieves a list of all registered targets whether they are active or not.
- `removeTarget(id)`: Permanently deletes a target by id and stops its monitoring loop.
- `getActiveTargets`: Retrieves a list of all active targets for use by the scheduler.

# Technical Details

# Target Module

This module is responsible for registering new targets, retrieving information about existing targets, and deleting existing targets.

The target module is the core of the **Ping**. It handles the external APIs to be monitored.It ensures data integrity through strict Zod validation and Mongoose schema constraints. An API that is registered with this module is called a **Target**. Every Target has a unique URL and a configurable interval between checks. The entire **Ping** engine is built around the concept of a **Target**.

This module is implemented in the `src/modules/target` directory.

## API Routes

- **GET** `/health`: Verifies the target router is active.
- **POST** `/targets`: Registers a new monitoring target. Requires a name, valid URL, and interval.
- **GET** `/targets`: Returns a list of all configured targets.
- **DELETE** `/targets/:id`: Removes a target from the system via its unique ID.

## Public Service Interface

The `target.service.js` handles the core business logic:

- `createTarget()`: Normalizes strings, checks for name collisions, and persists the target.
- `getTargets()`: Returns all targets as plain JavaScript objects (`.lean()`).
- `getActiveTargets()`: Specifically filters for targets where `active: true`.
- `removeTarget(id)`: Handles deletion and returns the deleted document or null.

## Data Model & Schema

- **Collection**: `targets`
- **Schema Highlights**:
  - `url`: Must be unique; the primary address to be probed.
  - `intervalSeconds`: A positive integer defining how often the check runs.
  - `lastCheckedAt`: Automatically updated by the execution engine (Check module).
  - `timestamps`: Tracks `createdAt` and `updatedAt` for auditing.

## Technical Constraints

- **Validation**: Enforced by Zod. URLs must follow standard web formats, and IDs must be 24-character hexadecimal strings.
- **Normalization**: Logic in the service layer trims whitespace from `name` and `url` before processing.
- **Uniqueness**: The system prevents duplicate `name` entries via service-level checks and duplicate `url` entries via MongoDB indexes.

## Dependencies

- **Middleware**: Uses the global `validate` middleware to intercept invalid requests before they hit controllers.
- **Database**: Heavily dependent on MongoDB/Mongoose for persistence and query execution.

## Error Handling

- **Validation Errors**: Returns a `400 Bad Request` with specific field issues via Zod.
- **Conflict Errors**: Throws an error if a target name is already taken.
- **Not Found**: Returns a `404` status if a `DELETE` request provides an ID that doesn't exist.
- **Generic Failures**: Errors are passed to `next(err)` to be handled by the global Express error middleware.

## Usage Example

```typescript
import { createTarget } from "./target.service.js";

const target = await createTarget({
  name: "Google Search",
  url: "https://google.com",
  intervalSeconds: 30,
});

console.log(`Target created: ${target.name}`);
```
