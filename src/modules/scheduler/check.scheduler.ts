import type { ITarget } from "../targets/target.model.js";
import { getTargets } from "../targets/target.service.js";
import { runHealthCheck } from "../checks/check.service.js";

export async function checkScheduler() {
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
      console.log(`Processing ${dueTargets.length} targets...`);

      await Promise.all(
        dueTargets.map(async (target) => {
          await runHealthCheck(target._id.toString());
        }),
      );
    } else {
      console.log("Nothing to run");
    }
  } catch (err) {
    throw new Error("Failed to get targets", { cause: err });
  } finally {
    setTimeout(checkScheduler, 5000);
  }
}
