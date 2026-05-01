import { Types } from "mongoose";
import Summary from "../summary/summary.model.js";
import Alert from "./alert.model.js";

export const createAlert = async (id: string) => {
  try {
    const summary = await Summary.findOne({
      targetId: new Types.ObjectId(id),
    }).lean();

    if (!summary) throw new Error("Summary not found");

    const currentFailures = summary.consecutiveFailureCount;

    const activeAlert = await Alert.findOne({
      targetId: new Types.ObjectId(id),
      status: "active",
    }).lean();

    if (
      summary.consecutiveFailureCount === 0 &&
      summary.lastStatus === "HEALTHY"
    ) {
      if (activeAlert) {
        await Alert.updateOne(
          {
            targetId: new Types.ObjectId(id),
          },
          {
            $set: {
              status: "resolved",
              resolvedAt: new Date(),
            },
          },
        );
      }
    }

    if (summary.consecutiveFailureCount > 3 && summary.lastStatus === "DOWN") {
      if (!activeAlert) {
        await Alert.create({
          targetId: new Types.ObjectId(id),
          status: "active",
          message: "Service is down",
          startedAt: new Date(),
          failureCount: currentFailures,
        });
      }
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create alert");
  }
};

export const getAlerts = async () => {
  try {
    const alerts = await Alert.find({ status: "active" }).lean();
    return alerts;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to get alerts");
  }
};
