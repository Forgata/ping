import { Types } from "mongoose";
import Target from "../targets/target.model.js";
import Check from "./check.model.js";
import { avgLatency, getUptime } from "./utils/checks.utils.js";

export const runHealthCheck = async (id: string) => {
  try {
    const target = await Target.findById(id);
    if (!target) throw new Error("Target not found");

    const { _id, url } = target;
    const startTime = performance.now();
    let result;

    try {
      const response = await fetch(url);
      const endTime = performance.now();
      result = {
        targetId: _id,
        url,
        statusCode: response.status,
        latencyMs: endTime - startTime,
        success: response.ok,
        errorMsg: response.ok ? "" : `Status: ${response.statusText}`,
        checkedAt: new Date(),
      };
    } catch (err: unknown) {
      if (!(err instanceof Error))
        throw new Error("Failed to run health check");

      const endTime = performance.now();
      result = {
        targetId: _id,
        url,
        statusCode: 0,
        latencyMs: endTime - startTime,
        success: false,
        errorMsg: err.message,
        checkedAt: new Date(),
      };
    }

    await Check.create(result);
    return result;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to run health check");
  }
};

export const getChecks = async (id: string) => {
  try {
    const checks = await Check.find({
      targetId: new Types.ObjectId(id),
    })
      .sort({ checkedAt: -1 })
      .lean();

    if (!checks.length) console.warn("Target not found");
    return checks;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to get checked targets");
  }
};

export const getSummary = async (id: string) => {
  try {
    const checks = await Check.find({ targetId: new Types.ObjectId(id) })
      .sort({ checkedAt: -1 })
      .lean();

    if (!checks) console.warn("Target not found");
    const { totalCount, uptime } = getUptime(checks);
    const latencyAvg = avgLatency(checks);
    const latest = checks[0]?.checkedAt;

    return { totalCount, uptime, latencyAvg, latest };
  } catch (err) {
    console.error(err);
    throw new Error("Failed to get checked targets");
  }
};
