import { Types } from "mongoose";

import { Summary } from "./summary.model.js";

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
