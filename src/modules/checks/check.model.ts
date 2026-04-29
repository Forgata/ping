import { model, Schema, type Document, type Types } from "mongoose";

export interface ICheck extends Document {
  _id: Types.ObjectId;
  targetId: Types.ObjectId;
  url: string;
  statusCode: number;
  latencyMs: number;
  success?: boolean;
  errorMsg?: string;
  checkedAt: Date;
}

const checkSchema = new Schema<ICheck>({
  targetId: { type: Schema.Types.ObjectId, required: true, index: true },
  url: { type: String, required: true },
  statusCode: { type: Number, required: true },
  latencyMs: { type: Number, required: true },
  success: { type: Boolean },
  errorMsg: { type: String },
  checkedAt: { type: Date, required: true, expires: "10m" },
});

const Check = model<ICheck>("Check", checkSchema);
export default Check;
