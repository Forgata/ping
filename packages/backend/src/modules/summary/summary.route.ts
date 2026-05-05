import { validate } from "../../global/global.middleware.js";
import { Router } from "express";
import { summarySchema } from "./summary.schema.js";
import { summaryGet } from "./summary.controller.js";

const summaryRouter = Router();
summaryRouter.get("/targets/:id/summary", validate(summarySchema), summaryGet);

export default summaryRouter;
