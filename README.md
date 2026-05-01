# Ping Monitoring System

A lightweight, automated service health monitoring system built with Node.js, Express, and MongoDB.

## System Architecture

The application is structured into domain-specific modules, each handling a distinct part of the monitoring lifecycle:

- **Target**: Management of URLs and check intervals.
- **Scheduler**: The engine that determines when targets are due for a probe.
- **Check**: Performs the network I/O and records raw latency and status data.
- **Summary**: Aggregates raw checks into uptime and average latency metrics.
- **Alert**: State machine that manages incident creation and resolution.
- **System**: Diagnostic endpoint for monitoring the health of the engine itself.

Each module has its own set of routes and service functions, ensuring a clear separation of concerns.

## Getting Started

### What You Need

- **Node.js** (v18+ recommended)
- **MongoDB** (Local or Atlas instance)

### Installation

1. Clone the repository.

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure your environment variables in a `.env` file (e.g., `MONGO_URI`, `PORT`).

### Running

To start the API and initialize the background scheduler:

```bash
npm run dev
```

## Data Flow

1.  **Scheduler** runs every 5 seconds and identifies "due" targets.
2.  **Check Service** performs a fetch with a 2-retry policy.
3.  **Check Service** updates the **Summary** (increments failures or resets on success).
4.  **Alert Service** evaluates the **Summary**; if failures > 3, an alert is created.
5.  **TTL Strategy**: Raw Check records are automatically deleted after 10 minutes to maintain a slim database.

---

## Documentation

Detailed technical documentation for each module can be found in the `docs/modules/` directory:

- [`target.md`](docs/modules/target.md) - CRUD and validation logic.
- [`scheduler.md`](docs/modules/scheduler.md) - Internal timing and execution loop.
- [`check.md`](docs/modules/check.md) - Fetch logic and retry constraints.
- [`summary.md`](docs/modules/summary.md) - Aggregation and uptime calculations.
- [`alert.md`](docs/modules/alert.md) - Incident lifecycle management.
- [`system.md`](docs/modules/system.md) - Operational status API.

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express
- **Database**: MongoDB via Mongoose
- **Validation**: Zod
- **Utilities**: Native Fetch API, Performance Web API

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.
