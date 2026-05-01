# API Reference

This document provides the technical specifications for the **Ping** API. All endpoints return a consistent JSON wrapper: `{ "success": boolean, "data": any }`.

---

## Authentication

Currently, no authentication is required for these routes. Requests are validated using **Zod** schemas.

---

## Global Error States

All modules share a centralized error-handling middleware.

| Status Code | Meaning      | Cause                                       |
| :---------- | :----------- | :------------------------------------------ |
| `200`       | OK           | Success.                                    |
| `201`       | Created      | Successfully created a new resource.        |
| `400`       | Bad Request  | Zod validation failed for body or params.   |
| `404`       | Not Found    | Resource ID does not exist in the database. |
| `500`       | Server Error | An unhandled exception occurred.            |

---

## System Module

Diagnostic endpoints for the Ping engine.

### GET `/system/status`

Fetches the current state of the scheduler and active workload when schedule job is running.
On uncomplete schedule job, returns `lastCycleAt` null.

**Example Request:**

```bash
curl -X GET http://localhost:3000/system/status
```

**Example Response:**

```json
{
  "success": true,
  "data": {
    "isRunning": true,
    "lastCycleAt": "2023-10-27T10:00:00.000Z",
    "activeTargets": 15,
    "checksInProgress": 2
  }
}
```

---

## Target Module

Handles the configuration and lifecycle of monitored APIs.

### POST `/targets`

Registers a new API ('Target') for monitoring.

**Body Parameters (Zod Validated):**

- `name` (string, required): A friendly identifier.
- `url` (string, required): The endpoint to monitor (must be unique).
- `intervalSeconds` (number, required): Seconds between checks.

**Example Request:**

```bash
curl -X POST http://localhost:3000/targets \
  -H "Content-Type: application/json" \
  -d '{"name": "Main API", "url": "https://api.example.com", "intervalSeconds": 60}'
```

### GET `/targets`

Returns an array of all configured targets whether they are active or not.

### DELETE `/targets/:id`

Permanently removes a target and stops its monitoring loop. Returns `404` if the target is not found.

---

## Check Module

Accesses raw health check outcomes.

### GET `/targets/:id/checks`

Retrieves a list of recent health check results for a specific target.

**Path Parameters:**

- `id`: The unique Target ID.

---

## Summary Module

Retrieves aggregated uptime and health statistics.

### GET `/targets/:id/summary`

Returns the calculated health summary for a specific target based on past checks.

**Path Parameters:**

- `id`: The unique Target ID.

---

## Alert Module

Manages system-generated notifications.

### GET `/alerts`

Retrieves all historical or active alert records dispatched by the system.

---

## Data Model Highlights

### Target Object

| Attribute         | Type     | Description                             |
| :---------------- | :------- | :-------------------------------------- |
| `_id`             | ObjectId | System-generated unique identifier.     |
| `url`             | String   | The unique target URL.                  |
| `intervalSeconds` | Number   | User-defined delay between checks.      |
| `lastCheckedAt`   | Date     | Timestamp of the most recent execution. |

### Check Object (Short TTL)

| Attribute      | Type     | Description                              |
| :------------- | :------- | :--------------------------------------- |
| `targetId`     | ObjectId | Reference to the parent Target.          |
| `status`       | Number   | HTTP status code returned by the target. |
| `responseTime` | Number   | Execution time in milliseconds.          |
