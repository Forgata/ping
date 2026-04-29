import type { NextFunction, Request, Response } from "express";
import type { CheckTargetParams } from "./check.schema.js";
import { getChecks, getSummary, runHealthCheck } from "./check.service.js";

export const runCheck = async (
  req: Request<CheckTargetParams, {}, {}>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    if (!id) throw new Error("ID is required");

    const result = await runHealthCheck(id);

    if (!result)
      return res
        .status(404)
        .json({ success: false, message: "Target not found" });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const TargetChecks = async (
  req: Request<CheckTargetParams, {}, {}>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await getChecks(id);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const summary = async (
  req: Request<CheckTargetParams, {}, {}>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const result = await getSummary(id);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
