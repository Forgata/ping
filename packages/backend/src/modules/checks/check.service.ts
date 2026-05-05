import { Types } from "mongoose";
import Target from "../targets/target.model.js";
import Check from "./check.model.js";
// import Summary from "../summary/summary.model.js";
import { createAlert } from "../alerts/alert.service.js";
import { updateSummary } from "../summary/summary.service.js";

export const runHealthCheck = async (id: string) => {
  try {
    const target = await Target.findById(id);
    if (!target) throw new Error("Target not found");

    const { _id, url } = target;
    const maxRetries = 2;
    let result;

    for (let i = 0; i <= maxRetries; i++) {
      const startTime = performance.now();
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
        result = {
          targetId: _id,
          url,
          statusCode: 0,
          latencyMs: performance.now() - startTime,
          success: false,
          errorMsg: err.message,
          checkedAt: new Date(),
        };
      }
      if (i < maxRetries) await new Promise((res) => setTimeout(res, 1000));
    }

    await Check.create(result!);

    await Target.findByIdAndUpdate(_id, { lastCheckedAt: result!.checkedAt });

    // await Summary.findOneAndUpdate(
    //   { targetId: _id },
    //   {
    //     $set: { lastStatus: result!.success ? "HEALTHY" : "DOWN" },
    //     $inc: { consecutiveFailureCount: result!.success ? -999 : 1 }, // Logic below
    //   },
    //   { upsert: true },
    // );

    // await Summary.updateOne(
    //   { targetId: _id, consecutiveFailureCount: { $lt: 0 } },
    //   { $set: { consecutiveFailureCount: 0 } },
    // );

    await updateSummary(_id.toString(), result!);

    await createAlert(_id.toString());

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
