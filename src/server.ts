import "dotenv/config";
import express from "express";
import targetRouter from "./modules/targets/target.route.js";
import { connectDB } from "./db/connectDB.js";
import checkRouter from "./modules/checks/check.route.js";

const app = express();
const PORT = process.env.PORT ?? 3000;
const URI = process.env.MONGO_URI;

if (!URI) throw new Error("MONGODB_URI required");

app.listen(PORT, async () => {
  await connectDB(URI);
  console.log(`Server is running on port ${PORT}`);
});

app.use(express.json());
app.use("/api", targetRouter);
app.use("/api", checkRouter);
//
