import { Document, Types } from "mongoose";
import { Summary } from "./summary.model.js";
import type { ICheck } from "../checks/check.model.js";

export const getSummary = async (id: string) => {
  try {
    const summary = await Summary.findOne({ targetId: new Types.ObjectId(id) });

    if (!summary) console.warn("Summary not found");

    return summary;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get summary");
  }
};

export const updateSummary = async (
  targetId: string,
  result: Omit<ICheck, keyof Document>,
) => {
  const isSuccess = result.success;

  return await Summary.findOneAndUpdate(
    { targetId },
    [
      {
        $set: {
          targetId: { $ifNull: ["$targetId", targetId] },
          totalCheckCount: { $add: [{ $ifNull: ["$totalCheckCount", 0] }, 1] },
          successCount: {
            $add: [{ $ifNull: ["$successCount", 0] }, isSuccess ? 1 : 0],
          },
          failureCount: {
            $add: [{ $ifNull: ["$failureCount", 0] }, isSuccess ? 0 : 1],
          },
          avgLatency: {
            $divide: [
              {
                $add: [
                  {
                    $multiply: [
                      { $ifNull: ["$avgLatency", 0] },
                      { $ifNull: ["$totalCheckCount", 0] },
                    ],
                  },
                  result.latencyMs,
                ],
              },
              { $add: [{ $ifNull: ["$totalCheckCount", 0] }, 1] },
            ],
          },
        },
      },
      {
        $set: {
          uptime: {
            $multiply: [
              { $divide: ["$successCount", "$totalCheckCount"] },
              100,
            ],
          },
          lastCheckedAt: result.checkedAt,
          lastStatus: isSuccess ? "HEALTHY" : "DOWN",
          consecutiveFailureCount: isSuccess
            ? 0
            : { $add: [{ $ifNull: ["$consecutiveFailureCount", 0] }, 1] },
        },
      },
    ],
    { upsert: true, returnDocument: "after", updatePipeline: true },
  );
};
