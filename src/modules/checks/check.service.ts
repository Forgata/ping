import { Types } from "mongoose";
import Target from "../targets/target.model.js";
import Check from "./check.model.js";

export const runHealthCheck = async (id: string) => {
  try {
    const target = await Target.findById(id);
    if (!target) throw new Error("Target not found");

    const { _id, url } = target;
    const startTime = performance.now();
    const maxRetries = 2;
    let result;

    // Retry Loop: Initial attempt + up to 2 retries
    for (let i = 0; i <= maxRetries; i++) {
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

        if (response.ok) break;
      } catch (err: any) {
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
      if (i < maxRetries) {
        await new Promise((res) => setTimeout(res, 1000));
      }
    }

    await Check.create(result!);
    await Target.findByIdAndUpdate(_id, { lastCheckedAt: result!.checkedAt });
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
