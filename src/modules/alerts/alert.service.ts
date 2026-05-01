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
    });

    if (currentFailures === 0 && summary.lastStatus === "HEALTHY") {
      if (activeAlert) {
        activeAlert.status = "resolved";
        activeAlert.resolvedAt = new Date();
        await activeAlert.save();
      }
      return;
    }

    if (currentFailures > 3 && summary.lastStatus === "DOWN") {
      if (!activeAlert) {
        await Alert.create({
          targetId: new Types.ObjectId(id),
          status: "active",
          message: "Service is down",
          startedAt: new Date(),
          failureCount: currentFailures,
        });
      } else {
        activeAlert.failureCount = currentFailures;
        await activeAlert.save();
      }
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create/update alert");
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
