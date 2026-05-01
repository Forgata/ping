import type { ITarget } from "../targets/target.model.js";
import { getActiveTargets, getTargets } from "../targets/target.service.js";
import { runHealthCheck } from "../checks/check.service.js";

export class Scheduler {
  private isRunning: boolean = false;
  private timer: NodeJS.Timeout | null = null;
  private lastCycleAt: Date | null = null;
  private checksInProgress: number = 0;

  async start() {
    if (this.isRunning) return;
    this.isRunning = true;
    console.log("Schedule Job Started");
    await this.runScheduler();
  }

  stop() {
    if (!this.isRunning) return;
    this.isRunning = false;
    if (this.timer) clearTimeout(this.timer);
    this.timer = null;
    console.log("Schedule Job Stopped");
  }

  private async runScheduler() {
    if (!this.isRunning) return;
    try {
      await this.processTargets();
    } catch (err) {
      console.error(err);
    } finally {
      this.lastCycleAt = new Date();
      this.timer = setTimeout(() => this.runScheduler(), 5000);
    }
  }

  private async processTargets() {
    try {
      const now = Math.floor(Date.now() / 1000);
      const targets = await getTargets();

      const dueTargets: ITarget[] = targets.filter((target) => {
        const lastChecked = target.lastCheckedAt
          ? target.lastCheckedAt.getTime() / 1000
          : 0;
        return lastChecked + target.intervalSeconds <= now;
      });

      if (dueTargets.length > 0) {
        this.checksInProgress = dueTargets.length;
        console.log(`Processing ${dueTargets.length} targets...`);

        await Promise.all(
          dueTargets.map(async (target) => {
            try {
              await runHealthCheck(target._id.toString());
            } finally {
              this.checksInProgress--;
            }
          }),
        );
      } else {
        console.log("Nothing to run");
      }
    } catch (err) {
      this.checksInProgress = 0;
      throw new Error("Failed to get targets", { cause: err });
    }
  }

  async getStatus() {
    const activeTargets = await getActiveTargets();

    return {
      isRunning: this.isRunning,
      lastCycleAt: this.lastCycleAt,
      activeTargets: activeTargets,
      checksInProgress: this.checksInProgress,
    };
  }
}

export const scheduler = new Scheduler();
