import mongoose from "mongoose";

export const connectDB = async (uri: string) => {
  mongoose.connection.on("connected", () => console.log("MongoDB connected"));
  mongoose.connection.on("error", () => console.error("MongoDB error"));
  mongoose.connection.on("disconnected", () =>
    console.log("MongoDB disconnected"),
  );
  await mongoose.connect(uri);
};
