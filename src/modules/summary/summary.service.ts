import { Types } from "mongoose";
import Check from "../checks/check.model.js";
import { getUptime, getLatency } from "../checks/utils/checks.utils.js";
import { Summary } from "./summary.model.js";

export const createSummary = async (id: string) => {
  let summary;
  try {
    const checks = await Check.find({ targetId: new Types.ObjectId(id) })
      .sort({ checkedAt: -1 })
      .lean();

    if (!checks) console.warn("Target not found");

    const { totalCheckCount, uptime } = getUptime(checks);

    const avgLatency = getLatency(checks);

    const lastCheckedAt = checks[0]?.checkedAt!;

    let consecutiveFailureCount = 0;
    for (const check of checks) {
      if (!check.success) consecutiveFailureCount++;
      else break;
    }

    const successCount = checks.filter((check) => check.success).length;

    summary = {
      totalCheckCount,
      uptime,
      avgLatency,
      lastCheckedAt,
      consecutiveFailureCount,
      successCount,
      failureCount: totalCheckCount - successCount,
      lastStatus: checks[0]?.success ? "HEALTHY" : "DOWN",
    };

    await Summary.create(summary);
  } catch (err) {
    console.error(err);
    throw new Error("Failed to get checked targets");
  }
};

export const getSummary = async (id: string) => {
  try {
    const summary = await Summary.find({ targetId: new Types.ObjectId(id) });
    if (!summary) throw new Error("Summary not found");
    return summary;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get summary");
  }
};
