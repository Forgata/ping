import { validate } from "../../global/global.middleware.js";
import { Router } from "express";
import { checkTargetSchema } from "./check.schema.js";
import { TargetChecks } from "./check.controller.js";

const checkRouter = Router();

checkRouter.get(
  "/targets/:id/checks",
  validate(checkTargetSchema),
  TargetChecks,
);

export default checkRouter;
