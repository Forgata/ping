import { model, Schema, type Document, type Types } from "mongoose";

export interface ITarget extends Document {
  id: Types.ObjectId;
  name: string;
  url: string;
  intervalSeconds: number;
  active: boolean;
  lastCheckedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const TargetModel = new Schema<ITarget>(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    intervalSeconds: { type: Number, required: true },
    active: { type: Boolean, default: true },
    lastCheckedAt: { type: Date },
  },
  { timestamps: true },
);

const Target = model<ITarget>("Target", TargetModel);
export default Target;
