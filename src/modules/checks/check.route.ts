import { validate } from "../../global/global.middleware.js";
import { Router } from "express";
import { checkTargetSchema } from "./check.schema.js";
import { runCheck, summary, TargetChecks } from "./check.controller.js";

const checkRouter = Router();

checkRouter.post("/targets/:id/run", validate(checkTargetSchema), runCheck);
checkRouter.get(
  "/targets/:id/checks",
  validate(checkTargetSchema),
  TargetChecks,
);
checkRouter.get("/targets/:id/summary", validate(checkTargetSchema), summary);

export default checkRouter;
