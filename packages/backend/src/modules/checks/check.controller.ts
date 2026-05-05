import type { NextFunction, Request, Response } from "express";
import type { CheckTargetParams } from "./check.schema.js";
import { getChecks } from "./check.service.js";

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
