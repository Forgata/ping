# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com),
and this project adheres to [Semantic Versioning](https://semver.org).

## - 2026-05-2

### Added

- **Real-time analytics**: New summary engine tracking uptime and avgLatency.
- **Atomic updates**: Migrated summary logic to MongoDB aggregation pipelines for data accuracy.
- **Extended schema**: Support for totalCheckCount, successCount, and failureCount

### Changed

- **Optimization**: Replaced multiple database calls (findOne, updateOne) with a single atomic findOneAndUpdate pipeline.
- **Failure Logic**: Improved consecutiveFailureCount handling—removed the "-999 hack" in favor of a clean conditional reset.

## - 2026-05-01

### Added

- **Core Scheduler**: Recursive polling engine with a 5-second interval and parallel probe execution.
- **Monitoring Logic**: Health check service featuring a 3-retry policy and high-resolution latency measurement.
- **Data Persistence**: MongoDB schemas for Targets, Checks, Summaries, and Alerts.
- **Ephemeral Storage**: Implemented 10-minute TTL (Time-To-Life) for raw check logs to optimize database size.
- **Incident Management**: Automated alerting system that triggers after 3 consecutive failures.
- **Health Summaries**: Real-time aggregation of uptime percentages and rolling average latency.
- **API Surface**: RESTful endpoints for target management and system diagnostics.
- **Documentation**: Comprehensive module-level guides and system architecture overview.

---
