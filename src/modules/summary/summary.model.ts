import { model, Schema, type Document } from "mongoose";

export interface ISummary extends Document {
  totalCheckCount: number;
  successCount: number;
  failureCount: number;
  uptime: number;
  avgLatency: number;
  consecutiveFailureCount: number;
  lastCheckedAt: Date;
  lastStatus: "HEALTHY" | "DOWN";
}

const summarySchema = new Schema<ISummary>({
  totalCheckCount: { type: Number, required: true },
  successCount: { type: Number, required: true },
  failureCount: { type: Number, required: true },
  avgLatency: { type: Number, required: true },
  uptime: { type: Number, required: true },
  consecutiveFailureCount: { type: Number, required: true },
  lastCheckedAt: { type: Date },
  lastStatus: { type: String, required: true },
});

export const Summary = model<ISummary>("Summary", summarySchema);
export default Summary;
