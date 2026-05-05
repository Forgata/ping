import { type Types, type Document, Schema, model } from "mongoose";

export interface IAlert extends Document {
  targetId: Types.ObjectId;
  status: "active" | "resolved";
  message: string;
  startedAt: Date;
  resolvedAt?: Date;
  failureCount: number;
}

const AlertSchema = new Schema<IAlert>({
  targetId: { type: Schema.Types.ObjectId, required: true, index: true },
  status: { type: String, required: true },
  message: { type: String, required: true },
  startedAt: { type: Date, required: true },
  resolvedAt: { type: Date },
  failureCount: { type: Number, required: true },
});

const Alert = model<IAlert>("Alert", AlertSchema);
export default Alert;
