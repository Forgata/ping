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
  targetId: { type: Schema.Types.ObjectId, required: true },
  url: { type: String, required: true },
  statusCode: { type: Number, required: true },
  latencyMs: { type: Number },
  success: { type: Boolean },
  errorMsg: { type: String, required: true },
  checkedAt: { type: Date, required: true },
});

const Check = model<ICheck>("Check", checkSchema);
export default Check;
