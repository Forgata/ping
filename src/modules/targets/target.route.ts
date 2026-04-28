import { Router, type Request, type Response } from "express";
import { create, getTargetController, remove } from "./target.controller.js";
import { validate } from "./target.middleware.js";
import { createTargetSchema, deleteTargetSchema } from "./target.schema.js";

const targetRouter = Router();

targetRouter.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

targetRouter.post("/targets", validate(createTargetSchema), create);
targetRouter.get("/targets", getTargetController);
targetRouter.delete("/targets/:id", validate(deleteTargetSchema), remove);

export default targetRouter;
